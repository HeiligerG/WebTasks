# Phase 10: UI-Polish, Dark Mode & Curriculum Scale

## Übersicht

Diese Phase poliert die WebTasks-Plattform visuell und inhaltlich auf ein professionelles Niveau. Sie gliedert sich in drei aufeinander aufbauende Sub-Phasen:

1. **Dark Mode**: Systemweiter Light/Dark-Toggle mit persistierter Präferenz
2. **UI/UX Polish**: Aufgeräumte Instruktionen, Callouts, Icons und konsistentes Design
3. **Curriculum Scale**: Erweiterung jedes Bundles auf 20 Tasks (60 Tasks total)

---

## Sub-Phase A: Dark Mode Implementation

### A.1 Tailwind Dark Mode aktivieren

**Datei:** `tailwind.config.js`

```js
module.exports = {
  darkMode: 'class',
  // ... restliche Konfiguration
};
```

### A.2 Theme-State im Store

**Datei:** `src/stores/appStore.ts`

- `theme: 'light' | 'dark'` zu `AppState` hinzufügen
- `toggleTheme()` und `setTheme(theme)` zu `AppActions` hinzufügen
- Persistenz sicherstellen (bereits via `partialize` gegeben)

**Logik:**
- Initialwert: `window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`
- Beim Toggle wird `<html>`-Element die Klasse `dark` bzw. `light` zugewiesen

### A.3 Theme-Provider oder useEffect in Root

**Datei:** `src/components/ThemeProvider.tsx` (neu) oder direkt in `src/App.tsx`

- `useEffect` beobachtet `theme` aus dem Store
- Entfernt `dark`/`light` von `<html>` und setzt die aktuelle Klasse

### A.4 ThemeToggle-Komponente

**Datei:** `src/components/ThemeToggle.tsx` (neu)

- Lucide-Icons `Sun` und `Moon` verwenden
- Rundes Icon-Button-Design
- Platzierung in `HomePage` Header und `TaskPage` Header

### A.5 CodeMirror dynamisches Theme

**Datei:** `src/components/CodeEditor.tsx`

- Neue Prop: `theme: 'light' | 'dark'`
- Dark: `oneDark` (bestehend)
- Light: `@uiw/codemirror-theme-github` installieren und importieren
- Extension-Array dynamisch basierend auf Prop zusammenbauen

### A.6 Komponenten für Dark Mode anpassen

Folgende Komponenten erhalten `dark:`-Varianten für alle relevanten Farben:

| Komponente | Anpassungen |
|:---|:---|
| `InstructionPanel` | `bg-white dark:bg-gray-900`, `border-gray-200 dark:border-gray-700`, `text-gray-800 dark:text-gray-100` |
| `TaskPage` | `bg-gray-50 dark:bg-gray-950`, Header `bg-white dark:bg-gray-900` |
| `HomePage` | Hero `bg-gray-50 dark:bg-gray-950`, Cards `bg-white dark:bg-gray-800` |
| `EditorPanel` | `bg-gray-900` bleibt dunkel (Editor ist immer dunkel → Ausnahme), Tabs `dark:bg-gray-800` |
| `SimulatedConsole` | `bg-gray-900 dark:bg-gray-950`, `border-gray-700 dark:border-gray-800` |
| `CertificatePage` | `bg-gray-50 dark:bg-gray-950`, Zertifikat `bg-white dark:bg-gray-800` |
| `MarkdownRenderer` | `prose` Klassen für Dark Mode anpassen (zusätzliche Wrapper-Klasse) |

---

## Sub-Phase B: UI/UX Polish

### B.1 Lucide React installieren

```bash
npm install lucide-react
```

### B.2 Markdown Callouts implementieren

**Datei:** `src/components/MarkdownRenderer.tsx`

Wir erweitern den Markdown-Renderer um eine einfache Callout-Erkennung:

- Wenn ein Paragraph mit `**Tipp:**` beginnt → gelbe Callout-Box
- Wenn ein Paragraph mit `**Anforderungen:**` beginnt → blaue Callout-Box
- Wenn ein Paragraph mit `**Wichtig:**` beginnt → orange Callout-Box

Implementierung über custom `p`-Renderer:

