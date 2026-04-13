# Phase 8: Curriculum-Content & End-to-End-Integration — Detaillierte Task-Planung

> **Dokumentenzweck:** Dieses Dokument enthält die vollständige Aufschlüsselung aller Tasks für Phase 8. Jeder Task ist eigenständig abgrenzbar, priorisiert und mit konkreten Akzeptanzkriterien versehen.  
> **Phase-DoD:** Alle drei didaktischen Bundles (HTML/CSS, JavaScript, Interaktive Web-Apps) sind als vollständige, validierte JSON-Dateien vorhanden. Die `HomePage` lädt alle Bundles dynamisch. Ein vollständiger End-to-End-Walkthrough bestätigt, dass der Lernpfad von der ersten Überschrift bis zur interaktiven Anwendung stimmig und fehlerfrei durchlaufen werden kann.

---

## Task-Übersicht

| ID  | Task-Name                                                    | Priorität | Geschätzter Aufwand |
| :-- | :----------------------------------------------------------- | :-------- | :------------------ |
| 8.1 | Bundle 2: "JavaScript Grundlagen" als JSON erstellen         | Kritisch  | Mittel              |
| 8.2 | Bundle 3: "Interaktive Web-Applikationen" als JSON erstellen | Kritisch  | Mittel              |
| 8.3 | `HomePage` anpassen: Alle drei Bundles laden                 | Kritisch  | Klein               |
| 8.4 | Content-Loader und Routing für multiple Bundles validieren   | Hoch      | Klein               |
| 8.5 | End-to-End-Walkthrough durchführen und korrigieren           | Kritisch  | Mittel              |
| 8.6 | Dokumentation aktualisieren (`current-state.md`)             | Mittel    | Klein               |

---

## Task 8.1: Bundle 2 "JavaScript Grundlagen" als JSON erstellen

**Beschreibung:**
Das zweite Bundle fokussiert sich ausschließlich auf JavaScript-Logik. HTML- und CSS-Editoren werden hier weitgehend ausgeblendet; der Fokus liegt auf der simulierten Konsole und Funktions-Tests.

**Aktionen:**

1. Datei `public/bundles/bundle-02-javascript-basics.json` anlegen.
2. Bundle-Metadaten:
   - `id`: `"bundle-02-javascript-basics"`
   - `title`: `"JavaScript Grundlagen"`
   - `description`: `"Lerne die Grundlagen der Programmierlogik mit Variablen, Operatoren und Bedingungen."`
   - `badgeName`: `"JS-Logiker Level 1"`
3. **Task 1 — Variablen als Datenspeicher:**
   - `id`: `js-basics-01`
   - `title`: `Variablen erstellen`
   - `instruction`: Markdown-Erklärung zu `let` und `const`. Aufforderung: Speichere deinen Namen in einer Variable namens `meinName` und gib sie mit `console.log(meinName);` aus.
   - `enabledEditors`: `["js"]`
   - `initialCode`: `{ "html": "", "css": "", "js": "// Schreibe deinen Code hier\n" }`
   - `validationTests`: Console-Test mit `expectedOutput: "Max"` (bzw. einen Platzhalternamen, der in der Instruktion genannt wird). **Hinweis:** Da der Nutzer einen persönlichen Namen eingeben soll, muss das `expectedOutput` flexibel sein. Da Console-Tests in der aktuellen Engine einen exakten String-Vergleich durchführen, wird die Aufgabe so formuliert: "Gib deinen Namen aus. Für diesen Test verwende bitte den Namen **Max**."
4. **Task 2 — Mathematische Operatoren:**
   - `id`: `js-basics-02`
   - `title`: `Mit Zahlen rechnen`
   - `instruction`: Erklärung der Grundrechenarten. Aufforderung: Berechne `12 * 8` und gib das Ergebnis mit `console.log()` aus.
   - `enabledEditors`: `["js"]`
   - `validationTests`: Console-Test mit `expectedOutput: "96"`.
