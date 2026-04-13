# WebTasks Platform

Eine modulare, browserbasierte E-Learning-Plattform für Programmier-Schnupperlehren. Die Plattform ermöglicht Jugendlichen im Alter von 12–15 Jahren einen reibungslosen Einstieg in HTML, CSS und JavaScript – ohne lokale Installationen, mit sofortigem visuellem Feedback und gamifizierten Lerneinheiten.

## 🚀 Live-Demo

Die aktuelle Version ist auf **GitHub Pages** deployed:

➡️ **[https://heiligerg.github.io/WebTasks/](https://heiligerg.github.io/WebTasks/)**

## Tech-Stack

- **Framework:** [React](https://react.dev/) 19
- **Build-Tool:** [Vite](https://vitejs.dev/) 8
- **Sprache:** TypeScript (strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 3
- **State-Management:** [Zustand](https://github.com/pmndrs/zustand) (mit `persist` Middleware)
- **Routing:** [React Router](https://reactrouter.com/)
- **Code-Editor:** CodeMirror 6 via `@uiw/react-codemirror`
- **Validierung:** Zod (JSON-Schema) + Custom DOM/Console/Function Tests
- **Sicherheit:** Iframe-Sandboxing + AST-basierte Loop-Protection (Acorn)

## Schnellstart

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erzeugen
npm run build

# Produktions-Build lokal testen
npm run preview

# Code linten
npm run lint

# Code formatieren
npm run format
```

## Architektur

Die Plattform ist als reine Single-Page-Application (SPA) konzipiert:

- **JSON-First Content:** Alle Lerninhalte (Bundles, Tasks, Validierungsregeln) werden dynamisch aus `public/bundles/` geladen. Neue Inhalte erfordern keinen React-Rebuild.
- **Isolierte Code-Ausführung:** Schüler-Code läuft ausschließlich in einem `sandbox="allow-scripts"`-Iframe mit `srcdoc` – nie im Host-DOM.
- **Automatisches Deployment:** Bei jedem Push auf `master` wird die Anwendung automatisch via GitHub Actions auf GitHub Pages deployed.

Die detaillierte Architektur- und Didaktik-Konzeption befindet sich in [`Konzept.md`](./Konzept.md).

Die Projektplanung ist in `state/phases/` strukturiert:

- `state/phases/00_phase-planning.md` — Grobplanung aller 9 Phasen
- `state/current-state.md` — Aktueller Projektstatus

## Ordnerstruktur

```
src/
  components/       # Wiederverwendbare React-Komponenten
  components/ui/    # Primitive UI-Elemente (Button, Card, etc.)
  features/         # Domain-spezifische Features
  hooks/            # Custom React Hooks
  lib/              # Hilfsfunktionen und Utilities
  stores/           # Zustand-Stores
  types/            # Globale TypeScript-Typen
public/
  bundles/          # JSON-Content-Dateien für Aufgaben und Bundles
```
