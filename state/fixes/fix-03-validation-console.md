# Fix 03 Plan: Validierung & Live-Preview Konsole

## Probleme

Der Nutzer meldet zwei miteinander verwandte Probleme auf der Task-Seite:

1. **"Code prüfen" (Validierung) funktioniert nicht zuverlässig.**
   - Obwohl der Code korrekt ist (z. B. `var meinName = "Max"; console.log(meinName);`), wird der Test als fehlgeschlagen angezeigt.

2. **SyntaxErrors erscheinen in der Live-Preview-Konsole während des Tippens.**
   - Beim langsamen Tippen von JavaScript-Code erscheinen laufend Fehler wie `SyntaxError: missing variable name` oder `ReferenceError: mein is not defined` in der Konsole.
   - Der Nutzer empfindet dies als verwirrend und glaubt, die Validierung würde ständig im Hintergrund laufen.

---

## Root Cause Analyse

### Problem 1: Validierung schlägt fehl

**Betroffene Datei:** `src/lib/validationEngine.ts` → `validateConsoleTest()`

Die aktuelle Implementierung arbeitet mit folgender Zeitsequenz:

```ts
const iframe = createValidationIframe(srcDoc);
await new Promise((resolve) => setTimeout(resolve, 300)); // Warte auf Load

const logs: unknown[][] = [];
function collectHandler(event: MessageEvent) { ... }
window.addEventListener('message', collectHandler);       // Listener erst hier!
await new Promise((resolve) => setTimeout(resolve, 200)); // Sammle 200ms
window.removeEventListener('message', collectHandler);
```

**Der Bug:** Der `postMessage`-Event-Listener wird erst **nach** 300ms registriert. JavaScript-Code mit einem `console.log()` am Ende des Scripts wird jedoch typischerweise **sofort** nach dem Laden ausgeführt – oft noch *vor* Ablauf der 300ms. Die `CONSOLE`-Message geht somit verloren, weil zum Zeitpunkt der Ausführung noch niemand zuhört.

Dasselbe Problem betrifft potenziell auch `validateFunctionTest()`: Wenn die Funktion sofort nach dem Script-Load aufgerufen wird (was bei Inline-Scripts der Fall ist), könnte die `VALIDATION_RESULT`-Message ebenfalls verpasst werden, falls das Iframe schneller lädt als 1000ms – allerdings wartet `waitForValidationMessage` sofort nach dem Erstellen des Iframes, sodass dieses Problem dort nicht auftritt.

### Problem 2: SyntaxErrors während des Tippens

**Betroffene Dateien:** `src/components/TaskPage.tsx`, `src/features/sandbox/PreviewFrame.tsx`

- Der Editor aktualisiert den Store bei jedem Tastendruck.
- `useDebounce(currentCode, 500)` sendet den Code alle 500ms an das Preview-Iframe.
- Ein unvollständiger Code-Schnipsel (z. B. `var meinName = "`) wird vom Browser als valides HTML mit einem fehlerhaften `<script>`-Block interpretiert und führt zu SyntaxErrors, die über `window.onerror` und `console.error` in die simulierte Konsole geschrieben werden.
- Diese Fehler bleiben in der Konsole stehen und akkumulieren sich, was den Nutzer stark verwirrt.

---

## Geplante Lösung

### 1. Console-Listener sofort registrieren (`validationEngine.ts`)

In `validateConsoleTest` muss der `message`-Event-Listener **sofort** nach dem Erstellen des Iframes registriert werden, nicht erst nach einer Wartezeit:

```ts
const iframe = createValidationIframe(srcDoc);
const logs: unknown[][] = [];

function collectHandler(event: MessageEvent) {
  if (event.source === iframe.contentWindow && ...) {
    logs.push(msg.payload);
  }
}

window.addEventListener('message', collectHandler);
await new Promise((resolve) => setTimeout(resolve, 500)); // Gesamte Laufzeit
window.removeEventListener('message', collectHandler);
removeValidationIframe(iframe);
```

