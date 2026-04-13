# Projekt-Status: E-Learning-Plattform für Programmier-Schnupperlehren

> **Zweck dieses Dokuments:** Dieses Dokument dient als "Single Source of Truth" für den aktuellen Projektstand. Es wird nach jeder abgeschlossenen Phase oder signifikanten Meilenstein aktualisiert, um bei Context-Verlust oder neuen Gesprächen sofort den Überblick zu gewährleisten.

---

## Projekt-Metadaten

| Attribut                  | Wert                                                          |
| :------------------------ | :------------------------------------------------------------ |
| **Projektname**           | Modulare E-Learning-Plattform für Programmier-Schnupperlehren |
| **Basisdokument**         | `Koncept.md`                                                  |
| **Grobplanung**           | `state/phases/00_phase-planning.md`                           |
| **Gesamtphasen**          | 9                                                             |
| **Letzte Aktualisierung** | 2026-04-13                                                    |

---

## Status-Übersicht

```
[✅] Phase 0: Konzeption & Grobplanung
[✅] Phase 1: Projekt-Setup & Tooling-Infrastruktur
[✅] Phase 2: Content-Architektur & JSON-Datenmodell
[✅] Phase 3: Editor-Kern & Code-Eingabe
[✅] Phase 4: Sandbox, Live-Preview & Sicherheit
[✅] Phase 5: Validierungs-Engine & Feedback-System
[✅] Phase 6: UI/UX, Navigation & State-Persistenz
[✅] Phase 7: Gamification & Motivationsdesign
[✅] Phase 8: Curriculum-Content & End-to-End-Integration
[✅] Phase 9: QA, Optimierung & Deployment
```

**Legende:**

- ✅ Abgeschlossen
- 🔄 In Bearbeitung / Geplant
- ⏳ Noch nicht begonnen

---

## Abgeschlossene Meilensteine