5. **Task 3 — Kontrollstrukturen (if/else):**
   - `id`: `js-basics-03`
   - `title`: `Bedingungen prüfen`
   - `instruction`: Erklärung von `if/else`. Aufforderung: Schreibe eine Funktion `istVolljaehrig(alter)`, die `"volljährig"` oder `"minderjährig"` zurückgibt.
   - `enabledEditors`: `["js"]`
   - `validationTests`: Function-Test mit `functionName: "istVolljaehrig"`, `args: [20]`, `expectedResult: "volljährig"` UND `args: [15]`, `expectedResult: "minderjährig"`. **Hinweis:** Die aktuelle Function-Test-Engine unterstützt nur einen einzelnen Testaufruf pro Function-Test. Daher werden zwei separate `validationTests` vom Typ `function` definiert (einer für `20`, einer für `15`).
6. **Task 4 — Arrays und Iterationen:**
   - `id`: `js-basics-04`
   - `title`: `Arrays durchlaufen`
   - `instruction`: Erklärung von Arrays und `for`-Schleifen. Aufforderung: Schreibe eine Funktion `findeGerade(zahlen)`, die ein Array mit nur den geraden Zahlen zurückgibt.
   - `enabledEditors`: `["js"]`
   - `validationTests`: Function-Test mit `args: [[1, 2, 3, 4, 5, 6]]`, `expectedResult: [2, 4, 6]`.

**Akzeptanzkriterien:**

- [ ] `bundle-02-javascript-basics.json` existiert und ist syntaktisch valides JSON.
- [ ] Das Bundle enthält genau 4 Tasks.
- [ ] Jede Task hat mindestens einen `validationTest`.
- [ ] Alle `feedbackFailure`-Texte sind menschenlesbar und hilfreich.

---

## Task 8.2: Bundle 3 "Interaktive Web-Applikationen" als JSON erstellen

**Beschreibung:**
Das dritte Bundle kombiniert alle drei Technologien und führt in DOM-Manipulation und Event-Handling ein.

**Aktionen:**

1. Datei `public/bundles/bundle-03-interactive-web.json` anlegen.
2. Bundle-Metadaten:
   - `id`: `"bundle-03-interactive-web"`
   - `title`: `"Interaktive Web-Applikationen"`
   - `description`: `"Kombiniere HTML, CSS und JavaScript, um echte, interaktive Web-Anwendungen zu bauen."`
   - `badgeName`: `"Web-Developer Level 1"`
3. **Task 1 — Der Event-Listener:**
   - `id`: `interactive-01`
   - `title`: `Auf Klicks reagieren`
   - `instruction`: Erklärung von `addEventListener`. Aufforderung: Erstelle einen Button mit der ID `klick-mich` im HTML. Verbinde ihn im JavaScript mit einem Event-Listener, der bei einem Klick `console.log("Button geklickt!");` ausgibt.
   - `enabledEditors`: `["html", "js"]`
   - `initialCode`: `{ "html": "<div>Hier kommt der Button hin</div>", "css": "", "js": "// Füge deinen Event-Listener hier ein\n" }`
   - `validationTests`:
     1. DOM-Test: `selector: "#klick-mich"` (prüft Existenz).
     2. Console-Test: `expectedOutput: "Button geklickt!"` (der Test-Runner simuliert das Iframe-Laden; der Event-Listener selbst wird nicht automatisch getriggert). **Problem:** Ein Console-Test führt den Code aus, aber ohne Klick auf den Button erscheint kein Log. **Lösung:** Die Instruktion soll den Schüler anweisen, zusätzlich im JS-Tab direkt `console.log("Button geklickt!");` auszuführen (als Proof-of-Concept), ODER wir verzichten auf den Console-Test für diesen konkreten Event-Listener und prüfen nur das DOM. Für einen Schnuppertag ist das DOM-Testen ausreichend.
     - **Entscheidung:** Ein einzelner DOM-Test auf `#klick-mich` ist ausreichend. Die didaktische Belohnung kommt aus der Live-Preview, wo der Schüler selbst klicken kann.