```tsx
function CalloutParagraph({ children }) {
  const text = extractText(children);
  if (text.startsWith('Tipp:')) return <div className="... tip-styles">{children}</div>;
  // ... usw.
}
```

### B.3 InstructionPanel-Redesign

**Datei:** `src/components/InstructionPanel.tsx`

- Weniger Padding, kompaktere Darstellung
- "Code prüfen"-Button behält grüne Farbe, aber mit Icon (`CheckCircle2`)
- Fehler-Boxen mit `XCircle`-Icon
- Erfolgs-Box mit `CheckCircle2`-Icon
- Trennlinie zwischen Markdown und Button-Bereich subtiler gestalten

### B.4 Validation-Feedback kompakter

**Datei:** `src/components/InstructionPanel.tsx`

- Statt `Test 1 fehlgeschlagen`, `Test 3 fehlgeschlagen` als einzelne Boxen:
  - Eine rote Box mit Aufzählung: "Folgende Tests sind noch nicht bestanden:" + nummerierte Liste
  - Oder beibehalten als einzelne Boxen, aber mit kompakterem Padding und Icons

**Entscheidung:** Einzelne Boxen beibehalten (besser für Screenreader), aber mit Icons und kompakterem Design.

### B.5 HomePage-Layout verfeinern

**Datei:** `src/components/HomePage.tsx`

- Hero-Bereich vertikal kompakter (weniger `py-10`, eher `py-6`)
- `BundleCard` mit subtilem Hover-Shadow und Fortschrittsbalken
- Badges in einer kompakten Zeile statt großem Block

### B.6 TaskPage-Layout verfeinern

**Datei:** `src/components/TaskPage.tsx`

- Header erhält ThemeToggle und "Zurück zur Übersicht"-Link
- Die 3 Spalten bekommen feinere visuelle Abgrenzung (leichte Schatten, abgerundete Ecken)
- Editor-Panel und Console-Panel harmonischer integriert

---

## Sub-Phase C: Curriculum Scale (60 Tasks total)

### C.1 JSON-Struktur

Alle neuen Tasks folgen dem bestehenden Schema:

```json
{
  "id": "html-basics-XX",
  "bundleId": "bundle-01-html-basics",
  "title": "...",
  "instruction": "...",
  "initialCode": { "html": "...", "css": "...", "js": "" },
  "enabledEditors": ["html"],
  "validationTests": [{ "type": "dom", "selector": "...", "feedbackFailure": "..." }]
}
```

### C.2 Bundle 1: HTML & CSS Grundlagen (20 Tasks)

**Neue Tasks 4–20:**

