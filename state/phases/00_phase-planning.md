# Grobplanung: Modulare E-Learning-Plattform für Programmier-Schnupperlehren

> **Dokumentenzweck:** Diese Grobplanung definiert die logischen Projektphasen von der initialen Infrastruktur bis zur finalen Auslieferung. Sie dient als strategischer Rahmen, an dem sich alle nachfolgenden detaillierten Task-Planungen orientieren.  
> **Stand:** Phase-Planung (Tasks pro Phase werden separat geplant).  
> **Basis:** `Konzept.md`

---

## Übersicht der Phasen

| Phase | Name | Liefergegenstand | Abhängig von |
| :--- | :--- | :--- | :--- |
| **P1** | Projekt-Setup & Tooling-Infrastruktur | Lauffähige React + Vite + TypeScript Basis, Linting, Folder-Structure | — |
| **P2** | Content-Architektur & JSON-Datenmodell | Valides JSON-Schema, TypeScript-Typen, erste Beispiel-Bundles | P1 |
| **P3** | Editor-Kern & Code-Eingabe | Integrierter CodeMirror 6 Editor mit HTML/CSS/JS Tabs | P1 |
| **P4** | Sandbox, Live-Preview & Sicherheit | Isoliertes Iframe-Rendering mit `srcdoc`, `postMessage`-Konsole, Loop-Protection | P3 |
| **P5** | Validierungs-Engine & Feedback-System | DOM-Inspektions-Logik, JS-Test-Runner, menschenlesbare Fehlermeldungen | P2, P4 |
| **P6** | UI/UX, Navigation & State-Persistenz | Startseite, 3-Spalten-Layout, Routing, Fortschrittstracking, `localStorage` | P2, P4 |
| **P7** | Gamification & Motivationsdesign | Badge-System, Konfetti-Mikrointeraktionen, Zertifikats-Export | P6 |
| **P8** | Curriculum-Content & End-to-End-Integration | Vollständige Aufgaben der 3 Bundles, didaktische Durchgängigkeit | P5, P7 |
| **P9** | QA, Optimierung & Deployment | WCAG-Compliance, mobile Responsiveness, Build-Optimierung, Live-Deploy | P8 |

---

## Phase 1: Projekt-Setup & Tooling-Infrastruktur

**Ziel:** Eine stabile, wartbare und skalierbare Entwicklungsumgebung etablieren.

**Kernaktivitäten:**
- Initialisierung der Codebasis via Vite (React + TypeScript + SWC).
- Einrichtung von ESLint, Prettier und Husky für konsistente Code-Qualität.
- Definition der Ordnerstruktur (`src/components`, `src/lib`, `src/hooks`, `src/types`, `public/bundles` etc.).
- Installation der fundamentalen Runtime-Abhängigkeiten (React Router, Zustand, Tailwind CSS oder vergleichbares Styling-System).
- Einrichtung einer `README.md` mit Startanleitung und einer `AGENTS.md` mit projektspezifischen Konventionen.

**Definition of Done (DoD):**
- `npm run dev` startet die App fehlerfrei.
- Ein Baseline-Commit liegt auf `master`.
- Alle Teammitglieder (bzw. Agenten) können aus diesem Stand konsistent weiterarbeiten.

---

## Phase 2: Content-Architektur & JSON-Datenmodell

**Ziel:** Die "Headless"-Trennung von Applikationslogik und Lerninhalten technisch verankern.

**Kernaktivitäten:**
- Spezifikation eines strikten JSON-Schemas für Bundles und Tasks (inkl. `id`, `bundleId`, `title`, `instruction`, `initialCode`, `validationTests`).
- Generierung oder manuelle Erstellung passender TypeScript-Interfaces/Types aus dem Schema.
- Integration eines Validators (Ajv oder Zod) zur Laufzeit-Prüfung der Content-Dateien.
- Anlage der physischen Content-Struktur (z. B. `public/bundles/bundle-01.json`).
- Erstellung von mindestens einem "Canary"-Bundle als Referenzimplementierung für die nachfolgenden Phasen.

**Definition of Done (DoD):**
- Das Frontend kann JSON-Dateien laden und das Schema validiert sie erfolgreich.
- TypeScript kennt alle Content-Typen strikt.
- Eine fehlerhafte JSON-Datei wird zur Laufzeit abgelehnt und loggt ein verständliches Fehlerprotokoll.

---

## Phase 3: Editor-Kern & Code-Eingabe

**Ziel:** Den zentralen Arbeitsbereich für die Schüler – den Code-Editor – als wiederverwendbare React-Komponente realisieren.

