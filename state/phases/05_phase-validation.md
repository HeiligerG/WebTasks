# Phase 5: Validierungs-Engine & Feedback-System — Detaillierte Task-Planung

> **Dokumentenzweck:** Dieses Dokument enthält die vollständige Aufschlüsselung aller Tasks für Phase 5. Jeder Task ist eigenständig abgrenzbar, priorisiert und mit konkreten Akzeptanzkriterien versehen.  
> **Phase-DoD:** Die Plattform kann den vom Schüler geschriebenen Code auf Knopfdruck validieren und gibt gezieltes, aus dem JSON stammendes Feedback zurück. HTML/CSS wird via DOM-Inspektion geprüft, JavaScript via Console-Output-Abgleich und Function-Calls. Bei Erfolg wird die Aufgabe als abgeschlossen markiert.

---

## Grundsatzentscheidung: Zwei Validierungs-Pfade

Die Validierung unterscheidet sich fundamental zwischen statischem Design-Code (HTML/CSS) und imperativem Logik-Code (JavaScript).

**Pfad A — DOM-Inspektion für HTML/CSS:**
Da das Live-Preview-Iframe den gerenderten DOM bereits visualisiert, greifen DOM-Tests direkt auf `iframe.contentDocument` bzw. `iframe.contentWindow.document` zu. Dieser Ansatz ist synchron, verzeiht syntaktische Varianten (Leerzeichen, Anführungszeichen) und prüft das tatsächliche visuelle Ergebnis.

**Pfad B — Iframe-Injection für JavaScript:**
Für JS-Tests (Console und Function) wird ein temporärer, unsichtbarer Validation-Iframe erzeugt. In diesen Iframe wird der Schüler-Code zusammen mit einem spezifischen Test-Runner-Skript injiziert. Der Test-Runner führt die Validierung durch und meldet das Ergebnis via `postMessage` zurück an die Host-App. Diese Trennung verhindert, dass die Live-Preview-Konsole durch Validierungsläufe verunreinigt wird.

---

## Task-Übersicht

| ID  | Task-Name                                                      | Priorität | Geschätzter Aufwand |
| :-- | :------------------------------------------------------------- | :-------- | :------------------ |
| 5.1 | Validierungs-Engine-Interface und Ergebnistypen definieren     | Kritisch  | Klein               |
| 5.2 | DOM-Test-Validator implementieren                              | Kritisch  | Mittel              |
| 5.3 | Console-Test-Validator implementieren                          | Hoch      | Mittel              |
| 5.4 | Function-Test-Validator implementieren                         | Hoch      | Mittel              |
| 5.5 | "Code prüfen"-Button und Feedback-UI in `TaskPage` integrieren | Kritisch  | Mittel              |
| 5.6 | Zustand erweitern: Validierungsergebnis und Aufgabenabschluss  | Hoch      | Klein               |
| 5.7 | Integrationstest mit Canary-Bundle                             | Kritisch  | Klein               |
| 5.8 | Dokumentation aktualisieren (`current-state.md`)               | Mittel    | Klein               |

---

## Task 5.1: Validierungs-Engine-Interface und Ergebnistypen definieren

**Beschreibung:**
Bevor konkrete Test-Logiken geschrieben werden, muss die Architektur der Validierungs-Engine feststehen.

**Aktionen:**

1. Datei `src/lib/validationEngine.ts` anlegen.
2. Folgende Typen/Interfaces definieren:
   - `type TestResult = { testIndex: number; passed: boolean; feedback: string }`
   - `type ValidationResult = { success: boolean; results: TestResult[] }`
3. Eine Hauptfunktion `validateTask(task: Task, previewIframe: HTMLIFrameElement): Promise<ValidationResult>` als Entry-Point definieren.
4. Die Funktion soll asynchron sein, da JS-Tests (Console/Function) auf Iframe-`postMessage`-Antworten warten müssen.
5. Einen Dispatch-Mechanismus vorsehen: Je nach `validationTest.type` wird `validateDomTest`, `validateConsoleTest` oder `validateFunctionTest` aufgerufen.

**Akzeptanzkriterien:**

- [ ] `src/lib/validationEngine.ts` existiert und exportiert `ValidationResult`, `TestResult` und `validateTask`.
- [ ] `validateTask` akzeptiert ein `Task`-Objekt und eine `HTMLIFrameElement`-Referenz.
- [ ] Der Rumpf der Funktion ist als `async` deklariert und gibt ein `Promise<ValidationResult>` zurück.

