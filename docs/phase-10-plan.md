# Phase 10 Plan: UI-Polish, Dark Mode & Curriculum-Scale

## Ziel
Die WebTasks-Plattform wird visuell und inhaltlich auf das nächste Level gehoben:
1. **Professionelles Light/Dark-Theme** mit systemweitem Toggle
2. **GUI/UX-Polish** für bessere Lesbarkeit, klarere visuelle Hierarchie und aufgeräumte Instruktionen
3. **Curriculum-Scale** auf **20 Tasks pro Bundle** (60 Tasks total) mit klarer aufsteigender Schwierigkeit

---

## 1. Dark Mode Implementation

### 1.1 Technische Basis
- **`tailwind.config.js`**: `darkMode: 'class'` aktivieren
- **`src/stores/appStore.ts`**: `theme: 'light' | 'dark'` mit Persistenz in `localStorage`
- **`src/main.tsx` oder Root-Wrapper**: `<html class="dark">` bzw. `<html class="light">` je nach Zustand setzen
- **`src/components/ThemeToggle.tsx`**: Moon/Sun-Icon-Button für Header/HomePage

### 1.2 CodeMirror-Theme dynamisch
- `CodeEditor.tsx` erhält `theme` Prop (`'light' | 'dark'`)
- Dark: `@codemirror/theme-one-dark`
- Light: `@codemirror/theme-github` oder `@uiw/codemirror-theme-github`
- Installation des Light-Themes via npm

### 1.3 UI-Komponenten anpassen
Alle hartkodierten `bg-white`, `text-gray-800`, `border-gray-200` etc. müssen `dark:`-Varianten erhalten:
- `InstructionPanel`
- `TaskPage` (Header, Layout-Container)
- `HomePage` (Hero, BundleCards, Badges)
- `CertificatePage`
- `EditorPanel` (Tabs, Rahmen)
- `SimulatedConsole`
- `PreviewFrame` Umgebung

---

## 2. GUI/UX Polish

### 2.1 InstructionPanel & Markdown-Renderer
**Problem:** Tipps und Anforderungen sind nur fetter Text oder Plain-Markdown. Schüler übersehen wichtige Hinweise.

**Lösung:**
- Neue Markdown-Render-Styles für **Callouts**:
  - 💡 `**Tipp:** ...` → gelber Info-Box-Hintergrund
  - 📋 `**Anforderungen:**` + Liste → blauer Task-Box-Hintergrund
  - ⚠️ `**Wichtig:** ...` → oranger Warn-Box-Hintergrund
- Dies wird durch eine kleine Markdown-Post-Processing-Funktion erreicht, die die AST-ähnliche Struktur von `react-markdown` nutzt (Custom `li`, `strong`, `p` Renderer).
- Bessere Typografie: Größere Zeilenhöhe (`leading-relaxed`), klarere Code-Blocks

### 2.2 Layout-Vereinfachung
- **TaskPage**: Klarere visuelle Trennung der 3 Spalten (subtile Schatten, bessere Header-Leiste)
- **HomePage**: Hero-Bereich verkleinern, BundleCards kompakter gestalten
- **Validation Feedback**: Weniger "rote Wand" bei Fehlern – stattdessen kompakte, nummerierte Fehlerliste mit Icons

### 2.3 Konsistente Iconographie
- Einführung von **Lucide React** (leichtgewichtig, Tree-shakeable)
- Icons für: Check, X, Info, Moon, Sun, Trophy, ArrowRight, RotateCcw

---

## 3. Curriculum-Scale: 20 Tasks pro Bundle

### 3.1 Bundle 1: HTML & CSS Grundlagen (3 → 20 Tasks)
**Aufbau:** Einfache Tags → Attribute → Listen/Links → Tabellen → Forms → CSS-Selektoren → Box-Model → Flexbox → Grid → Responsive → Mini-Projekt

| # | Task-Titel | Typ | Schwierigkeit |
|:-|:---|:---|:---|
| 1 | Dein erstes HTML-Element | DOM (h1) | ⭐ |
| 2 | Bilder einbinden | DOM (img) | ⭐ |
| 3 | Deine Profilkarte | DOM (Klasse + border-radius) | ⭐⭐ |
| 4 | Links erstellen | DOM (a + href) | ⭐⭐ |
| 5 | Listen strukturieren | DOM (ul/li) | ⭐⭐ |
| 6 | Eine Tabelle bauen | DOM (table) | ⭐⭐ |
| 7 | Ein Formular erstellen | DOM (input + button) | ⭐⭐⭐ |
| 8 | Farben mit CSS ändern | DOM (color) | ⭐⭐ |
| 9 | Text ausrichten | DOM (text-align) | ⭐⭐ |
| 10 | Abstände verstehen | DOM (margin/padding) | ⭐⭐⭐ |
| 11 | Schriftarten ändern | DOM (font-family) | ⭐⭐ |
| 12 | Hover-Effekte | DOM (:hover) | ⭐⭐⭐ |
| 13 | Flexbox: Zentrieren | DOM (display:flex + justify-content) | ⭐⭐⭐ |
| 14 | Flexbox: Navigation | DOM (flex + gap) | ⭐⭐⭐ |
| 15 | CSS Grid Basics | DOM (display:grid) | ⭐⭐⭐⭐ |
| 16 | Grid: Galerie-Layout | DOM (grid-template-columns) | ⭐⭐⭐⭐ |
| 17 | Responsives Design | DOM (@media) | ⭐⭐⭐⭐ |
| 18 | Pseudo-Klassen | DOM (:nth-child) | ⭐⭐⭐⭐ |
| 19 | CSS-Variablen | DOM (var(--farbe)) | ⭐⭐⭐⭐ |
| 20 | Landing-Page Projekt | DOM (Kombination mehrerer Tests) | ⭐⭐⭐⭐⭐ |

