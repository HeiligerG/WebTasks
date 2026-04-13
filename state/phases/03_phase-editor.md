# Phase 3: Editor-Kern & Code-Eingabe — Detaillierte Task-Planung

> **Dokumentenzweck:** Dieses Dokument enthält die vollständige Aufschlüsselung aller Tasks für Phase 3. Jeder Task ist eigenständig abgrenzbar, priorisiert und mit konkreten Akzeptanzkriterien versehen.  
> **Phase-DoD:** Eine vollständig integrierte CodeMirror-6-basierte Editor-Komponente ist in der `TaskPage` eingebunden. Schüler können zwischen HTML-, CSS- und JS-Editoren per Tab wechseln, Code eingeben, und der Zustand wird im globalen Zustand persistent gehalten. Die Konfiguration ist anfängerfreundlich (Dark Theme, Auto-Closing Brackets, Line-Wrapping).

---

## Grundsatzentscheidung: CodeMirror 6 über @uiw/react-codemirror

Die Wahl des Editors wurde bereits in `Konzept.md` fundiert getroffen. Für die React-Integration wird das offizielle Wrapper-Paket `@uiw/react-codemirror` verwendet. Dieses bietet eine deklarative, props-basierte API, die nahtlos in die React-Komponentenarchitektur passt.

**Begründung:**
- `@uiw/react-codemirror` abstrahiert die imperative CodeMirror-6-Initialisierung in eine React-freundliche Komponente.
- Spracherweiterungen (`@codemirror/lang-html`, `@codemirror/lang-css`, `@codemirror/lang-javascript`) können dynamisch als Props übergeben werden.
- Das Paket unterstützt controlled-value-Patterns, was die Synchronisation mit Zustand erheblich vereinfacht.

---

## Task-Übersicht

| ID | Task-Name | Priorität | Geschätzter Aufwand |
| :--- | :--- | :--- | :--- |
| 3.1 | CodeMirror-Abhängigkeiten installieren | Kritisch | Klein |
| 3.2 | Basis `CodeEditor`-Komponente erstellen | Kritisch | Mittel |
| 3.3 | Spracherweiterungen und Editor-Extensions konfigurieren | Hoch | Klein |
| 3.4 | `EditorPanel`-Komponente mit Tabs implementieren | Kritisch | Mittel |
| 3.5 | Editor-Zustand mit Zustand-Store synchronisieren | Kritisch | Mittel |
| 3.6 | `TaskPage` mit Editor-Panel und Aufgaben-Daten verbinden | Hoch | Mittel |
| 3.7 | Beginner-freundliche Editor-Defaults aktivieren | Mittel | Klein |
| 3.8 | Smoke-Test und Build-Validierung | Kritisch | Klein |
| 3.9 | Dokumentation aktualisieren (`current-state.md`) | Mittel | Klein |

---

## Task 3.1: CodeMirror-Abhängigkeiten installieren

**Beschreibung:**
Der technische Grundstock für den Editor wird durch die Installation der benötigten npm-Pakete gelegt.

**Aktionen:**
1. Folgende Pakete installieren:
   - `@uiw/react-codemirror`
   - `@codemirror/lang-html`
   - `@codemirror/lang-css`
   - `@codemirror/lang-javascript`
   - `@codemirror/theme-one-dark` (oder `@uiw/codemirror-theme-dracula`)
   - `@codemirror/commands` (optional, für zusätzliche Keymaps)
2. In `package.json` verifizieren, dass alle Pakete korrekt gelistet sind.

**Akzeptanzkriterien:**
- [ ] Alle oben genannten CodeMirror-Pakete sind in `package.json` vorhanden.
- [ ] `npm install` schließt ohne Fehler ab.
- [ ] Keine Versionskonflikte zwischen den CodeMirror-Modulen.

---

## Task 3.2: Basis `CodeEditor`-Komponente erstellen

**Beschreibung:**
Die wiederverwendbare Kernkomponente für die Code-Eingabe wird als React-Komponente gekapselt.