---

## Task 5.2: DOM-Test-Validator implementieren

**Beschreibung:**
HTML/CSS-Aufgaben werden durch Inspektion des gerenderten DOMs im Live-Preview-Iframe validiert.

**Aktionen:**

1. In `src/lib/validationEngine.ts` eine Funktion `validateDomTest(test: DomTest, iframe: HTMLIFrameElement): TestResult` implementieren.
2. Logik:
   - Zugriff auf das Dokument: `const doc = iframe.contentDocument ?? iframe.contentWindow?.document;`
   - Falls `doc` nicht verfügbar: Rückgabe `passed: false` mit generischem Fehler.
   - Element selektieren: `const el = doc.querySelector(test.selector);`
   - Falls `el` null: Rückgabe `passed: false` mit `test.feedbackFailure`.
   - Falls `test.property` und `test.expectedValue` gesetzt sind:
     - `const computed = doc.defaultView?.getComputedStyle(el);`
     - `const actual = computed?.getPropertyValue(test.property) ?? '';`
     - **Hinweis:** `getComputedStyle` normalisiert Werte (z. B. `red` → `rgb(255, 0, 0)`). Für Phase 5 wird ein exakter String-Vergleich (`actual === test.expectedValue`) verwendet. Das JSON muss daher die normalisierten Werte enthalten (z. B. `rgb(255, 0, 0)` statt `red`). Eine spätere Phase kann eine Value-Normalisierung hinzufügen.
     - Bei Gleichheit: `passed: true`, sonst `passed: false` mit `test.feedbackFailure`.
   - Falls nur `test.selector` geprüft werden muss (keine `property`):
     - `passed: true` wenn Element gefunden, sonst `passed: false` mit `test.feedbackFailure`.
3. Optional: `feedbackSuccess` aus dem Test verwenden, falls vorhanden, andernfalls eine Standard-Erfolgsmeldung.

**Akzeptanzkriterien:**

- [ ] `validateDomTest` existiert und ist vollständig typisiert.
- [ ] Ein fehlendes Element führt zu `passed: false` mit dem korrekten `feedbackFailure`.
- [ ] Ein vorhandenes Element mit passendem `computedStyle`-Wert führt zu `passed: true`.
- [ ] Ein vorhandenes Element mit falschem Stil führt zu `passed: false` mit dem korrekten `feedbackFailure`.

---

## Task 5.3: Console-Test-Validator implementieren

**Beschreibung:**
Einfache JavaScript-Aufgaben (z. B. `console.log('Hallo')`) werden validiert, indem die Konsolenausgabe mit dem erwarteten Output verglichen wird.

**Aktionen:**

1. In `src/lib/validationEngine.ts` eine Funktion `validateConsoleTest(test: ConsoleTest, code: { html: string; css: string; js: string }): Promise<TestResult>` implementieren.
2. Da die Live-Preview-Konsole bereits läuft und möglicherweise Logs aus früheren Eingaben enthält, darf diese nicht für die Validation verwendet werden.
3. Stattdessen wird ein temporärer, unsichtbarer Iframe erstellt:
   - `const tempIframe = document.createElement('iframe');`
   - `tempIframe.style.display = 'none';`
   - `document.body.appendChild(tempIframe);`
4. Ein `srcDoc` wird mit `assembleDocument` und dem Schüler-Code + Interceptor gebaut.
5. Ein Promise-Wrapper lauscht auf `message`-Events vom temporären Iframe.
6. Nach dem Iframe-Load (oder einer kurzen Timeout-Pause von z. B. 300 ms) werden die gesammelten Logs mit `test.expectedOutput` verglichen:
   - Falls `expectedOutput` ein String ist: Prüfe, ob mindestens ein Log-Eintrag exakt diesen String enthält.
   - Falls `expectedOutput` ein Array ist: Prüfe, ob die Logs exakt diese Sequenz wiedergeben (Reihenfolge beachten).
7. Das temporäre Iframe wird aus dem DOM entfernt.

**Akzeptanzkriterien:**

- [ ] `validateConsoleTest` ist asynchron und gibt ein `Promise<TestResult>` zurück.
- [ ] Ein `console.log('Hallo')` im Schüler-Code führt bei `expectedOutput: 'Hallo'` zu `passed: true`.
- [ ] Ein `console.log('Welt')` bei `expectedOutput: 'Hallo'` führt zu `passed: false` mit `test.feedbackFailure`.
- [ ] Das temporäre Validation-Iframe wird nach dem Test sauber aus dem DOM entfernt.