**Kernaktivitäten:**
- Integration von CodeMirror 6 via `@uiw/react-codemirror`.
- Konfiguration der sprachspezifischen Extensions (`@codemirror/lang-html`, `@codemirror/lang-css`, `@codemirror/lang-javascript`).
- Implementierung eines Editor-Containers mit Tab-Switching (HTML / CSS / JS), sodass pro Aufgabe die benötigten Editoren sichtbar sind.
- Einbindung von Beginner-freundlichen Defaults: Auto-Closing Brackets, Line-Wrapping, ein attraktives Dark-Theme.
- Synchronisation des Editor-States mit dem globalen Zustandsmanagement (Zustand/Redux Toolkit).

**Definition of Done (DoD):**
- Der Nutzer kann in drei separaten Tabs Code eingeben.
- Syntax-Highlighting funktioniert für alle drei Sprachen.
- Der geschriebene Code wird im globalen State gehalten und überlebt ein Wechseln zwischen Aufgaben (im laufenden Tab).

---

## Phase 4: Sandbox, Live-Preview & Sicherheit

**Ziel:** Nutzergenerierten Code sicher, isoliert und in Echtzeit ausführen.

**Kernaktivitäten:**
- Implementierung eines `<iframe sandbox="allow-scripts">` mit dynamischem `srcdoc`.
- Entwicklung eines Compilers/Assemblers, der HTML-, CSS- und JS-Fragmente zu einem validen Dokument zusammenführt.
- Einbau eines Debounce-Mechanismus (ca. 500 ms), um unnötige Re-Renders zu vermeiden.
- Injektion eines unsichtbaren Interceptor-Skripts ins Iframe, das `console.log`, `console.error` und `window.onerror` via `postMessage` an die Host-App weiterleitet.
- Implementierung einer AST-basierten Infinite-Loop-Protection für `for`, `while` und `do-while`.
- Visualisierung der empfangenen Logs in einer simulierten Konsole.

**Definition of Done (DoD):**
- Code-Änderungen im Editor spiegeln sich nach kurzer Verzögerung im Iframe wider.
- `console.log` aus dem Iframe erscheint in der simulierten Konsole der Host-App.
- Eine `while(true)`-Schleife bricht nach definiertem Timeout ab und zeigt eine Fehlermeldung an.
- Das Iframe hat keinen Zugriff auf `window.parent` oder den `localStorage` der Host-Domain.

---

## Phase 5: Validierungs-Engine & Feedback-System

**Ziel:** Automatisierte, clientseitige Prüfung des Schüler-Codes mit didaktisch wertvollem Feedback.

**Kernaktivitäten:**
- Aufbau einer Validierungs-Engine, die beim Klick auf "Code prüfen" den Iframe-Inhalt analysiert.
- Implementierung von DOM-Selektions-Tests (`querySelector`) und `getComputedStyle`-Prüfungen für HTML/CSS-Aufgaben.
- Implementierung eines injizierten JS-Test-Runners für logische JavaScript-Aufgaben (Funktionsaufrufe mit verschiedenen Argumenten, Rückgabewert-Vergleich).
- Mapping von Fehlerzuständen zu menschenlesbaren, im JSON hinterlegten Feedback-Strings.
- Visuelles Ergebnis-Rendering ("Alle Tests bestanden" vs. "X von Y Tests fehlgeschlagen").

**Definition of Done (DoD):**
- Eine HTML/CSS-Aufgabe wird korrekt validiert, auch wenn der Schüler syntaktische Varianten (Leerzeichen, Anführungszeichen, Hex vs. RGB) verwendet.
- Eine JS-Aufgabe ruft die Schüler-Funktion mit Testdaten auf und vergleicht das Ergebnis.
- Bei Fehlschlag wird die spezifische, im JSON definierte Hilfestellung angezeigt.

---

## Phase 6: UI/UX, Navigation & State-Persistenz

**Ziel:** Die gesamte Benutzeroberfläche als kohärente, geführte und responsive Erfahrung gestalten.

**Kernaktivitäten:**
- Implementierung der Startseite mit Hero-Sektion und interaktiven Bundle-Kacheln (Cards) inkl. Status-Indikatoren.
- Aufbau des dreispaltigen Split-Pane-Layouts (Instruktion | Editor | Preview/Konsole) mit responsiver Fallback-Logik (Stacking auf mobilen Viewports).
- Integration eines Markdown-Renderers für die `instruction`-Inhalte aus dem JSON.
- Implementierung des Routings (Startseite ↔ Editor-Ansicht einer konkreten Aufgabe).
- Anbindung des Fortschritts-Trackings an `localStorage`, sodass abgeschlossene Aufgaben und geschriebener Code persistent bleiben.