| # | ID | Titel | instruction (Kurzfassung) | initialCode | validationTests |
|:---|:---|:---|:---|:---|:---|
| 4 | html-basics-04 | Links erstellen | Erstelle einen Link zu `https://example.com` mit dem Text "Mehr erfahren". | `<p>Hier geht es weiter...</p>` | DOM: `a[href="https://example.com"]` |
| 5 | html-basics-05 | Listen strukturieren | Erstelle eine ungeordnete Liste mit 3 Hobbys. | `<p>Meine Hobbys:</p>` | DOM: `ul li` (mind. 3 `li`) |
| 6 | html-basics-06 | Eine Tabelle bauen | Erstelle eine Tabelle mit Kopfzeile (Name, Alter) und 2 Datenzeilen. | `<div>Tabellenplatz</div>` | DOM: `table`, `th`, `td` |
| 7 | html-basics-07 | Ein Formular erstellen | Erstelle ein Input-Feld für den Namen und einen Absende-Button. | `<div>Anmeldeformular</div>` | DOM: `input[type="text"]`, `button[type="submit"]` |
| 8 | html-basics-08 | Farben mit CSS ändern | Mache den Text in einem `<p>` rot (`color: red`). | `<p>Ich bin bunt</p>` | DOM: `p`, property `color`, expectedValue `red` |
| 9 | html-basics-09 | Text ausrichten | Zentriere eine Überschrift mit `text-align: center`. | `<h2>Willkommen</h2>` | DOM: `h2`, property `textAlign`, expectedValue `center` |
| 10 | html-basics-10 | Abstände verstehen | Füge einem div 20px Padding und 10px Margin hinzu. | `<div>Box</div>` | DOM: `div`, property `paddingTop`=`20px` & `marginTop`=`10px` |
| 11 | html-basics-11 | Schriftarten ändern | Setze die Schriftart eines Absatzes auf `Arial`. | `<p>Design ist wichtig</p>` | DOM: `p`, property `fontFamily`, expectedValue enthält `Arial` |
| 12 | html-basics-12 | Hover-Effekte | Erstelle einen Button, der bei Hover die Hintergrundfarbe auf blau ändert. | `<button>Klick mich</button>` | DOM: `button` + CSS `:hover` (via inline style oder class) |
| 13 | html-basics-13 | Flexbox: Zentrieren | Zentriere einen roten Kreis horizontal und vertikal mit Flexbox. | `<div class="container"><div class="kreis"></div></div>` | DOM: `.container`, property `display`=`flex`, `justifyContent`=`center`, `alignItems`=`center` |
| 14 | html-basics-14 | Flexbox: Navigation | Baue eine horizontale Navigation mit 3 Links und 20px Abstand. | `<nav>...</nav>` | DOM: `nav`, property `display`=`flex`, `gap`=`20px` |
| 15 | html-basics-15 | CSS Grid Basics | Erstelle ein 2×2 Grid mit 4 farbigen Kästchen. | `<div class="grid"></div>` | DOM: `.grid`, property `display`=`grid` |
| 16 | html-basics-16 | Grid: Galerie-Layout | Erstelle eine Bildergalerie mit 3 Spalten (`grid-template-columns: repeat(3, 1fr)`). | `<div class="galerie">...</div>` | DOM: `.galerie`, property `gridTemplateColumns` |
| 17 | html-basics-17 | Responsives Design | Verstecke ein Element auf Bildschirmen unter 600px (`display: none` in `@media`). | `<div class="desktop-only">...</div>` | DOM: `.desktop-only`, property `display`=`none` (im Mobile-Viewport simulieren via window.innerWidth im Validation-Iframe) |
| 18 | html-basics-18 | Pseudo-Klassen | Färbe jedes zweite Listenelement grau (`:nth-child(even)`). | `<ul>...</ul>` | DOM: `li:nth-child(even)`, property `backgroundColor` |
| 19 | html-basics-19 | CSS-Variablen | Definiere `--primary: blue` und wende sie auf einen Button an. | `<button>Primary</button>` | DOM: `button`, property `backgroundColor`=`blue` |
| 20 | html-basics-20 | Landing-Page Projekt | Erstelle eine vollständige Landing-Page mit Hero, Features und Footer. | Leer | Mehrere DOM-Tests: `header`, `.hero`, `.features`, `footer` |

### C.3 Bundle 2: JavaScript Grundlagen (20 Tasks)

**Neue Tasks 5–20:**

| # | ID | Titel | Typ | Beschreibung |
|:---|:---|:---|:---|:---|
| 5 | js-basics-05 | Vergleichsoperatoren | Console | Vergleiche 10 > 5 und 7 === "7" mit console.log |
| 6 | js-basics-06 | Logische Operatoren | Function | Schreibe `hatZugang(alt, eingeloggt)`, das true zurückgibt, wenn alt >= 18 UND eingeloggt |
| 7 | js-basics-07 | switch-Statement | Function | `wochentag(num)` gibt "Montag" für 1, "Sonntag" für 7 zurück |
| 8 | js-basics-08 | for-Schleife | Console | Gib Zahlen 1 bis 5 mit for-Schleife aus |
| 9 | js-basics-09 | while-Schleife | Console | Gib "Noch 3... Noch 2... Noch 1..." mit while aus |
| 10 | js-basics-10 | Arrays durchlaufen | Function | Bereits vorhanden (findeGerade) – bleibt erhalten |
| 11 | js-basics-11 | Array-Methoden | Function | `verdopple([1,2,3])` gibt `[2,4,6]` zurück (map) |
| 12 | js-basics-12 | Objekte erstellen | Console | Erstelle `buch = { titel: "Harry Potter", autor: "J.K. Rowling" }` und logge `buch.titel` |
| 13 | js-basics-13 | Objekteigenschaften | Function | `gibAutor(buch)` gibt den Autor zurück |
| 14 | js-basics-14 | Eigene Funktionen | Function | `begruesse("Max")` gibt "Hallo Max!" zurück |
| 15 | js-basics-15 | Parameter und Rückgabe | Function | `berechneFlaeche(breite, hoehe)` gibt Fläche zurück |
| 16 | js-basics-16 | DOM-Element finden | DOM | Färbe ein `<div id="box">` rot via JS (`document.getElementById`) |
| 17 | js-basics-17 | Auf Klicks reagieren | DOM | Bereits vorhanden – bleibt erhalten |
| 18 | js-basics-18 | Eingabewerte lesen | Function/DOM | Lies den Wert aus `<input id="name">` und zeige ihn in einem `<p>` an |
| 19 | js-basics-19 | Zufallszahlen | Function | `wuerfle()` gibt eine Zahl zwischen 1 und 6 zurück |
| 20 | js-basics-20 | Taschenrechner-Projekt | Function | `rechne(5, 3, "+")` gibt 8 zurück; Tests für +, -, *, / |