---

## Task 5.4: Function-Test-Validator implementieren

**Beschreibung:**
Komplexere JS-Aufgaben (z. B. "Schreibe eine Funktion `addiere(a, b)`") werden durch direkte Funktionsaufrufe mit vordefinierten Argumenten validiert.

**Aktionen:**

1. In `src/lib/validationEngine.ts` eine Funktion `validateFunctionTest(test: FunctionTest, code: { html: string; css: string; js: string }): Promise<TestResult>` implementieren.
2. Ähnlich wie Console-Test wird ein temporäres Validation-Iframe verwendet.
3. Der `srcDoc` enthält:
   - Schüler-JS (durch `protectLoops` geschützt)
   - Ein Validation-Skript am Ende:
     ```js
     try {
       const result = window[functionName](...args);
       window.parent.postMessage({ type: 'VALIDATION', result: result }, '*');
     } catch (e) {
       window.parent.postMessage({ type: 'VALIDATION_ERROR', error: e.message }, '*');
     }
     ```
4. Die Host-App wartet auf die `postMessage`-Antwort (max. z. B. 1000 ms Timeout).
5. Vergleich des Rückgabewerts mit `test.expectedResult`:
   - Für primitive Typen: `===`
   - Für Arrays/Objekte: `JSON.stringify(actual) === JSON.stringify(expectedResult)`
6. Rückgabe von `passed: true` bei Übereinstimmung, sonst `passed: false` mit `test.feedbackFailure`.
7. Das temporäre Iframe wird entfernt.

**Akzeptanzkriterien:**

- [ ] `validateFunctionTest` ist asynchron und gibt ein `Promise<TestResult>` zurück.
- [ ] Eine korrekte Schüler-Funktion `function addiere(a,b){return a+b;}` führt bei `args: [2,3]` und `expectedResult: 5` zu `passed: true`.
- [ ] Eine falsche Rückgabe oder ein Laufzeitfehler führt zu `passed: false` mit dem korrekten `feedbackFailure`.
- [ ] Ein Timeout (z. B. wenn die Funktion hängt) wird abgefangen und als Fehler gewertet.

---

## Task 5.5: "Code prüfen"-Button und Feedback-UI in `TaskPage` integrieren

**Beschreibung:**
Die Validierung muss für den Schüler auslösbar und das Ergebnis visuell verständlich sein.

**Aktionen:**

1. In `TaskPage.tsx` einen Button "Code prüfen" oberhalb oder unterhalb des Editors platzieren.
2. Einen lokalen State `validationResult: ValidationResult | null` hinzufügen.
3. Einen `handleValidate`-Callback implementieren:
   - Ruft `validateTask(task, previewFrameRef.current)` auf.
   - Speichert das Ergebnis in `validationResult`.
   - Falls `result.success === true`: Ruft `markTaskCompleted(task.id)` im Store auf.
4. Eine Feedback-Komponente oder Inline-UI unterhalb des Buttons rendern:
   - Erfolg: Grüne Box "Super! Alle Tests bestanden." + ggf. Konfetti-Vorbereitung (nur Platzhalter, Konfetti kommt in Phase 7).
   - Misserfolg: Für jeden fehlgeschlagenen Test eine rote/graue Box mit dem jeweiligen `feedbackFailure`-Text.
5. Loading-State während der Validierung (da Console/Function async sind).

**Akzeptanzkriterien:**

- [ ] Der Button "Code prüfen" ist in `TaskPage` sichtbar und klickbar.
- [ ] Ein Klick startet die Validierung und zeigt anschließend das Ergebnis an.
- [ ] Bei vollem Erfolg wird die Aufgabe via `markTaskCompleted` als abgeschlossen markiert.
- [ ] Fehlgeschlagene Tests zeigen die jeweilige, aus dem JSON stammende Fehlermeldung an.
- [ ] Während der Validierung wird ein visueller Ladezustand angezeigt (z. B. deaktivierter Button).

---

## Task 5.6: Zustand erweitern: Validierungsergebnis und Aufgabenabschluss

**Beschreibung:**
Der globale Store muss wissen, welche Aufgaben bereits gelöst wurden. Dies ist die Grundlage für Fortschrittsbalken und Badges in späteren Phasen.

**Aktionen:**