Dadurch werden auch sofort ausgeführte `console.log`-Aufrufe zuverlässig erfasst.

### 2. Konsole bei Iframe-Reload automatisch leeren (`TaskPage.tsx`)

Wann immer sich `srcDoc` ändert (d. h. neuer `debouncedCode` kommt an), sollte die simulierte Konsole geleert werden. Das verhindert die Akkumulation von SyntaxErrors aus früheren, unvollständigen Code-Zuständen.

In `TaskPage.tsx` wird ein `useEffect` auf `debouncedCode` eingeführt:

```ts
useEffect(() => {
  setConsoleLogs([]);
}, [debouncedCode]);
```

Alternativ könnte man auch nur bei Änderungen des `js`-Teils leeren, aber eine generelle Leerung bei jeder `srcDoc`-Aktualisierung ist konsistenter und verständlicher für den Nutzer: Das Iframe lädt neu → die Konsole startet neu.

### 3. Optional: Verzögerung bei DOM-Tests für stabileres Laden

In `validateTask` werden DOM-Tests gegen das **Live-Preview-Iframe** (`previewRef.current`) ausgeführt. Da dieses Iframe gerade durch `debouncedCode` neu geladen werden könnte, besteht das Risiko, dass das `contentDocument` noch nicht das aktualisierte DOM enthält, wenn der Nutzer sofort nach dem Tippen auf "Code prüfen" klickt.

Als kleine Verbesserung wird in `validateDomTest` vor dem `querySelector` eine kurze Wartezeit (50–100ms) eingefügt, um dem Iframe Zeit zum Rendern zu geben:

```ts
export async function validateDomTest(...): Promise<TestResult> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
  // ... restlicher Code
}
```

> **Hinweis:** `validateDomTest` muss dann von synchron auf `async` umgestellt werden. Alle Aufrufe in `validateTask` und `TaskPage.tsx` sind bereits asynchron, sodass dies keinen Breaking Change darstellt.

## Implementierungs-Tasks

| # | Task | Datei(en) |
|:-|:---|:---|
| 1 | `validateConsoleTest`: Listener-Registrierung auf Zeitpunkt *vor* der Wartezeit verschieben | `src/lib/validationEngine.ts` |
| 2 | `validateDomTest` auf `async` umstellen und 100ms Wartezeit einbauen | `src/lib/validationEngine.ts` |
| 3 | Aufruf von `validateDomTest` in `validateTask` mit `await` versehen | `src/lib/validationEngine.ts` |
| 4 | Konsole bei `debouncedCode`-Änderung leeren | `src/components/TaskPage.tsx` |
| 5 | Build, Lint, TypeScript prüfen | — |
| 6 | `state/current-state.md` aktualisieren | `state/current-state.md` |

## Git-Workflow

Wie bei allen vorherigen Änderungen wird strikt der Feature-Branch-Workflow eingehalten:

1. **Branch erstellen:** `fix/03-validation-console` (von `master`)
2. **Implementation** der oben genannten Änderungen
3. **QA durchführen** (Build, Lint, TypeScript)
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen** (lokal und remote)
7. **Deployment beobachten** und Live-URL testen

## Testplan nach Deploy

- [ ] Task "Variablen erstellen" (JS): `console.log("Max")` wird beim Klick auf "Code prüfen" als bestanden erkannt
- [ ] Task "Mit Zahlen rechnen" (JS): `console.log(96)` wird beim Klick auf "Code prüfen" als bestanden erkannt
- [ ] Beim langsamen Tippen von JS-Code erscheinen keine akkumulierten SyntaxErrors in der Konsole (alte Fehler werden bei neuem Iframe-Reload gelöscht)
- [ ] DOM-Tests (z. B. in Bundle 1 oder 3) funktionieren zuverlässig beim Klick auf "Code prüfen"