| Datum      | Meilenstein                           | Details                                                                                                                                                                                                                                                                                          |
| :--------- | :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-13 | Grobplanung finalisiert               | `00_phase-planning.md` erstellt und in `master` gemerged. Alle 9 Phasen sowie deren Abhängigkeiten definiert.                                                                                                                                                                                    |
| 2026-04-13 | Phase 1 Task-Planung abgeschlossen    | `01_phase-init.md` erstellt. Alle Tasks für das Projekt-Setup sind spezifiziert und priorisiert.                                                                                                                                                                                                 |
| 2026-04-13 | Phase 1 Implementierung abgeschlossen | Vite + React + TS Projekt lauffähig. Tailwind, ESLint, Prettier, Zustand, React Router integriert. Ordnerstruktur und Dokumentation stehen.                                                                                                                                                      |
| 2026-04-13 | Phase 2 Task-Planung abgeschlossen    | `02_phase-content.md` erstellt. Zod als Validator gewählt. Domain-Modell, Schemata, Loader-Service und Canary-Bundle detailliert spezifiziert.                                                                                                                                                   |
| 2026-04-13 | Phase 2 Implementierung abgeschlossen | Zod-Schemata für Bundle, Task und ValidationTest stehen. Content-Loader-Service lädt und validiert JSON. Canary-Bundle erfolgreich integriert und im Browser getestet.                                                                                                                           |
| 2026-04-13 | Phase 3 Task-Planung abgeschlossen    | `03_phase-editor.md` erstellt. CodeMirror-6-Integration, Editor-Tabs, Zustand-Synchronisation und Beginner-Defaults detailliert spezifiziert.                                                                                                                                                    |
| 2026-04-13 | Phase 3 Implementierung abgeschlossen | CodeMirror 6 integriert. `CodeEditor` und `EditorPanel` mit dynamischen Tabs stehen. Editor-Zustand wird über Zustand persistent gehalten. `TaskPage` lädt Aufgaben und rendert den Editor.                                                                                                      |
| 2026-04-13 | Phase 4 Task-Planung abgeschlossen    | `04_phase-sandbox.md` erstellt. Iframe-Sandbox, `srcdoc`, `postMessage`-Konsole, AST-basierte Loop-Protection (Acorn) und Sicherheits-Smoke-Tests detailliert spezifiziert.                                                                                                                      |
| 2026-04-13 | Phase 4 Implementierung abgeschlossen | Iframe-Sandbox mit `srcdoc` und `sandbox="allow-scripts"` integriert. Code-Assembler, `postMessage`-Konsole, simulierte Konsole und AST-basierte Loop-Protection (Acorn) stehen. `TaskPage` verbindet Editor, Live-Preview und Konsole. Build und Lint fehlerfrei.                               |
| 2026-04-13 | Phase 5 Task-Planung abgeschlossen    | `05_phase-validation.md` erstellt. DOM-Inspektion, Console-Test-Validator, Function-Test-Validator, Feedback-UI und "Code prüfen"-Button detailliert spezifiziert.                                                                                                                               |
| 2026-04-13 | Phase 5 Implementierung abgeschlossen | Validierungs-Engine mit DOM-, Console- und Function-Tests implementiert. "Code prüfen"-Button und Feedback-UI in `TaskPage` integriert. Store erweitert um `taskResults`. Build und Lint fehlerfrei.                                                                                             |
| 2026-04-13 | Phase 6 Task-Planung abgeschlossen    | `06_phase-ui.md` erstellt. `localStorage`-Persistenz, Markdown-Renderer, 3-Spalten-Layout, Startseite mit Bundle-Kacheln, Responsiveness und Navigation detailliert spezifiziert.                                                                                                                |
| 2026-04-13 | Phase 6 Implementierung abgeschlossen | Zustand persistiert in `localStorage`. `react-markdown` integriert. `TaskPage` nutzt 3-Spalten-Layout mit `InstructionPanel`. `HomePage` zeigt Hero und `BundleCard`s mit Fortschrittsbalken. Navigation mit Vorherige/Nächste Aufgabe. Responsives Layout umgesetzt. Build und Lint fehlerfrei. |
| 2026-04-13 | Phase 7 Task-Planung abgeschlossen    | `07_phase-gamification.md` erstellt. Konfetti-Animation, Badge-System, Bundle-Abschluss-Belohnungen und Zertifikatsseite detailliert spezifiziert.                                                                                                                                               |
| 2026-04-13 | Phase 7 Implementierung abgeschlossen | `canvas-confetti` integriert. Konfetti bei erfolgreicher Validierung und großes Konfetti bei Bundle-Abschluss. Badge-System mit `unlockedBadges` im Store. `BadgeDisplay` auf `HomePage`. Zertifikatsseite (`/certificate`) mit Druck-Optimierung. Build und Lint fehlerfrei.                    |
| 2026-04-13 | Phase 8 Task-Planung abgeschlossen    | `08_phase-curriculum.md` erstellt. Bundle 2 (JavaScript Grundlagen), Bundle 3 (Interaktive Web-Apps), dynamisches Bundle-Loading in `TaskPage` und End-to-End-Walkthrough detailliert spezifiziert.                                                                                              |
| 2026-04-13 | Phase 8 Implementierung abgeschlossen | Bundle 2 (4 JS-Tasks) und Bundle 3 (3 interaktive Tasks) als JSON erstellt. `HomePage` lädt alle 3 Bundles. `TaskPage` lädt Bundles dynamisch anhand `bundleId`. JSON-Struktur aller Bundles validiert. Build und Lint fehlerfrei.                                                               |
| 2026-04-13 | Phase 9 Implementierung abgeschlossen | GitHub Pages als Hosting festgelegt. Vite `base` und `manualChunks` konfiguriert. SPA-Routing via `404.html`-Trick implementiert. GitHub Actions Deployment-Workflow eingerichtet. `README.md`, `AGENTS.md` und Meta-Tags aktualisiert. Build, Lint und TypeScript fehlerfrei. |

---

## Aktive Phase: Phase 9 — QA, Optimierung & Deployment

**Ziel dieser Phase:** Die Plattform produktionsreif machen und öffentlich zugänglich deployen.

**Detaillierte Planung:** _Noch zu erstellen: `state/phases/09_phase-deployment.md`_

**Aktueller Stand in Phase 9:**

