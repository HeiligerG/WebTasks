# Phase 6: UI/UX, Navigation & State-Persistenz — Detaillierte Task-Planung

> **Dokumentenzweck:** Dieses Dokument enthält die vollständige Aufschlüsselung aller Tasks für Phase 6. Jeder Task ist eigenständig abgrenzbar, priorisiert und mit konkreten Akzeptanzkriterien versehen.  
> **Phase-DoD:** Die Plattform bietet eine vollständige, responsive und geführte Benutzererfahrung. Die Startseite zeigt alle verfügbaren Bundles mit Fortschrittsstatus. Die TaskPage folgt dem geforderten 3-Spalten-Split-Pane-Layout (Instruktion | Editor | Preview/Konsole). Der gesamte App-Zustand (Code, Abschlüsse, aktive Aufgabe) wird in `localStorage` persistent gespeichert und bei Neuladen wiederhergestellt.

---

## Grundsatzentscheidung: Zustand-Persistenz via Zustand `persist`-Middleware

Für die Speicherung des Fortschritts und des geschriebenen Codes im Browser-`localStorage` wird die eingebaute `persist`-Middleware von Zustand verwendet.

**Begründung:**

- Zustand bietet eine offizielle, minimale `persist`-Middleware, die `localStorage` (oder `sessionStorage`) nahtlos anbindet.
- Keine zusätzlichen Bibliotheken nötig; der Store bleibt an einer zentralen Stelle.
- Die Middleware erlaubt es, nur bestimmte State-Slices zu persistieren (z. B. `codeSnippets`, `completedTasks`, `taskResults`), während transienter State (z. B. `activeTaskId`) ausgeschlossen werden kann.

---

## Task-Übersicht

| ID   | Task-Name                                                       | Priorität | Geschätzter Aufwand |
| :--- | :-------------------------------------------------------------- | :-------- | :------------------ |
| 6.1  | `localStorage`-Persistenz für Zustand-Store implementieren      | Kritisch  | Klein               |
| 6.2  | Markdown-Renderer für Aufgabeninstruktionen integrieren         | Hoch      | Klein               |
| 6.3  | `TaskPage` auf das finale 3-Spalten-Split-Pane-Layout umstellen | Kritisch  | Mittel              |
| 6.4  | `InstructionPanel`-Komponente erstellen                         | Hoch      | Mittel              |
| 6.5  | Startseite (`HomePage`) mit Hero und Bundle-Kacheln gestalten   | Kritisch  | Mittel              |
| 6.6  | Bundle-Kacheln mit Status-Indikatoren und Fortschrittsbalken    | Hoch      | Mittel              |
| 6.7  | Navigation und Routing verfeinern (Bundle-Liste → Task-Detail)  | Mittel    | Klein               |
| 6.8  | Responsives Layout für mobile Viewports sicherstellen           | Hoch      | Mittel              |
| 6.9  | Smoke-Tests und Build-Validierung                               | Kritisch  | Klein               |
| 6.10 | Dokumentation aktualisieren (`current-state.md`)                | Mittel    | Klein               |

---

## Task 6.1: `localStorage`-Persistenz für Zustand-Store implementieren

**Beschreibung:**
Der Fortschritt des Schülers (geschriebener Code, bestandene Aufgaben, Testergebnisse) darf beim versehentlichen Schließen des Tabs nicht verloren gehen.

**Aktionen:**

1. `npm install zustand` ist bereits installiert.
2. In `src/stores/appStore.ts` die `persist`-Middleware von `zustand/middleware` importieren.
3. Den Store mit `persist(..., { name: 'webtasks-storage' })` wrappen.
4. Eine `partialize`-Option konfigurieren, die nur folgende Slices speichert:
   - `codeSnippets`
   - `completedTasks`
   - `taskResults`
   - (Optional) `activeBundleId` und `activeTaskId` können ebenfalls persistiert werden, falls erwünscht.
5. Ausschließen: Keine internen Zustandsobjekte, die nicht serialisierbar sind.

**Akzeptanzkriterien:**

- [ ] `zustand/middleware` wird importiert und `persist` ist im Store aktiv.
- [ ] Nach Eingabe von Code in eine Aufgabe und Neuladen der Seite (`F5`) ist der Code im Editor wiederhergestellt.
- [ ] Nach Bestehen einer Aufgabe und Neuladen bleibt der Abschluss-Status erhalten.
- [ ] Der `localStorage`-Key `webtasks-storage` enthält einen serialisierten JSON-String mit den persistierten Slices.

---