**Definition of Done (DoD):**
- Die Navigation zwischen Startseite und einzelnen Aufgaben ist intuitiv und fehlerfrei.
- Das Layout skaliert von Desktop (3 Spalten) bis Mobile (gestapelte Ansicht).
- Ein Browser-Reload stellt den zuletzt geschriebenen Code und den Fortschritt korrekt wieder her.

---

## Phase 7: Gamification & Motivationsdesign

**Ziel:** Kurzfristige Belohnungsmechanismen implementieren, die die Verweildauer und Abschlussrate steigern.

**Kernaktivitäten:**
- Integration von Mikro-Interaktionen (z. B. `canvas-confetti`) beim Bestehen einer Aufgabe.
- Implementierung visueller Fortschrittsbalken pro Bundle.
- Entwicklung eines Badge-Systems mit visuellen Abzeichen für Meilensteine (Bundle-Abschlüsse).
- Implementierung einer Zertifikats- oder Abschlussseite, die am Ende des Schnuppertages als "Beweis der Leistung" dient (Druck- oder PDF-Export).

**Definition of Done (DoD):**
- Beim erfolgreichen Lösen einer Aufgabe erscheint eine positive Animation.
- Der Fortschritt innerhalb eines Bundles ist als Prozentzahl/Balken jederzeit sichtbar.
- Nach Abschluss aller Bundles kann der Schüler ein Zertifikat generieren.

---

## Phase 8: Curriculum-Content & End-to-End-Integration

**Ziel:** Die didaktische Substanz der Plattform vollständig einpflegen und den Gesamtfluss validieren.

**Kernaktivitäten:**
- Erstellung aller Aufgaben für **Bundle 1** (HTML/CSS Grundlagen) inkl. Master-Task "Profilkarte".
- Erstellung aller Aufgaben für **Bundle 2** (JavaScript Grundlagen) mit Fokus auf Konsole.
- Erstellung aller Aufgaben für **Bundle 3** (Interaktive Web-Apps) inkl. Master-Task "Color Flipper".
- Definition der `validationTests` für jede einzelne Aufgabe.
- Durchführung eines kompletten Walkthroughs: Ein fiktiver Schüler löst alle Aufgaben nacheinander, um Flaschenhälse oder unklare Formulierungen zu identifizieren.

**Definition of Done (DoD):**
- Alle drei Bundles enthalten ihre vollständige Aufgabenpalette als valide JSON-Dateien.
- Jede Aufgabe hat funktionierende `initialCode`-Scaffolding und `validationTests`.
- Der didaktische Pfad von "erstes HTML-Tag" bis "interaktive App" ist stimmig und durchgängig testbar.

---

## Phase 9: QA, Optimierung & Deployment

**Ziel:** Die Plattform produktionsreif machen und öffentlich zugänglich deployen.

**Kernaktivitäten:**
- Finalisierung des responsiven Designs (Mobile-Test auf verschiedenen Viewport-Größen).
- Überprüfung der WCAG-Kontrast- und Barrierefreiheits-Standards (Tastaturnavigation, ARIA-Labels).
- Performance-Optimierung (Bundle-Splitting, Lazy Loading von Content-Dateien).
- End-to-End-Testing der kritischen User Journeys (Aufgabe lösen, Fortschritt speichern, Zertifikat anzeigen).
- Konfiguration des Produktions-Builds (Vite `build`) und Deployment auf einer geeigneten Hosting-Plattform.

**Definition of Done (DoD):**
- Der Produktions-Build ist fehlerfrei und die Assets sind optimiert.
- Die App ist live erreichbar.
- Keine kritischen Bugs in den Core-Features (Editor, Sandbox, Validierung, Persistenz) bekannt.

---

## Phasen-Abhängigkeitsgraph

```
P1 (Setup)
│
├─→ P2 (JSON-Architektur) ─────┬─→ P5 (Validierung) ──┐
│                                │                      │
├─→ P3 (Editor) ────────────────→ P4 (Sandbox) ────────┤
│                                                       │
│                                                       ↓
│                                ┌─→ P6 (UI/UX) ───────┤
│                                │                     │
│                                └─→ P7 (Gamification) ─┘
│                                                       ↓
│                                             P8 (Content & Integration)
│                                                       ↓
│                                             P9 (QA & Deployment)
```

---

## Nächster Schritt

Die detaillierte Task-Planung für die jeweils aktive Phase wird in separaten Dokumenten (`01_phase-01-tasks.md`, `02_phase-02-tasks.md` etc.) erfasst, sobald diese Phase zur Bearbeitung ansteht.
