# Phase 4: Sandbox, Live-Preview & Sicherheit — Detaillierte Task-Planung

> **Dokumentenzweck:** Dieses Dokument enthält die vollständige Aufschlüsselung aller Tasks für Phase 4. Jeder Task ist eigenständig abgrenzbar, priorisiert und mit konkreten Akzeptanzkriterien versehen.  
> **Phase-DoD:** Ein sicherer, isolierter Iframe zeigt den vom Schüler geschriebenen Code in Echtzeit an. `console.log`-Ausgaben erscheinen in einer simulierten Konsole der Host-App. Endlosschleifen werden durch einen AST-basierten Schutzmechanismus automatisch unterbrochen. Alle Sicherheitsanforderungen (`sandbox="allow-scripts"`, Null-Origin) sind technisch umgesetzt und getestet.

---

## Grundsatzentscheidung: AST-basierte Loop-Protection via Acorn

Für den Schutz vor Endlosschleifen muss der JavaScript-Code des Schülers vor der Ausführung analysiert und transformiert werden. Es stehen verschiedene Parser-Ökosysteme zur Verfügung (Babel, Acorn, Esprima, Meriyah).

**Entscheidung für Acorn + acorn-walk + astring:**

1. **Bundle-Größe:** Acorn ist extrem leichtgewichtig (~30 KB). Babel (Parser + Traverse + Generator) würde das Bundle um mehrere hundert Kilobyte aufblähen.
2. **Etabliertheit:** Acorn ist der Standard-Parser für Rollup, Webpack und ESLint. Es ist stabil, gut dokumentiert und unterstützt modernes JavaScript.
3. **Transformations-Workflow:**
   - `acorn.parse(code, { ecmaVersion: 'latest' })` parsed den Code in einen ESTree-kompatiblen AST.
   - `acorn-walk` traversiert den AST, um `ForStatement`, `WhileStatement` und `DoWhileStatement` zu finden.
   - In den Rumpf jeder gefundenen Schleife wird ein Zeit-Check-Instrument eingefügt.
   - `astring` (ein schlanker, ESTree-kompatibler Code-Generator) wandelt den modifizierten AST zurück in ausführbaren JavaScript-Code.
4. **Alternative (Fallback):** Sollte sich herausstellen, dass `astring` mit den spezifischen Acorn-AST-Varianten inkompatibel ist, wird `escodegen` (ebenfalls schlank) als Ersatz evaluiert.

---

## Task-Übersicht

| ID | Task-Name | Priorität | Geschätzter Aufwand |
| :--- | :--- | :--- | :--- |
| 4.1 | `PreviewFrame`-Komponente mit `srcdoc` und `sandbox` erstellen | Kritisch | Mittel |
| 4.2 | Code-Assembler/Compiler implementieren | Kritisch | Mittel |
| 4.3 | Debounce-Hook für Live-Preview erstellen | Hoch | Klein |
| 4.4 | `postMessage`-Interceptor und `SimulatedConsole` implementieren | Kritisch | Mittel |
| 4.5 | AST-basierte Loop-Protection implementieren | Kritisch | Mittel |
| 4.6 | Sandbox in `TaskPage` integrieren | Hoch | Klein |
| 4.7 | Sicherheits- und Funktions-Smoke-Tests durchführen | Kritisch | Klein |
| 4.8 | Dokumentation aktualisieren (`current-state.md`) | Mittel | Klein |

---

## Task 4.1: `PreviewFrame`-Komponente mit `srcdoc` und `sandbox` erstellen

**Beschreibung:**
Die zentrale Ausführungsumgebung für den Schüler-Code ist ein strikt isoliertes `<iframe>`. Diese Task realisiert die Komponente und ihre Sicherheitsattribute.

**Aktionen:**
1. Datei `src/features/sandbox/PreviewFrame.tsx` anlegen.
2. Eine Komponente `PreviewFrame` definieren mit folgenden Props:
   - `srcDoc: string` — Der vollständige, assemblierte HTML-String.
   - `onMessage: (message: unknown) => void` — Callback für `postMessage`-Ereignisse aus dem Iframe.
   - `className?: string`
3. Die Komponente rendert ein `<iframe>` mit:
   - `sandbox="allow-scripts"` (keine anderen Permissions!)
   - `srcDoc={srcDoc}`
   - `title="Live Preview"`
4. Ein `useEffect` registriert einen globalen `message`-Event-Listener auf `window`, der Nachrichten vom Iframe entgegennimmt und an `onMessage` weiterreicht.
5. Sicherstellen, dass der Event-Listener bei Unmount entfernt wird.
6. Optional: Herkunftsprüfung (`event.source === iframeRef.current?.contentWindow`) um `onMessage` zu filtern.