## Task 6.2: Markdown-Renderer für Aufgabeninstruktionen integrieren

**Beschreibung:**
Die Aufgabenbeschreibungen im JSON sind als Markdown formatiert. Diese müssen sicher und visuell ansprechend gerendert werden.

**Aktionen:**

1. Eine schlanke Markdown-Bibliothek auswählen und installieren. Empfohlen wird `react-markdown` zusammen mit `remark-gfm` (für Tabellen und Listen).
   - `npm install react-markdown remark-gfm`
2. Eine Komponente `MarkdownRenderer` (z. B. in `src/components/MarkdownRenderer.tsx`) erstellen, die `ReactMarkdown` nutzt.
3. Tailwind-Klassen für Markdown-Elemente definieren (z. B. `prose`, `prose-sm`, `prose-blue`):
   - Überschriften (`h1`, `h2`, `h3`)
   - Paragraphen
   - Code-Inline (`<code>`) und Code-Blocks (`<pre><code>`)
   - Listen (ul/ol)
   - Links (`<a>` mit `target="_blank"` und `rel="noopener noreferrer"`)
4. Sicherheit: `react-markdown` verhindert standardmäßig das Rendering von raw HTML (nur Markdown-Syntax wird geparst), was XSS-Angriffe über Instruktionstexte verhindert.

**Akzeptanzkriterien:**

- [ ] `react-markdown` und `remark-gfm` sind installiert.
- [ ] Die `instruction`-Strings aus dem Canary-Bundle werden als formatierter Text in der UI angezeigt.
- [ ] Code-Inline-Elemente sind visuell hervorgehoben (z. B. grauer Hintergrund, Monospace-Schrift).
- [ ] `npm run build` bleibt nach der Integration fehlerfrei.

---

## Task 6.3: `TaskPage` auf das finale 3-Spalten-Split-Pane-Layout umstellen

**Beschreibung:**
Das Layout der TaskPage muss dem im `Konzept.md` definierten Triaden-Layout entsprechen: Links die Instruktion (30%), Mitte der Editor (40%), Rechts die Preview/Konsole (30%).

**Aktionen:**

1. `TaskPage.tsx` grundlegend restrukturieren:
   - Äußerer Container: `grid grid-cols-1 lg:grid-cols-[30%_40%_30%]`
   - **Linke Spalte:** `InstructionPanel` (siehe Task 6.4), primärer Button "Code prüfen", ggf. Navigation zu vorheriger/nächster Aufgabe.
   - **Mittlere Spalte:** `EditorPanel` (volle Höhe).
   - **Rechte Spalte:** Oben `PreviewFrame` (~65% Höhe), unten `SimulatedConsole` (~35% Höhe).
2. Sicherstellen, dass alle drei Spalten auf großen Monitoren gleichzeitig sichtbar sind (kein Scrollen zwischen Sektionen nötig).
3. Eine Mindesthöhe für das Layout definieren (z. B. `min-h-[calc(100vh-4rem)]`).

**Akzeptanzkriterien:**

- [ ] Auf Desktop-Bildschirmen sind Instruktion, Editor und Preview/Konsole nebeneinander angeordnet.
- [ ] Die Spaltenbreiten entsprechen in etwa 30% / 40% / 30%.
- [ ] Die rechte Spalte zeigt oben das Iframe und unten die Konsole.
- [ ] Alle Inhalte sind innerhalb des Viewports scrollbar, ohne dass das Gesamtlayout seine Struktur verliert.

---

## Task 6.4: `InstructionPanel`-Komponente erstellen

**Beschreibung:**
Die linke Spalte muss die Aufgabenstellung klar strukturiert und didaktisch ansprechend darstellen.

**Aktionen:**

1. Datei `src/components/InstructionPanel.tsx` anlegen.
2. Props:
   - `title: string`
   - `instruction: string`
   - `onValidate: () => void`
   - `validating: boolean`
   - `validationResult: ValidationResult | null`
3. Layout:
   - Titel oben (fett, groß).
   - Markdown-Instruktion in der Mitte (scrollbar, falls lang).
   - "Code prüfen"-Button am unteren Rand.
   - Direkt unter dem Button die Feedback-Boxen (Erfolg in grün, Fehler in rot).
4. Visuelle Trennung: Leichter Hintergrund (`bg-white` oder `bg-gray-50`), abgerundete Ecken, Schatten.

**Akzeptanzkriterien:**

- [ ] `InstructionPanel.tsx` ist vollständig typisiert und renderbar.
- [ ] Der Button ruft `onValidate` auf.
  - `validationResult` wird korrekt als Feedback-Boxen dargestellt.