1. `src/stores/appStore.ts` überprüfen. `markTaskCompleted` existiert bereits.
2. Optional (empfohlen): Einen `taskResults`-State hinzufügen:
   - `taskResults: Record<string, boolean>` — Speichert pro `taskId`, ob die Aufgabe bestanden wurde.
   - `setTaskResult: (taskId: string, passed: boolean) => void`
3. Dieser State ist nicht zwingend für Phase 5, aber er vereinfacht die spätere Fortschrittsanzeige erheblich.
4. Sicherstellen, dass `completedTasks` keine Duplikate enthält (ist bereits implementiert).

**Akzeptanzkriterien:**

- [ ] `markTaskCompleted` funktioniert wie bisher und fügt `taskId` zu `completedTasks` hinzu.
- [ ] (Optional) `taskResults` ist im Store verfügbar und persistiert Bestehen/Fehlschlagen pro Aufgabe.
- [ ] `npm run build` bleibt nach Store-Änderungen fehlerfrei.

---

## Task 5.7: Integrationstest mit Canary-Bundle

**Beschreibung:**
Die gesamte Validierungs-Pipeline wird anhand des Canary-Bundles End-to-End getestet.

**Aktionen:**

1. Dev-Server starten.
2. **Test A (DOM-Test erfolgreich):**
   - Öffne `/task/bundle-01-html-basics/html-basics-01`.
   - Ändere HTML zu `<h1>Hallo</h1>`.
   - Klicke "Code prüfen".
   - Erwartet: Grüne Erfolgsmeldung.
3. **Test B (DOM-Test fehlgeschlagen):**
   - Lass HTML bei `<p>Hallo Welt</p>`.
   - Klicke "Code prüfen".
   - Erwartet: Fehlermeldung "Wir können keine `<h1>`-Überschrift finden...".
4. **Test C (CSS-DOM-Test):**
   - Öffne `/task/bundle-01-html-basics/html-basics-03`.
   - Füge CSS hinzu: `.profile-card img { border-radius: 50%; }`.
   - Klicke "Code prüfen".
   - Erwartet: Alle Tests bestanden (inkl. `.profile-card` existiert und `border-radius` ist korrekt).
5. Alle Tests manuell verifizieren.

**Akzeptanzkriterien:**

- [ ] Test A, B und C verhalten sich wie erwartet.
- [ ] Bei Erfolg wird die Aufgabe in `completedTasks` des Stores aufgenommen.
- [ ] Keine Laufzeitfehler während der Tests in der Browser-Konsole.

---

## Task 5.8: Dokumentation aktualisieren

**Beschreibung:**
`state/current-state.md` muss den Abschluss von Phase 5 dokumentieren und den Übergang zu Phase 6 vorbereiten.

**Aktionen:**

1. In `state/current-state.md`:
   - Phase 5 auf ✅ setzen.
   - Phase 6 auf 🔄 setzen.
   - Abgeschlossene Meilensteine um "Phase 5 Implementierung" ergänzen.

**Akzeptanzkriterien:**

- [ ] `state/current-state.md` reflektiert korrekt, dass Phase 5 abgeschlossen ist.
- [ ] Phase 6 ist als neue aktive Phase markiert.

---

## Phase-5 Definition of Done (Zusammenfassung)

Die Phase 5 gilt als **vollständig abgeschlossen**, wenn folgende Bedingungen erfüllt sind:

1. ✅ Eine `validateTask`-Engine existiert und kann DOM-, Console- und Function-Tests ausführen.
2. ✅ DOM-Tests greifen auf das Live-Preview-Iframe zu und prüfen Element-Existenz sowie berechnete Styles.
3. ✅ Console-Tests führen den Code in einem temporären Iframe aus und vergleichen die `console.log`-Ausgaben.
4. ✅ Function-Tests rufen Schüler-Funktionen in einem temporären Iframe auf und prüfen Rückgabewerte.
5. ✅ Ein "Code prüfen"-Button in `TaskPage` triggert die Validierung und zeigt menschenlesbares Feedback an.
6. ✅ Bei erfolgreicher Validierung wird die Aufgabe im globalen Store als `completed` markiert.
7. ✅ Integrationstests mit dem Canary-Bundle bestätigen die Korrektheit aller drei Test-Typen.
8. ✅ `npm run lint`, `npm run format` und `npm run build` laufen fehlerfrei durch.
9. ✅ `state/current-state.md` dokumentiert den Abschluss von Phase 5.