**Aktionen:**
1. Datei `src/components/CodeEditor.tsx` anlegen.
2. Eine Komponente `CodeEditor` definieren mit folgenden Props:
   - `value: string` — Der aktuelle Code-Inhalt.
   - `onChange: (value: string) => void` — Callback bei Code-Änderungen.
   - `language: 'html' | 'css' | 'js'` — Bestimmt die Syntax-Highlighting-Sprache.
   - `className?: string` — Optionale zusätzliche CSS-Klassen.
3. Die Komponente rendert `<CodeMirror ... />` aus `@uiw/react-codemirror`.
4. Einen sinnvollen Fallback für unbekannte `language`-Werte vorsehen (z. B. keine Spracherweiterung).

**Akzeptanzkriterien:**
- [ ] `CodeEditor.tsx` existiert und exportiert die `CodeEditor`-Komponente.
- [ ] Die Komponente akzeptiert `value`, `onChange`, `language` und `className`.
- [ ] Ein erster Render-Test (z. B. in `TaskPage.tsx` oder Storybook-äquivalent) zeigt den Editor ohne Fehler an.
- [ ] TypeScript meldet keine Typfehler in der Komponente.

---

## Task 3.3: Spracherweiterungen und Editor-Extensions konfigurieren

**Beschreibung:**
CodeMirror 6 arbeitet extrem modular über Extensions. Je nach Sprache müssen unterschiedliche Language-Pakete geladen werden.

**Aktionen:**
1. Eine Hilfsfunktion `getLanguageExtension(language: 'html' | 'css' | 'js')` in `src/lib/editorExtensions.ts` (oder direkt in `CodeEditor.tsx`) anlegen:
   - `'html'` → `html()`
   - `'css'` → `css()`
   - `'js'` → `javascript()`
2. Eine Hilfsfunktion `getBaseExtensions()` anlegen, die gemeinsame Extensions zurückgibt:
   - `lineNumbers()` (Zeilennummern)
   - `highlightActiveLineGutter()`
   - `drawSelection()`
   - `dropCursor()`
   - `rectangularSelection()`
   - `crosshairCursor()`
   - `highlightActiveLine()`
   - `keymap.of([...defaultKeymap, ...historyKeymap, ...foldKeymap])` (optional)
3. Die `CodeEditor`-Komponente soll `extensions={[...getBaseExtensions(), getLanguageExtension(language)]}` an CodeMirror übergeben.

**Akzeptanzkriterien:**
- [ ] Die Spracherweiterung wechselt korrekt, wenn sich die `language`-Prop ändert.
- [ ] HTML-, CSS- und JS-Code werden mit korrektem Syntax-Highlighting dargestellt.
- [ ] Zeilennummern sind sichtbar.
- [ ] Die Komponente lädt nur die jeweils benötigte Spracherweiterung.

---

## Task 3.4: `EditorPanel`-Komponente mit Tabs implementieren

**Beschreibung:**
Da nicht jede Aufgabe alle drei Sprachen benötigt, muss der Editor in einem containerbasierten Panel mit dynamischen Tabs dargestellt werden.

**Aktionen:**
1. Datei `src/features/editor/EditorPanel.tsx` anlegen.
2. Die Komponente erhält:
   - `taskId: string`
   - `enabledEditors: Array<'html' | 'css' | 'js'>`
   - `initialCode: { html: string; css: string; js: string }`
3. Interner State für den aktiven Tab (`activeTab: 'html' | 'css' | 'js'`).
4. Render-Logik:
   - Tab-Header zeigt nur die in `enabledEditors` erlaubten Tabs an.
   - Der aktive Tab ist visuell hervorgehoben.
   - Unter den Tabs wird der `CodeEditor` für die aktive Sprache gerendert.
5. Falls nur ein Editor aktiviert ist, werden die Tabs ausgeblendet (oder als einzelner Button dargestellt), um UI-Overhead zu vermeiden.

**Akzeptanzkriterien:**
- [ ] `EditorPanel.tsx` existiert und ist vollständig typisiert.
- [ ] Nur die in `enabledEditors` aufgeführten Tabs werden angezeigt.
- [ ] Ein Klick auf einen Tab wechselt den Editor-Inhalt.
- [ ] Die CodeMirror-Instanz behält den jeweiligen Code bei einem Tab-Wechsel bei.
- [ ] Wenn nur ein Editor aktiv ist, ist die Tab-Leiste nicht sichtbar oder deaktiviert.