### 3.2 Bundle 2: JavaScript Grundlagen (4 → 20 Tasks)
**Aufbau:** Variablen → Operatoren → Strings → if/else → switch → for/while → Arrays → Objekte → Methoden → DOM-Selektion → Events → Mini-Projekte

| # | Task-Titel | Typ | Schwierigkeit |
|:-|:---|:---|:---|
| 1 | Variablen erstellen | Console | ⭐ |
| 2 | Mit Zahlen rechnen | Console | ⭐ |
| 3 | Strings verbinden | Console | ⭐⭐ |
| 4 | Bedingungen prüfen | Function | ⭐⭐ |
| 5 | Vergleichsoperatoren | Console | ⭐⭐ |
| 6 | Logische Operatoren | Function | ⭐⭐ |
| 7 | switch-Statement | Function | ⭐⭐⭐ |
| 8 | for-Schleife | Console | ⭐⭐⭐ |
| 9 | while-Schleife | Console | ⭐⭐⭐ |
| 10 | Arrays durchlaufen | Function | ⭐⭐⭐ |
| 11 | Array-Methoden | Function (map/filter) | ⭐⭐⭐⭐ |
| 12 | Objekte erstellen | Console | ⭐⭐⭐ |
| 13 | Objekteigenschaften | Function | ⭐⭐⭐ |
| 14 | Eigene Funktionen | Function | ⭐⭐⭐ |
| 15 | Parameter und Rückgabe | Function | ⭐⭐⭐⭐ |
| 16 | DOM-Element finden | DOM (querySelector) | ⭐⭐⭐ |
| 17 | Auf Klicks reagieren | DOM (Event-Listener) | ⭐⭐⭐⭐ |
| 18 | Eingabewerte lesen | Function / DOM | ⭐⭐⭐⭐ |
| 19 | Zufallszahlen | Function | ⭐⭐⭐⭐ |
| 20 | Taschenrechner-Projekt | Function (mehrere Tests) | ⭐⭐⭐⭐⭐ |

### 3.3 Bundle 3: Interaktive Web-Applikationen (3 → 20 Tasks)
**Aufbau:** Event-Listener → DOM-Manipulation → Styling per JS → Formulare → Lokaler Speicher → API-Fetch → Async/Await → Mini-Apps

| # | Task-Titel | Typ | Schwierigkeit |
|:-|:---|:---|:---|
| 1 | Auf Klicks reagieren | DOM (click) | ⭐ |
| 2 | Text dynamisch ändern | DOM (textContent) | ⭐⭐ |
| 3 | Color Flipper | DOM (style.backgroundColor) | ⭐⭐ |
| 4 | Elemente ein-/ausblenden | DOM (classList.toggle) | ⭐⭐ |
| 5 | Dynamisch Elemente erstellen | DOM (createElement) | ⭐⭐⭐ |
| 6 | Zähler-App | DOM + Console | ⭐⭐⭐ |
| 7 | To-Do Liste (Hinzufügen) | DOM (appendChild) | ⭐⭐⭐ |
| 8 | To-Do Liste (Löschen) | DOM (removeChild) | ⭐⭐⭐ |
| 9 | Eingabe validieren | Function + DOM | ⭐⭐⭐ |
| 10 | Lokaler Speicher | DOM (localStorage via postMessage) | ⭐⭐⭐⭐ |
| 11 | Dark Mode Toggle | DOM (classList.toggle dark) | ⭐⭐⭐ |
| 12 | Modales Dialogfenster | DOM (show/hide) | ⭐⭐⭐⭐ |
| 13 | BMI-Rechner | Function + DOM Input | ⭐⭐⭐⭐ |
| 14 | Passwort-Generator | Function + DOM | ⭐⭐⭐⭐ |
| 15 | Fetch API Basics | Console (fetch mock) | ⭐⭐⭐⭐ |
| 16 | JSON-Daten anzeigen | DOM (JSON.parse) | ⭐⭐⭐⭐ |
| 17 | Wetter-App (Mock) | DOM + fetch | ⭐⭐⭐⭐⭐ |
| 18 | Countdown-Timer | DOM + setInterval | ⭐⭐⭐⭐⭐ |
| 19 | Quiz-App | DOM + Function | ⭐⭐⭐⭐⭐ |
| 20 | Portfolio-Seite | DOM (mehrere Tests) | ⭐⭐⭐⭐⭐ |

---

## 4. Implementierungs-Reihenfolge

1. **Sub-Phase A: Dark Mode** (`feat/phase-10-darkmode`)
2. **Sub-Phase B: UI Polish** (`feat/phase-10-ui-polish`)
3. **Sub-Phase C: Curriculum Scale** (`feat/phase-10-curriculum-scale`)

Jede Sub-Phase folgt dem bewährten Workflow:
- Branch → Implementierung → QA → Commit → Merge (`--no-ff`) → Branch löschen

## 5. Dokumentation

- `AGENTS.md` um Dark-Mode- und Bundle-Erstellungs-Konventionen erweitern
- `state/current-state.md` aktualisieren
- `README.md` um Task-Anzahl und Dark-Mode-Hinweis erweitern