4. **Task 2 — Dynamische Inhaltsänderung:**
   - `id`: `interactive-02`
   - `title`: `Text dynamisch ändern`
   - `instruction`: Erklärung von `textContent`. Aufforderung: Erstelle einen Button (`#aendern`) und ein Paragraph (`#nachricht`). Beim Klick auf den Button soll der Text des Paragraphen zu `"Hallo JavaScript!"` geändert werden.
   - `enabledEditors`: `["html", "js"]`
   - `initialCode`: `{ "html": "<p id=\"nachricht\">Hallo Welt!</p>\n<button id=\"aendern\">Text ändern</button>", "css": "", "js": "// Füge hier den Event-Listener ein\n" }`
   - `validationTests`:
     1. DOM-Test: `selector: "#aendern"` (Button existiert).
     2. DOM-Test: `selector: "#nachricht"` (Paragraph existiert).
     - **Hinweis:** Ein automatisierter Klick-Test ist technisch möglich, aber für Phase 8 zu aufwändig. Die Schüler validieren ihr Ergebnis visuell in der Live-Preview.
5. **Task 3 (Master-Task) — Color Flipper:**
   - `id`: `interactive-03`
   - `title`: `Color Flipper`
   - `instruction`: Abschlussaufgabe. Erstelle einen Button (`#farbe-aendern`). Beim Klick soll eine zufällige Hex-Farbe generiert und auf das `backgroundColor` des `<body>` angewendet werden. **Tipp:** Verwende `Math.random()` und `Math.floor()`.
   - `enabledEditors`: `["html", "css", "js"]`
   - `initialCode`: `{ "html": "<button id=\"farbe-aendern\">Farbe wechseln</button>", "css": "body { margin: 0; height: 100vh; display: flex; align-items: center; justify-content: center; }", "js": "const button = document.getElementById('farbe-aendern');\n" }`
   - `validationTests`:
     1. DOM-Test: `selector: "#farbe-aendern"` (Button existiert).
     2. DOM-Test: `selector: "body"`, `property: "backgroundColor"` mit `expectedValue` nicht statisch setzbar (da zufällig). **Problem:** Der Hintergrund ist zufällig, also können wir keinen festen `expectedValue` prüfen. **Lösung:** Wir prüfen nur, dass der Button existiert und ein `script` im Dokument vorhanden ist, das `backgroundColor` oder `style` enthält. Alternativ (einfacher): Wir verzichten auf den zweiten DOM-Test für den zufälligen Hintergrund und prüfen nur den Button. Die Schüler sehen das visuelle Ergebnis sofort in der Live-Preview.
     - **Entscheidung:** Ein DOM-Test auf `#farbe-aendern` plus ein Function-Test auf eine Hilfsfunktion `generiereZufallsfarbe()`, die einen Hex-String zurückgibt. Das trennt die Logik vom DOM-Event und macht sie testbar.
     - Zusätzliche Anweisung im `instruction`: "Schreibe zusätzlich eine Funktion `generiereZufallsfarbe()`, die einen zufälligen Hex-Farbcode als String zurückgibt."
     - `validationTests`:
       1. DOM-Test: `selector: "#farbe-aendern"`
       2. Function-Test: `functionName: "generiereZufallsfarbe"`, `args: []`, `expectedResult` nicht exakt prüfbar (zufällig). **Problem:** Function-Tests prüfen auf exakte Gleichheit. **Lösung:** Wir prüfen, ob der Rückgabewert ein String ist und mit `#` beginnt. Das erfordert eine Erweiterung der Validation-Engine. Für Phase 8 ist das zu komplex.
     - **Alternative Lösung:** Wir ersetzen den Function-Test durch einen Console-Test, der `console.log(generiereZufallsfarbe())` ausführt, und prüfen ob der Output ein String beginnend mit `#` ist. Auch das erfordert Engine-Erweiterungen (Regex/Type-Prüfung).
     - **Pragmatische Lösung für Phase 8:** Für den Color-Flipper reichen 2 DOM-Tests: (a) Button existiert, (b) `<body>` hat eine nicht-leere `backgroundColor` (d.h. nicht `rgba(0, 0, 0, 0)` / transparent / weiß). Das ist tricky, weil der Default-Body oft weiß ist. Wir könnten im `initialCode` des Bundles einen roten Default-Hintergrund setzen (`body { background: red; }`) und prüfen, dass er NICHT mehr rot ist. Aber das ist hacky.
     - **Einfachste Lösung:** Nur DOM-Test auf Button-Existenz. Das reicht für den Schnuppertag, da das visuelle Feedback in der Live-Preview der eigentliche Test ist.