---

## Task 3.5: Editor-Zustand mit Zustand-Store synchronisieren

**Beschreibung:**
Der vom Schüler eingegebene Code muss über den globalen Zustand verwaltet werden, damit er beim Wechseln zwischen Aufgaben oder Browser-Tabs nicht verloren geht.

**Aktionen:**
1. Den bestehenden `appStore.ts` überprüfen. Der Store enthält bereits `codeSnippets` und `setCode`.
2. Sicherstellen, dass `EditorPanel` beim Ändern des Codes `setCode(taskId, language, newCode)` aufruft.
3. Sicherstellen, dass `EditorPanel` den initialen Code-Wert aus dem Store lädt (falls vorhanden), andernfalls `initialCode` aus der Aufgabe verwendet.
4. Eine kleine Refactoring-Prüfung: Der `codeSnippets`-State sollte pro `taskId` die drei Sprachen halten. Wenn eine Sprache noch nicht im Store existiert, wird sie mit `initialCode[language]` vorbelegt.

**Akzeptanzkriterien:**
- [ ] Code-Änderungen im Editor werden sofort im Zustand-Store gespeichert.
- [ ] Wenn der Nutzer zu einer anderen Aufgabe navigiert und zurückkehrt, ist der zuletzt geschriebene Code wiederhergestellt.
- [ ] Der Store enthält für jede bearbeitete Aufgabe und Sprache den aktuellen Code.
- [ ] `npm run build` bleibt nach der Store-Integration fehlerfrei.

---

## Task 3.6: `TaskPage` mit Editor-Panel und Aufgaben-Daten verbinden

**Beschreibung:**
Die `TaskPage` muss das Canary-Bundle (oder später: das geladene Bundle) konsumieren, die passende Aufgabe finden und das `EditorPanel` mit den korrekten Props füttern.

**Aktionen:**
1. `TaskPage.tsx` erweitern:
   - `useParams` für `bundleId` und `taskId` nutzen.
   - Mit `useEffect` das Bundle über `loadBundle('/bundles/bundle-01-html-basics.json')` laden.
   - Die passende `Task` aus dem Bundle anhand von `taskId` finden.
2. Layout in `TaskPage` vorbereiten (noch nicht das finale 3-Spalten-Layout, sondern ein einfaches vertikales Layout):
   - Oben: Titel der Aufgabe und eine kurze Info.
   - Unten: `EditorPanel` mit den Task-Daten.
3. Loading- und Error-States handhaben (ähnlich wie in `HomePage`).
4. Optional: Einen Button "Code prüfen" als Platzhalter einfügen (funktional erst in Phase 5).

**Akzeptanzkriterien:**
- [ ] `TaskPage` lädt das Bundle und findet die korrekte Aufgabe anhand der URL-Parameter.
- [ ] Das `EditorPanel` wird mit `taskId`, `enabledEditors` und `initialCode` der Aufgabe gerendert.
- [ ] Wenn die `taskId` nicht existiert, wird eine Fehlermeldung angezeigt.
- [ ] Der Code, der in der `TaskPage` eingegeben wird, überlebt einen Tab-Wechsel zur `HomePage` und zurück.

---

## Task 3.7: Beginner-freundliche Editor-Defaults aktivieren

**Beschreibung:**
Die Editor-Erfahrung muss für 12- bis 15-Jährige optimiert sein. Professionelle IDE-Features, die überfordern könnten, werden deaktiviert oder nicht hinzugefügt. Wichtige Komfort-Features werden aktiviert.

**Aktionen:**
1. **Theme:** Ein ansprechendes Dark-Theme als Standard setzen (z. B. `oneDark` aus `@codemirror/theme-one-dark` oder `dracula` aus `@uiw/codemirror-theme-dracula`).
2. **Auto-Closing Brackets:** `@codemirror/autocomplete` bzw. `closeBrackets()` in die Extensions aufnehmen.
3. **Line-Wrapping:** `EditorView.lineWrapping` hinzufügen, um horizontales Scrollen zu vermeiden.
4. **Tab-Indentation:** Einheitliche Einrückung mit 2 Leerzeichen pro Tab (`indentUnit.of("  ")`).
5. (Optional) **Minimap/Search/Command-Palette:** Nicht hinzufügen, um die UI schlank zu halten.

