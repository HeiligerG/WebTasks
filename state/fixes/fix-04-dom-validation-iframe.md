# Fix 04 Plan: DOM-Validierung mit eigenem Iframe statt Live-Preview

## Problem

HTML-Tasks (Bundle 1) bestehen die Validierung nicht zuverlässig. Der Nutzer berichtet: "HTML hat immer noch Probleme". Konkret schlagen DOM-Tests (z. B. Suche nach `<h1>`, `<img>` oder `.profile-card`) fehl, obwohl der Code im Editor korrekt ist und in der Vorschau sichtbar erscheint.

## Root Cause Analyse

### Architektur-Missmatch bei DOM-Tests

In `src/components/TaskPage.tsx` ruft `handleValidate` auf:

```ts
const result = await validateTask(task, previewRef.current, currentCode);
```

- **`currentCode`**: Der Code, der aktuell im Editor steht (aus dem Zustand-Store).
- **`previewRef.current`**: Das Live-Preview-Iframe, das den **debounced Code** (`debouncedCode`, 500ms Verzögerung) anzeigt.

In `validateTask` werden DOM-Tests gegen das **Live-Preview-Iframe** ausgeführt:

```ts
case 'dom':
  result = await validateDomTest(test, iframe); // iframe = previewRef.current
```

**Das Problem:**
Wenn ein Nutzer HTML-Code eingibt und sofort auf "Code prüfen" klickt (oder auch nur schnell genug, bevor die 500ms Debounce abgelaufen sind), zeigt das Live-Preview-Iframe noch den **alten Code** an. Der DOM-Test sucht dann nach dem neuen Element (z. B. `<h1>`) in einem veralteten DOM und schlägt fehl.

Console-Tests und Function-Tests haben dieses Problem **nicht**, weil sie in `validationEngine.ts` jeweils ein **frisches, temporäres Iframe** aus `currentCode` erstellen:

```ts
const srcDoc = assembleDocument({ html: code.html, css: code.css, js: code.js });
const iframe = createValidationIframe(srcDoc);
```

DOM-Tests sind somit die einzigen Test-Typen, die nicht auf dem aktuellen Editor-Code basieren, sondern auf dem verzögerten Live-Preview.

## Geplante Lösung

### 1. `validateDomTest` auf eigenes temporäres Iframe umstellen

`validateDomTest` soll genau wie `validateConsoleTest` und `validateFunctionTest` ein neues, temporäres Iframe aus dem übergebenen Code bauen und darauf warten, dass es vollständig geladen ist.

**Neue Signatur:**
```ts
export async function validateDomTest(
  test: DomTest,
  code: { html: string; css: string; js: string }
): Promise<TestResult>
```

**Implementierung:**
```ts
const srcDoc = assembleDocument({
  html: code.html,
  css: code.css,
  js: protectLoops(code.js),
});
const iframe = createValidationIframe(srcDoc);

// Warte auf das Load-Event, damit das DOM garantiert verfügbar ist
await new Promise<void>((resolve) => {
  const onLoad = () => {
    iframe.removeEventListener('load', onLoad);
    resolve();
  };
  iframe.addEventListener('load', onLoad);
  // Fallback, falls load bereits gefeuert hat oder nicht feuert
  setTimeout(() => {
    iframe.removeEventListener('load', onLoad);
    resolve();
  }, 300);
});

const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
// ... querySelector + computed styles prüfen ...

removeValidationIframe(iframe);
```

### 2. `validateTask` anpassen

Da `validateDomTest` nun selbst ein Iframe erzeugt, muss die Signatur-Änderung in `validateTask` reflektiert werden:

```ts
case 'dom':
  result = await validateDomTest(test, code);
  break;
```

Der Parameter `iframe: HTMLIFrameElement | null` in `validateTask` wird für DOM-Tests überflüssig. Wir können ihn jedoch für Abwärtskompatibilität behalten (wird nur noch für die Fehlermeldung "Vorschau-Frame nicht verfügbar" nicht mehr benötigt).

Tatsächlich können wir den `iframe`-Parameter ganz entfernen oder beibehalten, ohne ihn für DOM-Tests zu verwenden.

> **Entscheidung:** Der `iframe`-Parameter bleibt in `validateTask` erhalten, wird aber nicht mehr an `validateDomTest` übergeben. Das minimiert Änderungen in `TaskPage.tsx`.

### 3. `TaskPage.tsx` – keine Änderung nötig

Da `handleValidate` bereits `currentCode` an `validateTask` übergibt, muss `TaskPage.tsx` nicht angepasst werden. Das ist der große Vorteil dieser Lösung.

## Implementierungs-Tasks

| # | Task | Datei(en) |
|:-|:---|:---|
| 1 | `validateDomTest` umstellen: eigenes Iframe aus `code` erstellen, auf `load` warten, DOM prüfen, Iframe aufräumen | `src/lib/validationEngine.ts` |
| 2 | `validateTask` anpassen: `await validateDomTest(test, code)` statt `await validateDomTest(test, iframe)` | `src/lib/validationEngine.ts` |
| 3 | Build, Lint, TypeScript prüfen | — |
| 4 | `state/current-state.md` aktualisieren | `state/current-state.md` |

## Git-Workflow

1. **Branch erstellen:** `fix/04-dom-validation-iframe` (von `master`)
2. **Implementation**
3. **QA durchführen** (Build, Lint, TypeScript)
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**
7. **Deployment beobachten**

## Testplan nach Deploy

- [ ] Task "Dein erstes HTML-Element" (Bundle 1, Task 1): `<h1>Hallo Welt</h1>` wird sofort nach Eingabe und Klick auf "Code prüfen" bestanden
- [ ] Task "Bilder einbinden" (Bundle 1, Task 2): `<img src="...">` wird sofort bestanden
- [ ] Task "Deine Profilkarte" (Bundle 1, Task 3): `.profile-card` und `border-radius: 50%` werden zuverlässig erkannt
- [ ] JavaScript-Tasks (Console/Function) funktionieren weiterhin wie bisher