**Akzeptanzkriterien:**

- [ ] `bundle-03-interactive-web.json` existiert und ist syntaktisch valides JSON.
- [ ] Das Bundle enthält 3 Tasks (2 + 1 Master-Task).
- [ ] Jede Task hat mindestens einen `validationTest`.
- [ ] Alle Instruktionen sind altersgerecht und motivierend formuliert.

---

## Task 8.3: `HomePage` anpassen: Alle drei Bundles laden

**Beschreibung:**
Die Startseite muss nicht nur das Canary-Bundle, sondern alle drei verfügbaren Bundles laden und anzeigen.

**Aktionen:**

1. In `src/components/HomePage.tsx` das `loadAllBundles`-Array erweitern:
   - `['/bundles/bundle-01-html-basics.json', '/bundles/bundle-02-javascript-basics.json', '/bundles/bundle-03-interactive-web.json']`
2. Sicherstellen, dass `loadAllBundles` mit fehlenden Dateien robust umgeht (es wirft bereits einen aggregierten Fehler, was korrekt ist).
3. Optional: Eine `manifest.json` in `public/bundles/` anlegen, die die Liste der Bundles enthält, und `HomePage` so anpassen, dass sie das Manifest lädt. Dies ist für Phase 8 optional, aber zukunftssicherer. Für die aktuelle Scope-Erfüllung reicht das hartcodierte Array.

**Akzeptanzkriterien:**

- [ ] Die Startseite zeigt alle drei Bundles als Kacheln an.
- [ ] Die Kacheln sind in einer sinnvollen Reihenfolge (Bundle 1, 2, 3).
- [ ] Ein Klick auf Bundle 2 oder 3 navigiert korrekt zur ersten Task des jeweiligen Bundles.

---

## Task 8.4: Content-Loader und Routing für multiple Bundles validieren

**Beschreibung:**
Die `TaskPage` muss in der Lage sein, nicht nur Bundle 1, sondern auch Bundle 2 und 3 korrekt zu laden.

**Aktionen:**

1. `TaskPage.tsx` prüfen. Aktuell ist `loadBundle('/bundles/bundle-01-html-basics.json')` hartcodiert.
2. Eine einfache Mapping-Logik einführen:
   - `const bundleUrl = '/bundles/' + bundleId + '.json';`
   - `loadBundle(bundleUrl)`
3. Sicherstellen, dass `bundleId` aus `useParams()` valid ist (keine Path-Traversal-Probleme, da es nur aus der App-Navigation kommt).
4. Einen Error-State vorsehen, falls die Bundle-Datei nicht gefunden wird (404).

**Akzeptanzkriterien:**

- [ ] Öffnen von `/task/bundle-02-javascript-basics/js-basics-01` lädt Bundle 2 und zeigt Task 1 an.
- [ ] Öffnen von `/task/bundle-03-interactive-web/interactive-01` lädt Bundle 3 und zeigt Task 1 an.
- [ ] Ein ungültiger `bundleId` zeigt eine freundliche Fehlermeldung an.

---

## Task 8.5: End-to-End-Walkthrough durchführen und korrigieren