**Akzeptanzkriterien:**
- [ ] Der Editor wird im gewählten Dark-Theme gerendert.
- [ ] Beim Tippen von `(` oder `{` wird das schließende Gegenstück automatisch eingefügt.
- [ ] Lange Zeilen brechen automatisch um (kein horizontaler Scrollbalken).
- [ ] Die Tab-Taste fügt 2 Leerzeichen ein.
- [ ] Keine überflüssigen professionellen IDE-Features (z. B. Minimap) sind sichtbar.

---

## Task 3.8: Smoke-Test und Build-Validierung

**Beschreibung:**
Die Phase wird mit einem End-to-End-Smoke-Test abgeschlossen, bei dem eine Aufgabe im Browser geöffnet, Code eingegeben und zwischen Tabs gewechselt wird.

**Aktionen:**
1. `npm run lint` ausführen und ggf. beheben.
2. `npm run format` ausführen.
3. `npm run build` ausführen.
4. `npm run dev` starten und folgende Szenarien manuell prüfen:
   - URL `/task/bundle-01-html-basics/html-basics-01` öffnet den HTML-Editor.
   - Code eingeben (z. B. `<h1>Test</h1>`) und sicherstellen, dass das Syntax-Highlighting aktiv ist.
   - Zu `/task/bundle-01-html-basics/html-basics-03` navigieren — HTML- und CSS-Tabs sollten sichtbar sein.
   - Code in CSS eingeben, zum HTML-Tab wechseln, zurück zu CSS — der Code ist erhalten.
   - Zurück zur `HomePage` navigieren und wieder zur selben Aufgabe — der Code ist weiterhin im Editor.

**Akzeptanzkriterien:**
- [ ] `npm run lint`, `npm run format` und `npm run build` sind fehlerfrei.
- [ ] Der Browser zeigt den Editor für alle drei Sprachen korrekt an.
- [ ] Code-Eingaben werden zwischen Tab-Wechseln und Seitennavigationen persistent gehalten.
- [ ] Keine Laufzeitfehler in der Browser-Konsole während der Smoke-Tests.

---

## Task 3.9: Dokumentation aktualisieren

**Beschreibung:**
`state/current-state.md` muss den Abschluss von Phase 3 dokumentieren und den Übergang zu Phase 4 vorbereiten.

**Aktionen:**
1. In `state/current-state.md`:
   - Phase 3 auf ✅ setzen.
   - Phase 4 auf 🔄 setzen.
   - Abgeschlossene Meilensteine um "Phase 3 Implementierung" ergänzen.
2. In `AGENTS.md` oder `README.md` bei Bedarf einen Hinweis auf die CodeMirror-Integration ergänzen (optional).

**Akzeptanzkriterien:**
- [ ] `state/current-state.md` reflektiert korrekt, dass Phase 3 abgeschlossen ist.
- [ ] Phase 4 ist als neue aktive Phase markiert.

---

## Phase-3 Definition of Done (Zusammenfassung)

Die Phase 3 gilt als **vollständig abgeschlossen**, wenn folgende Bedingungen erfüllt sind:

1. ✅ CodeMirror 6 ist installiert und über `@uiw/react-codemirror` integriert.
2. ✅ Eine wiederverwendbare `CodeEditor`-Komponente existiert und unterstützt HTML, CSS und JS.
3. ✅ Ein `EditorPanel` mit dynamischen Tabs steuert die Sichtbarkeit der einzelnen Editoren.
4. ✅ Der Editor-Zustand wird über Zustand persistent gehalten (überlebt Navigation zwischen Aufgaben).
5. ✅ Die `TaskPage` lädt eine Aufgabe und rendert das `EditorPanel` mit den korrekten Aufgaben-Daten.
6. ✅ Beginner-freundliche Defaults sind aktiv: Dark Theme, Auto-Closing Brackets, Line-Wrapping, 2-Space-Indentation.
7. ✅ `npm run lint`, `npm run format` und `npm run build` laufen fehlerfrei durch.
8. ✅ `state/current-state.md` dokumentiert den Abschluss von Phase 3.