**Akzeptanzkriterien:**
- [ ] `PreviewFrame.tsx` existiert und exportiert die Komponente.
- [ ] Das gerenderte `<iframe>` enthält `sandbox="allow-scripts"` und `srcDoc`.
- [ ] Ein `postMessage` aus dem Iframe wird vom Host-Window empfangen und an `onMessage` weitergegeben.
- [ ] Der Event-Listener wird beim Unmount der Komponente sauber entfernt.

---

## Task 4.2: Code-Assembler/Compiler implementieren

**Beschreibung:**
Die drei Code-Fragmente (HTML, CSS, JS) müssen zu einem validen, vollständigen HTML-Dokument zusammengefügt werden.

**Aktionen:**
1. Datei `src/lib/codeAssembler.ts` anlegen.
2. Eine Funktion `assembleDocument(params: { html: string; css: string; js: string }): string` implementieren.
3. Die Funktion baut folgende Dokumentenstruktur:
   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="UTF-8">
       <style>
         /* CSS-Code hier */
       </style>
     </head>
     <body>
       /* HTML-Code hier */
       <script>
         /* Interceptor-Skript (siehe Task 4.4) */
         /* Schüler-JS (ggf. durch Loop-Protection transformiert, siehe Task 4.5) */
       </script>
     </body>
   </html>
   ```
4. Sicherstellen, dass eingebetteter Code nicht das schließende `</style>` oder `</script>` des Host-Dokuments kaputtmachen kann (durch Escaping oder CDATA ist das bei modernen Browsern weniger kritisch, aber wachsam sein).
5. Einen kleinen Unit-Test-artigen Check im Code: Wenn `assembleDocument` mit `html: '<h1>Test</h1>'`, `css: 'h1 { color: red; }'`, `js: 'console.log(1)'` aufgerufen wird, muss der Output diese drei Strings an den korrekten Stellen enthalten.

**Akzeptanzkriterien:**
- [ ] `assembleDocument` existiert und ist vollständig typisiert.
- [ ] Der Output ist syntaktisch korrektes HTML5.
- [ ] CSS liegt im `<head>` innerhalb von `<style>`.
- [ ] HTML liegt im `<body>`.
- [ ] JS liegt am Ende des `<body>` innerhalb von `<script>`.
- [ ] `npm run build` bleibt nach der Einführung fehlerfrei.

---

## Task 4.3: Debounce-Hook für Live-Preview erstellen

**Beschreibung:**
Ein Live-Preview soll nicht bei jedem Tastenanschlag neu rendern, sondern erst nach einer kurzen Pause (~500 ms), um die Performance zu schonen.

**Aktionen:**
1. Datei `src/hooks/useDebounce.ts` anlegen (falls noch nicht vorhanden).
2. Einen generischen Hook `useDebounce<T>(value: T, delay: number): T` implementieren.
3. In `TaskPage.tsx` (oder später in einem Sandbox-Container) diesen Hook nutzen, um die Code-Snippets zu debouncen, bevor sie an `assembleDocument` übergeben werden.

**Akzeptanzkriterien:**
- [ ] `useDebounce` existiert und ist generisch typisiert.
- [ ] Änderungen im Editor triggern nicht sofort einen Re-Render der Sandbox, sondern erst nach der konfigurierten Verzögerung.
- [ ] Während des Tippens wird ein vorheriger Timer zurückgesetzt (keine stapelnden Updates).

---

## Task 4.4: `postMessage`-Interceptor und `SimulatedConsole` implementieren

**Beschreibung:**
Die Browser-DevTools sind für Schüler nicht sichtbar. Daher muss die Plattform eine eigene Konsole simulieren, die `console.log`, `console.warn`, `console.error` und Laufzeitfehler aus dem Iframe anzeigt.

**Aktionen:**
1. **Interceptor-Skript definieren:**
   - Eine Funktion `getConsoleInterceptorScript(): string` in `src/lib/codeAssembler.ts` (oder einer neuen Datei `src/lib/interceptor.ts`) anlegen.
   - Diese Funktion gibt einen JavaScript-String zurück, der im Iframe vor dem Schüler-Code ausgeführt wird.
   - Das Skript überschreibt `console.log`, `console.warn`, `console.error` und `window.onerror`.
   - Jeder Aufruf sendet via `window.parent.postMessage({ type: 'CONSOLE', level: 'log' | 'warn' | 'error', payload: [...args] }, '*')`.
   - `window.onerror` sendet `{ type: 'ERROR', message, filename, lineno, colno }`.
2. **SimulatedConsole-Komponente:**
   - Datei `src/components/SimulatedConsole.tsx` anlegen.
   - Die Komponente erhält `logs: ConsoleLog[]` als Prop.
   - Typ `ConsoleLog` definieren: `{ id: string; level: 'log' | 'warn' | 'error'; message: string; timestamp: number }`.
   - Die Logs werden in einer scrollbaren, farblich unterschiedenen Liste dargestellt (grau für log, gelb für warn, rot für error).
   - Ein "Konsole leeren"-Button ist optional, aber nützlich.
3. **Nachrichten-Handler in der Host-App:**
   - In `TaskPage` (oder einem Sandbox-Container) einen Handler für `onMessage` des `PreviewFrame` implementieren.
   - Nachrichten mit `type === 'CONSOLE'` werden in den lokalen State der `TaskPage` als `ConsoleLog` angehängt.
   - Nachrichten mit `type === 'ERROR'` werden ebenfalls angehängt, aber mit `level: 'error'`.

**Akzeptanzkriterien:**
- [ ] `getConsoleInterceptorScript` existiert und überschreibt `console.*` sowie `window.onerror`.
- [ ] `SimulatedConsole.tsx` rendert Logs unterschiedlich je nach Level.
- [ ] Ein `console.log('Hallo')` im Schüler-Code erscheint in der simulierten Konsole.
- [ ] Ein Laufzeitfehler im Schüler-Code (z. B. `throw new Error('Oops')`) erscheint als roter Eintrag in der Konsole.
- [ ] Die Konsole ist scrollbar und zeigt mehrere Einträge an.

---

## Task 4.5: AST-basierte Loop-Protection implementieren

**Beschreibung:**
Ein versehentlich eingetippter `while(true)`-Loop darf den Browser-Tab nicht einfrieren. Der Code muss vor der Ausführung instrumentiert werden.

**Aktionen:**
1. `npm install acorn acorn-walk astring` ausführen.
2. Datei `src/lib/loopProtect.ts` anlegen.
3. Eine Funktion `protectLoops(jsCode: string): string` implementieren:
   - Schritt 1: `const ast = acorn.parse(jsCode, { ecmaVersion: 'latest' })`.
   - Schritt 2: Mit `acorn-walk` alle `ForStatement`, `WhileStatement`, `DoWhileStatement` finden.
   - Schritt 3: Für jede gefundene Schleife den Rumpf (`body`) modifizieren. Am Anfang des Rumpfs wird ein Check eingefügt:
     ```js
     if (Date.now() - __loopStart > 500) {
       throw new Error('Infinite Loop detected');
     }
     ```
     Dazu muss vor der Schleife eine Variable `const __loopStart = Date.now();` eingefügt werden.
   - Hinweis: Wenn der Rumpf ein einzelnes Statement ist (kein Block `{...}`), muss er zuerst in einen Block gewrappt werden.
   - Schritt 4: `astring.generate(ast)` aufrufen, um den transformierten Code zurückzuerhalten.
4. Fehlerbehandlung: Wenn `acorn.parse` fehlschlägt (z. B. wegen Syntaxfehlern im Schüler-Code), wird der ursprüngliche Code unverändert zurückgegeben. Der Syntaxfehler wird dann natürlich vom Browser im Iframe gemeldet (und über den Interceptor in der Konsole angezeigt).

**Akzeptanzkriterien:**
- [ ] `acorn`, `acorn-walk` und `astring` sind installiert.
- [ ] `protectLoops` transformiert einen `while(true) {}` so, dass er nach ~500 ms abbricht.
- [ ] Ein `for(;;) { console.log('x'); }` bricht ebenfalls ab.
- [ ] Gültiger Code ohne Schleifen bleibt funktional identisch.
- [ ] Syntaxfehler im Schüler-Code führen nicht zum Absturz des Loop-Protectors, sondern werden durchgereicht.
- [ ] Der Fehler "Infinite Loop detected" erscheint in der simulierten Konsole.

---

## Task 4.6: Sandbox in `TaskPage` integrieren

**Beschreibung:**
Alle bisherigen Einzelkomponenten (Editor, Assembler, PreviewFrame, SimulatedConsole, Loop-Protection) müssen in der `TaskPage` zusammengesetzt werden.

**Aktionen:**
1. `TaskPage.tsx` erweitern:
   - Zustand für `consoleLogs` hinzufügen.
   - Die drei Code-Snippets (HTML, CSS, JS) aus dem Store abrufen.
   - `useDebounce` anwenden, um die Code-Snippets zu debouncen (500 ms).
   - `assembleDocument` aufrufen. Dabei:
     - `html` und `css` direkt übergeben.
     - `js` zuerst durch `protectLoops` laufen lassen, dann zusammen mit dem Interceptor-Skript in das `<script>`-Tag packen.
   - `PreviewFrame` mit dem assemblierten `srcDoc` rendern.
   - `onMessage` des Frames filtert Konsole/Error-Nachrichten und fügt sie `consoleLogs` hinzu.
   - `SimulatedConsole` mit den Logs unterhalb des Editors (oder neben dem Iframe) rendern.
2. Layout-Vorbereitung: Noch nicht das finale 3-Spalten-Layout, aber eine sinnvolle vorläufige Anordnung:
   - Oben: Aufgabentitel
   - Mitte: EditorPanel (links) und PreviewFrame (rechts) nebeneinander (oder untereinander auf kleinen Screens)
   - Unten: SimulatedConsole

**Akzeptanzkriterien:**
- [ ] Tippen im Editor aktualisiert das Iframe nach ca. 500 ms Pause.
- [ ] Das Iframe zeigt das visuelle Resultat des HTML/CSS/JS-Codes korrekt an.
- [ ] `console.log` aus dem Iframe erscheint in der `SimulatedConsole` unterhalb.
- [ ] Ein `while(true)` im JS-Tab friert den Tab nicht ein, sondern wirft nach 500 ms einen Fehler in die Konsole.

---

## Task 4.7: Sicherheits- und Funktions-Smoke-Tests durchführen

**Beschreibung:**
Die kritischste Phase des Projekts erfordert gezielte manuelle Tests, um Sicherheit und Stabilität zu verifizieren.

**Aktionen:**
1. `npm run lint` und `npm run build` ausführen.
2. Dev-Server starten und folgende Szenarien testen:
   - **Szenario A (Normalfall):** Task `html-basics-03` öffnen, im CSS-Tab `body { background: blue; }` eingeben. Das Iframe soll blau werden.
   - **Szenario B (Konsole):** Im JS-Tab `console.log('Hello from iframe');` eingeben. Die simulierte Konsole soll den Text anzeigen.
   - **Szenario C (Endlosschleife):** Im JS-Tab `while(true) {}` eingeben. Nach kurzer Zeit muss "Infinite Loop detected" in der Konsole erscheinen. Der Host-Tab darf nicht einfrieren.
   - **Szenario D (Isolation):** Im JS-Tab `window.parent.document.body.style.background = 'red'` eingeben. Das Host-Fenster darf sich NICHT verfärben (dank `sandbox="allow-scripts"` und Same-Origin-Policy).
   - **Szenario E (localStorage):** Im JS-Tab `localStorage.setItem('hack', '1')` eingeben. Der `localStorage` der Host-Domain darf nicht verändert werden (Null-Origin des Iframes).
3. Alle Ergebnisse mental (oder kurz notiert) verifizieren.

**Akzeptanzkriterien:**
- [ ] `npm run lint` und `npm run build` sind fehlerfrei.
- [ ] Szenario A bis E verhalten sich wie erwartet.
- [ ] Keine unbehandelten Laufzeitfehler in der Browser-Konsole des Host-Tabs.

---

## Task 4.8: Dokumentation aktualisieren

**Beschreibung:**
`state/current-state.md` muss den Abschluss von Phase 4 dokumentieren und den Übergang zu Phase 5 vorbereiten.

**Aktionen:**
1. In `state/current-state.md`:
   - Phase 4 auf ✅ setzen.
   - Phase 5 auf 🔄 setzen.
   - Abgeschlossene Meilensteine um "Phase 4 Implementierung" ergänzen.
   - Offene Entscheidungen aktualisieren: Loop-Protection (Acorn) als entschieden markieren.
2. Optional: In `AGENTS.md` einen kurzen Hinweis zur Sandbox-Sicherheit ergänzen.

**Akzeptanzkriterien:**
- [ ] `state/current-state.md` reflektiert korrekt, dass Phase 4 abgeschlossen ist.
- [ ] Phase 5 ist als neue aktive Phase markiert.

---

## Phase-4 Definition of Done (Zusammenfassung)

Die Phase 4 gilt als **vollständig abgeschlossen**, wenn folgende Bedingungen erfüllt sind:

1. ✅ Ein `<iframe sandbox="allow-scripts" srcDoc="...">` rendert den Schüler-Code isoliert.
2. ✅ `assembleDocument` kombiniert HTML-, CSS- und JS-Fragmente zu einem validen Dokument.
3. ✅ Ein Debounce-Hook verhindert zu häufige Re-Renders (500 ms Verzögerung).
4. ✅ Ein `postMessage`-Interceptor leitet `console.log` und Fehler aus dem Iframe in die Host-App um.
5. ✅ Eine `SimulatedConsole`-Komponente visualisiert diese Logs und Fehler.
6. ✅ Ein AST-basierter Loop-Protector (Acorn) bricht Endlosschleifen nach 500 ms ab.
7. ✅ Die `TaskPage` integriert Editor, Sandbox und Konsole als zusammenspielendes Ganzes.
8. ✅ Sicherheits-Smoke-Tests bestätigen, dass der Iframe-Code keinen Zugriff auf `window.parent` oder den Host-`localStorage` hat.
9. ✅ `npm run lint`, `npm run format` und `npm run build` laufen fehlerfrei durch.
10. ✅ `state/current-state.md` dokumentiert den Abschluss von Phase 4.