- [x] Hosting-Plattform evaluiert und festgelegt (GitHub Pages)
- [x] Build-Optimierung (Chunk-Warnung >500kB adressiert via `manualChunks`)
- [x] SPA-Routing für GitHub Pages implementiert (`404.html` + `main.tsx` restore)
- [x] GitHub Actions Deployment-Workflow eingerichtet
- [x] Finale Dokumentation aktualisiert (`README.md`, `AGENTS.md`, Meta-Tags)
- [x] Deployment-Pipeline auf `master` ausgeführt
- [x] Fix 01: React Router `basename` für GitHub Pages gesetzt (siehe `state/fixes/fix-01-router-basename.md`)
- [x] Fix 02: Bundle-Loader Pfade mit `import.meta.env.BASE_URL` korrigiert (siehe `state/fixes/fix-02-bundle-loader-base-path.md`)
- [x] Fix 03: Validierungs-Engine Timing korrigiert und Konsole bei Iframe-Reload geleert (siehe `state/fixes/fix-03-validation-console.md`)
- [x] Fix 04: DOM-Validierung nutzt eigenes Iframe statt Live-Preview (siehe `state/fixes/fix-04-dom-validation-iframe.md`)
- [x] Fix 05: DOM-Validierung via postMessage wegen Cross-Origin Sandbox (siehe `state/fixes/fix-05-dom-validation-cross-origin.md`)
- [ ] Live-URL nach Fix 05 erneut testen

**Blocker / Risiken:**

- Keine bekannten Blocker.

**Nächster geplanter Schritt nach Phase 9:**

- Projektabschluss und Übergabe.

---

## Offene Entscheidungen

| Thema               | Status         | Optionen / Hinweise                                                                                            |
| :------------------ | :------------- | :------------------------------------------------------------------------------------------------------------- |
| Styling-Library     | ✅ Entschieden | Tailwind CSS 3 (leichtgewichtig, schnell, konsistent mit modernem React-Ökosystem).                            |
| State-Management    | ✅ Entschieden | Zustand (minimaler Boilerplate, ausreichend für lokale SPA-State-Persistenz).                                  |
| Editor              | ✅ Entschieden | CodeMirror 6 via `@uiw/react-codemirror` (Phase 3).                                                            |
| JSON-Validator      | ✅ Entschieden | **Zod** (native TypeScript-Integration, bessere Fehlermeldungen, Single Source of Truth für Schema und Typen). |
| Editor-Theme        | ✅ Entschieden | One Dark als Dark-Theme-Default (Phase 3).                                                                     |
| Loop-Protection     | ✅ Entschieden | **Acorn + acorn-walk + astring** (leichtgewichtig, standardkonform, ca. 30 KB Parser).                         |
| Markdown-Renderer   | ✅ Entschieden | **react-markdown + remark-gfm** (etabliert, sicher, gut Tailwind-kompatibel).                                  |
| Konfetti-Bibliothek | ✅ Entschieden | **canvas-confetti** (leichtgewichtig, etabliert, einfache API).                                                |
| Hosting-Plattform   | ⏳ Offen       | Wird in Phase 9 evaluiert (Vercel, Netlify, GitHub Pages o. Ä.).                                               |

---

## Wichtige Dateien & Pfade

| Datei / Pfad                                      | Zweck                                            |
| :------------------------------------------------ | :----------------------------------------------- |
| `Konzept.md`                                      | Ursprüngliches Architektur- und Didaktik-Konzept |
| `state/phases/00_phase-planning.md`               | Grobplanung aller 9 Phasen                       |
| `state/phases/01_phase-init.md`                   | Detaillierte Task-Planung für Phase 1            |
| `state/phases/02_phase-content.md`                | Detaillierte Task-Planung für Phase 2            |
| `state/phases/03_phase-editor.md`                 | Detaillierte Task-Planung für Phase 3            |
| `state/phases/04_phase-sandbox.md`                | Detaillierte Task-Planung für Phase 4            |
| `state/phases/05_phase-validation.md`             | Detaillierte Task-Planung für Phase 5            |
| `state/phases/06_phase-ui.md`                     | Detaillierte Task-Planung für Phase 6            |
| `state/phases/07_phase-gamification.md`           | Detaillierte Task-Planung für Phase 7            |
| `state/phases/08_phase-curriculum.md`             | Detaillierte Task-Planung für Phase 8            |
| `state/current-state.md`                          | Dieses Dokument                                  |
| `src/components/HomePage.tsx`                     | Startseite mit Hero, Bundle-Kacheln und Badges   |
| `src/components/TaskPage.tsx`                     | Aufgabenansicht mit dynamischem Bundle-Loading   |
| `public/bundles/bundle-01-html-basics.json`       | Bundle 1: HTML/CSS Grundlagen (3 Tasks)          |
| `public/bundles/bundle-02-javascript-basics.json` | Bundle 2: JavaScript Grundlagen (4 Tasks)        |
| `public/bundles/bundle-03-interactive-web.json`   | Bundle 3: Interaktive Web-Apps (3 Tasks)         |