**Beschreibung:**
Die didaktische Substanz wird durch einen kompletten Durchlauf aller Aufgaben validiert.

**Aktionen:**

1. Dev-Server starten.
2. **Bundle 1 Walkthrough:**
   - Alle 3 Tasks nacheinander öffnen.
   - Jede Aufgabe mit der korrekten Lösung abschließen und validieren.
   - Prüfen, ob das Badge "UI-Designer Level 1" erscheint.
3. **Bundle 2 Walkthrough:**
   - Task 1: `let meinName = 'Max'; console.log(meinName);` → Console-Test bestanden.
   - Task 2: `console.log(12 * 8);` → Console-Test bestanden.
   - Task 3: Funktion `istVolljaehrig` mit if/else → Function-Tests bestanden.
   - Task 4: Funktion `findeGerade` mit for-Schleife → Function-Test bestanden.
   - Prüfen, ob das Badge "JS-Logiker Level 1" erscheint.
4. **Bundle 3 Walkthrough:**
   - Task 1: Button mit ID `klick-mich` erstellen → DOM-Test bestanden.
   - Task 2: Button und Paragraph mit Event-Listener → DOM-Tests bestanden.
   - Task 3: Color Flipper → DOM-Test bestanden, visuelles Ergebnis in Preview prüfen.
   - Prüfen, ob das Badge "Web-Developer Level 1" erscheint.
5. **Certificate Page:**
   - `/certificate` öffnen und prüfen, ob alle 3 Badges und 10 gelöste Aufgaben angezeigt werden.
6. Während des Walkthroughs entdeckte Probleme (Tippfehler in JSON, unklare Instruktionen, falsche `expectedValue`s) sofort beheben.

**Akzeptanzkriterien:**

- [ ] Alle 10 Tasks (3 + 4 + 3) können erfolgreich gelöst und validiert werden.
- [ ] Alle 3 Badges werden bei vollständigem Bundle-Abschluss vergeben.
- [ ] Die Zertifikatsseite zeigt am Ende alle Erfolge korrekt an.
- [ ] Keine unbehandelten Fehler oder Blocker im gesamten Lernpfad.

---

## Task 8.6: Dokumentation aktualisieren

**Beschreibung:**
`state/current-state.md` muss den Abschluss von Phase 8 dokumentieren und den Übergang zu Phase 9 vorbereiten.

**Aktionen:**

1. In `state/current-state.md`:
   - Phase 8 auf ✅ setzen.
   - Phase 9 auf 🔄 setzen.
   - Abgeschlossene Meilensteine um "Phase 8 Implementierung" ergänzen.

**Akzeptanzkriterien:**

- [ ] `state/current-state.md` reflektiert korrekt, dass Phase 8 abgeschlossen ist.
- [ ] Phase 9 ist als neue aktive Phase markiert.

---

## Phase-8 Definition of Done (Zusammenfassung)

Die Phase 8 gilt als **vollständig abgeschlossen**, wenn folgende Bedingungen erfüllt sind:

1. ✅ `bundle-02-javascript-basics.json` existiert mit 4 JS-Tasks (Variablen, Operatoren, if/else, Arrays).
2. ✅ `bundle-03-interactive-web.json` existiert mit 3 interaktiven Tasks (Event-Listener, DOM-Manipulation, Color Flipper).
3. ✅ Die `HomePage` lädt alle drei Bundles und zeigt sie als Kacheln an.
4. ✅ Die `TaskPage` lädt Bundles dynamisch anhand der `bundleId` aus der URL.
5. ✅ Ein vollständiger End-to-End-Walkthrough aller 10 Aufgaben war erfolgreich.
6. ✅ Alle 3 Badges werden bei Bundle-Abschluss korrekt vergeben.
7. ✅ `npm run lint`, `npm run format` und `npm run build` laufen fehlerfrei durch.
8. ✅ `state/current-state.md` dokumentiert den Abschluss von Phase 8.