### C.4 Bundle 3: Interaktive Web-Applikationen (20 Tasks)

**Neue Tasks 4–20:**

| # | ID | Titel | Typ | Beschreibung |
|:---|:---|:---|:---|:---|
| 4 | interactive-04 | Elemente ein-/ausblenden | DOM | Klick auf Button blendet `<p id="text">` ein/aus |
| 5 | interactive-05 | Dynamisch Elemente erstellen | DOM | Klick auf Button erzeugt neues `<li>` in `<ul>` |
| 6 | interactive-06 | Zähler-App | DOM/Console | Klick erhöht Zahl in `<span id="counter">` um 1 |
| 7 | interactive-07 | To-Do Liste (Hinzufügen) | DOM | Input + Button fügt Task zu Liste hinzu |
| 8 | interactive-08 | To-Do Liste (Löschen) | DOM | Jeder Task hat Löschen-Button |
| 9 | interactive-09 | Eingabe validieren | Function+DOM | Prüfe, ob E-Mail ein `@` enthält, sonst Fehlermeldung |
| 10 | interactive-10 | Lokaler Speicher | DOM | Speichere Nutzername in `localStorage` (via postMessage im Validation-Iframe) |
| 11 | interactive-11 | Dark Mode Toggle | DOM | Button toggelt `dark`-Klasse auf `<body>` |
| 12 | interactive-12 | Modales Dialogfenster | DOM | Button öffnet/schließt `.modal` |
| 13 | interactive-13 | BMI-Rechner | Function+DOM | Berechne BMI aus Gewicht und Größe |
| 14 | interactive-14 | Passwort-Generator | Function+DOM | Generiere zufälliges 8-stelliges Passwort |
| 15 | interactive-15 | Fetch API Basics | Console | Mache einen `fetch` zu `https://jsonplaceholder.typicode.com/todos/1` und logge den title |
| 16 | interactive-16 | JSON-Daten anzeigen | DOM | Zeige `name` und `email` aus einem JSON-Objekt in `<p>`-Tags an |
| 17 | interactive-17 | Wetter-App (Mock) | DOM+fetch | Zeige Temperatur aus einem simulierten API-Response an |
| 18 | interactive-18 | Countdown-Timer | DOM+setInterval | Zeige countdown von 10 Sekunden an |
| 19 | interactive-19 | Quiz-App | DOM+Function | Zeige Frage, prüfe Antwort, zeige Ergebnis |
| 20 | interactive-20 | Portfolio-Seite | DOM | Mehrere DOM-Tests: Hero-Bild, About-Section, Kontaktformular |

---

## Qualitätskriterien

- Alle 60 Tasks müssen durch die bestehende `ValidationEngine` validierbar sein
- Keine neuen Abhängigkeiten außer `lucide-react` und ggf. einem Light-CodeMirror-Theme
- `npm run lint` und `npm run build` müssen nach jeder Sub-Phase fehlerfrei durchlaufen
- Die JSON-Bundles dürfen keine Syntaxfehler enthalten