- [ ] Lange Instruktionen sind scrollbar, ohne das Layout zu sprengen.

---

## Task 6.5: Startseite (`HomePage`) mit Hero und Bundle-Kacheln gestalten

**Beschreibung:**
Die Startseite ist der didaktische Einstiegspunkt. Sie muss motivierend und übersichtlich sein.

**Aktionen:**

1. `HomePage.tsx` erweitern:
   - **Hero-Sektion:** Große, freundliche Überschrift (z. B. "Willkommen bei WebTasks"), Untertitel, der das Ziel erklärt ("Lerne HTML, CSS und JavaScript Schritt für Schritt").
   - **Bundle-Grid:** Darunter ein Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) mit Kacheln für jedes Bundle.
2. Jedes Bundle wird als `BundleCard`-Komponente dargestellt.
3. `HomePage` lädt alle verfügbaren Bundles (aktuell nur das Canary-Bundle; später via `manifest.json` oder hartcodierte Liste).
4. Ein visueller Hinweis, dass die Kacheln anklickbar sind.

**Akzeptanzkriterien:**

- [ ] Die Startseite zeigt eine Hero-Sektion und darunter Bundle-Kacheln an.
- [ ] Die Kacheln sind optisch ansprechend (abgerundet, Schatten, Hover-Effekt).
- [ ] Ein Klick auf eine Kachel navigiert zu einer Task-Detailseite (vorerst zur ersten Task des Bundles).

---

## Task 6.6: Bundle-Kacheln mit Status-Indikatoren und Fortschrittsbalken

**Beschreibung:**
Die Kacheln müssen den aktuellen Lernfortschritt visualisieren, um den Zeigarnik-Effekt auszunutzen.

**Aktionen:**

1. `BundleCard`-Komponente erstellen (`src/components/BundleCard.tsx`).
2. Props:
   - `bundle: Bundle`
   - `completedTaskIds: string[]`
3. Berechnung des Fortschritts:
   - `const progress = Math.round((completedTasksInBundle / bundle.tasks.length) * 100);`
4. Status-Indikatoren:
   - **Gesperrt:** Graue Kachel, Schloss-Icon (für spätere Bundles, die erst freigeschaltet werden).
   - **In Bearbeitung:** Farbige Kachel mit Fortschrittsbalken (z. B. blau).
   - **Abgeschlossen:** Grüne Kachel mit Haken-Icon.
5. Für Phase 6 kann die "Gesperrt"-Logik vereinfacht werden (alle Bundles sind frei zugänglich, da nur ein Canary-Bundle existiert). Die Struktur muss aber bereits vorbereitet sein.
6. Ein Fortschrittsbalken innerhalb der Kachel rendern (`width: ${progress}%`).

**Akzeptanzkriterien:**

- [ ] `BundleCard.tsx` zeigt Titel, Beschreibung und Fortschrittsbalken an.
- [ ] Der Fortschritt wird korrekt aus `completedTasks` berechnet.
- [ ] Eine abgeschlossene Kachel (100%) hat einen visuellen Erfolgsindikator.
- [ ] Ein Klick auf die Kachel navigiert zum ersten noch nicht abgeschlossenen Task (oder zur ersten Task, falls alle offen).

---

## Task 6.7: Navigation und Routing verfeinern

**Beschreibung:**
Die Navigation zwischen Startseite und Aufgaben muss flüssig und intuitiv sein.

**Aktionen:**

1. In `TaskPage` Navigation-Links hinzufügen:
   - "Zurück zur Übersicht" (Link zu `/`).
   - "Vorherige Aufgabe" / "Nächste Aufgabe" (sofern vorhanden).
2. Sicherstellen, dass die URL-Parameter (`bundleId`, `taskId`) konsistent verwendet werden.
3. `App.tsx` prüfen: `Route` für `/` und `/task/:bundleId/:taskId` sind korrekt.
4. Optional: Ein einfacher Header oder Navbar, der den aktuellen Kontext anzeigt (z. B. "WebTasks > HTML & CSS Grundlagen > Dein erstes HTML-Element").

**Akzeptanzkriterien:**

- [ ] Ein Link "Zurück zur Übersicht" ist in der `TaskPage` sichtbar und funktional.
- [ ] (Optional) "Nächste Aufgabe" funktioniert und springt zur nächsten Task im Bundle.
- [ ] Das Routing zwischen Startseite und Task-Detailseite ist fehlerfrei.

---

## Task 6.8: Responsives Layout für mobile Viewports sicherstellen

