# WebTasks Platform

Eine modulare, browserbasierte E-Learning-Plattform für Programmier-Schnupperlehren. Die Plattform ermöglicht Jugendlichen im Alter von 12–15 Jahren einen reibungslosen Einstieg in HTML, CSS und JavaScript – ohne lokale Installationen, mit sofortigem visuellem Feedback und gamifizierten Lerneinheiten.

## Tech-Stack

- **Framework:** [React](https://react.dev/) 19
- **Build-Tool:** [Vite](https://vitejs.dev/)
- **Sprache:** TypeScript (strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 3
- **State-Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Routing:** [React Router](https://reactrouter.com/)
- **Code-Editor:** CodeMirror 6 (Phase 3)

## Schnellstart

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erzeugen
npm run build

# Code linten
npm run lint

# Code formatieren
npm run format
```

## Architektur

Die detaillierte Architektur- und Didaktik-Konzeption befindet sich in [`Konzept.md`](./Konzept.md).

Die Projektplanung ist in `state/phases/` strukturiert:

- `state/phases/00_phase-planning.md` — Grobplanung aller 9 Phasen
- `state/phases/01_phase-init.md` — Detaillierte Task-Planung Phase 1
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