**Beschreibung:**
Auch wenn der primäre Einsatz an Desktop-Rechnern erfolgt, muss die App auf Tablets und Smartphones nutzbar bleiben.

**Aktionen:**

1. **Startseite:** Das Bundle-Grid bricht bereits bei `md` auf 2 Spalten und bei `sm` auf 1 Spalte um.
2. **TaskPage:**
   - Auf `lg` und größer: 3-Spalten-Layout.
   - Auf `md` und kleiner: Vertikale Stapelung.
   - Optional: Tab-Navigation zwischen "Instruktion", "Editor" und "Vorschau" auf sehr kleinen Screens, um Überladung zu vermeiden.
3. Für Phase 6 ist eine einfache vertikale Stapelung auf kleinen Viewports ausreichend (Instruktion oben, Editor darunter, Preview/Konsole ganz unten).
4. Tailwind-Breakpoints (`sm`, `md`, `lg`, `xl`) gezielt einsetzen.

**Akzeptanzkriterien:**

- [ ] Auf Desktop (>1024px) ist das 3-Spalten-Layout aktiv.
- [ ] Auf Tablet/Mobile (<1024px) sind die Sektionen vertikal gestapelt.
- [ ] Keine horizontalen Überlappungen oder abgeschnittenen Inhalte auf kleinen Viewports.
- [ ] Der Editor bleibt auf Touch-Geräten bedienbar (CodeMirror 6 ist touch-freundlich).

---

## Task 6.9: Smoke-Tests und Build-Validierung

**Beschreibung:**
Die Phase wird mit einem umfassenden End-to-End-Test abgeschlossen.

**Aktionen:**

1. `npm run lint`, `npm run format`, `npm run build` ausführen.
2. Dev-Server starten und folgende Szenarien testen:
   - **A:** Startseite öffnet sich, zeigt Hero und Bundle-Kachel.
   - **B:** Klick auf Bundle-Kachel navigiert zur ersten Aufgabe.
   - **C:** 3-Spalten-Layout ist auf Desktop sichtbar (Instruktion links, Editor mitte, Preview rechts).
   - **D:** Code eingeben, Seite neu laden → Code ist noch da (`localStorage`-Persistenz).
   - **E:** Aufgabe lösen, Seite neu laden → Kachel zeigt Fortschritt/Abgeschlossen-Status.
   - **F:** Browserfenster verkleinern → Layout stapelt sich vertikal.
3. Alle Tests manuell verifizieren.

**Akzeptanzkriterien:**

- [ ] `npm run lint`, `npm run format` und `npm run build` sind fehlerfrei.
- [ ] Szenarien A bis F verhalten sich wie erwartet.
- [ ] Keine Laufzeitfehler in der Browser-Konsole.

---

## Task 6.10: Dokumentation aktualisieren

**Beschreibung:**
`state/current-state.md` muss den Abschluss von Phase 6 dokumentieren und den Übergang zu Phase 7 vorbereiten.

**Aktionen:**

1. In `state/current-state.md`:
   - Phase 6 auf ✅ setzen.
   - Phase 7 auf 🔄 setzen.
   - Abgeschlossene Meilensteine um "Phase 6 Implementierung" ergänzen.

**Akzeptanzkriterien:**

- [ ] `state/current-state.md` reflektiert korrekt, dass Phase 6 abgeschlossen ist.
- [ ] Phase 7 ist als neue aktive Phase markiert.

---

## Phase-6 Definition of Done (Zusammenfassung)

Die Phase 6 gilt als **vollständig abgeschlossen**, wenn folgende Bedingungen erfüllt sind:

1. ✅ Der Zustand-Store persistiert `codeSnippets`, `completedTasks` und `taskResults` in `localStorage`.
2. ✅ Ein Neuladen der Seite stellt Code und Fortschritt vollständig wieder her.
3. ✅ Aufgabeninstruktionen werden als Markdown gerendert (inkl. Code-Highlighting).
4. ✅ Die `TaskPage` verwendet das finale 3-Spalten-Layout (Instruktion | Editor | Preview/Konsole).
5. ✅ Die `HomePage` zeigt eine Hero-Sektion und interaktive Bundle-Kacheln mit Fortschrittsbalken.
6. ✅ Die Navigation zwischen Startseite und Aufgaben ist intuitiv und vollständig.
7. ✅ Das Layout ist responsive und bricht auf kleinen Viewports korrekt um.
8. ✅ `npm run lint`, `npm run format` und `npm run build` laufen fehlerfrei durch.
9. ✅ `state/current-state.md` dokumentiert den Abschluss von Phase 6.
