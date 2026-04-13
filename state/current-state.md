# Projekt-Status: E-Learning-Plattform für Programmier-Schnupperlehren

> **Zweck dieses Dokuments:** Dieses Dokument dient als "Single Source of Truth" für den aktuellen Projektstand. Es wird nach jeder abgeschlossenen Phase oder signifikanten Meilenstein aktualisiert, um bei Context-Verlust oder neuen Gesprächen sofort den Überblick zu gewährleisten.

---

## Projekt-Metadaten

| Attribut | Wert |
| :--- | :--- |
| **Projektname** | Modulare E-Learning-Plattform für Programmier-Schnupperlehren |
| **Basisdokument** | `Konzept.md` |
| **Grobplanung** | `state/phases/00_phase-planning.md` |
| **Gesamtphasen** | 9 |
| **Letzte Aktualisierung** | 2026-04-13 |

---

## Status-Übersicht

```
[✅] Phase 0: Konzeption & Grobplanung
[✅] Phase 1: Projekt-Setup & Tooling-Infrastruktur
[✅] Phase 2: Content-Architektur & JSON-Datenmodell
[✅] Phase 3: Editor-Kern & Code-Eingabe
[✅] Phase 4: Sandbox, Live-Preview & Sicherheit
[✅] Phase 5: Validierungs-Engine & Feedback-System
[🔄] Phase 6: UI/UX, Navigation & State-Persistenz  ← AKTIV (Planung abgeschlossen, Implementierung steht aus)
[⏳] Phase 7: Gamification & Motivationsdesign
[⏳] Phase 8: Curriculum-Content & End-to-End-Integration
[⏳] Phase 9: QA, Optimierung & Deployment
```

**Legende:**
- ✅ Abgeschlossen
- 🔄 In Bearbeitung / Geplant
- ⏳ Noch nicht begonnen

---

## Abgeschlossene Meilensteine

| Datum | Meilenstein | Details |
| :--- | :--- | :--- |
| 2026-04-13 | Grobplanung finalisiert | `00_phase-planning.md` erstellt und in `master` gemerged. Alle 9 Phasen sowie deren Abhängigkeiten definiert. |
| 2026-04-13 | Phase 1 Task-Planung abgeschlossen | `01_phase-init.md` erstellt. Alle Tasks für das Projekt-Setup sind spezifiziert und priorisiert. |
| 2026-04-13 | Phase 1 Implementierung abgeschlossen | Vite + React + TS Projekt lauffähig. Tailwind, ESLint, Prettier, Zustand, React Router integriert. Ordnerstruktur und Dokumentation stehen. |
| 2026-04-13 | Phase 2 Task-Planung abgeschlossen | `02_phase-content.md` erstellt. Zod als Validator gewählt. Domain-Modell, Schemata, Loader-Service und Canary-Bundle detailliert spezifiziert. |
| 2026-04-13 | Phase 2 Implementierung abgeschlossen | Zod-Schemata für Bundle, Task und ValidationTest stehen. Content-Loader-Service lädt und validiert JSON. Canary-Bundle erfolgreich integriert und im Browser getestet. |
| 2026-04-13 | Phase 3 Task-Planung abgeschlossen | `03_phase-editor.md` erstellt. CodeMirror-6-Integration, Editor-Tabs, Zustand-Synchronisation und Beginner-Defaults detailliert spezifiziert. |
| 2026-04-13 | Phase 3 Implementierung abgeschlossen | CodeMirror 6 integriert. `CodeEditor` und `EditorPanel` mit dynamischen Tabs stehen. Editor-Zustand wird über Zustand persistent gehalten. `TaskPage` lädt Aufgaben und rendert den Editor. |
| 2026-04-13 | Phase 4 Task-Planung abgeschlossen | `04_phase-sandbox.md` erstellt. Iframe-Sandbox, `srcdoc`, `postMessage`-Konsole, AST-basierte Loop-Protection (Acorn) und Sicherheits-Smoke-Tests detailliert spezifiziert. |
| 2026-04-13 | Phase 4 Implementierung abgeschlossen | Iframe-Sandbox mit `srcdoc` und `sandbox="allow-scripts"` integriert. Code-Assembler, `postMessage`-Konsole, simulierte Konsole und AST-basierte Loop-Protection (Acorn) stehen. `TaskPage` verbindet Editor, Live-Preview und Konsole. Build und Lint fehlerfrei. |
| 2026-04-13 | Phase 5 Task-Planung abgeschlossen | `05_phase-validation.md` erstellt. DOM-Inspektion, Console-Test-Validator, Function-Test-Validator, Feedback-UI und "Code prüfen"-Button detailliert spezifiziert. |
| 2026-04-13 | Phase 5 Implementierung abgeschlossen | Validierungs-Engine mit DOM-, Console- und Function-Tests implementiert. "Code prüfen"-Button und Feedback-UI in `TaskPage` integriert. Store erweitert um `taskResults`. Build und Lint fehlerfrei. |
| 2026-04-13 | Phase 6 Task-Planung abgeschlossen | `06_phase-ui.md` erstellt. `localStorage`-Persistenz, Markdown-Renderer, 3-Spalten-Layout, Startseite mit Bundle-Kacheln, Responsiveness und Navigation detailliert spezifiziert. |

---

## Aktive Phase: Phase 6 — UI/UX, Navigation & State-Persistenz

**Ziel dieser Phase:** Die gesamte Benutzeroberfläche als kohärente, geführte und responsive Erfahrung gestalten.

**Detaillierte Planung:** `state/phases/06_phase-ui.md`

**Aktueller Stand in Phase 6:**
- [ ] Task 6.1: `localStorage`-Persistenz für Zustand-Store implementieren
- [ ] Task 6.2: Markdown-Renderer für Aufgabeninstruktionen integrieren
- [ ] Task 6.3: `TaskPage` auf das finale 3-Spalten-Split-Pane-Layout umstellen
- [ ] Task 6.4: `InstructionPanel`-Komponente erstellen
- [ ] Task 6.5: Startseite (`HomePage`) mit Hero und Bundle-Kacheln gestalten
- [ ] Task 6.6: Bundle-Kacheln mit Status-Indikatoren und Fortschrittsbalken
- [ ] Task 6.7: Navigation und Routing verfeinern
- [ ] Task 6.8: Responsives Layout für mobile Viewports sicherstellen
- [ ] Task 6.9: Smoke-Tests und Build-Validierung
- [ ] Task 6.10: Dokumentation aktualisieren

**Blocker / Risiken:**
- Keine bekannten Blocker.

**Nächster geplanter Schritt nach Phase 6:**
- Übergang zu Phase 7: Gamification (Badges, Konfetti, Fortschrittsbalken, Zertifikat).

---

## Offene Entscheidungen

| Thema | Status | Optionen / Hinweise |
| :--- | :--- | :--- |
| Styling-Library | ✅ Entschieden | Tailwind CSS 3 (leichtgewichtig, schnell, konsistent mit modernem React-Ökosystem). |
| State-Management | ✅ Entschieden | Zustand (minimaler Boilerplate, ausreichend für lokale SPA-State-Persistenz). |
| Editor | ✅ Entschieden | CodeMirror 6 via `@uiw/react-codemirror` (Phase 3). |
| JSON-Validator | ✅ Entschieden | **Zod** (native TypeScript-Integration, bessere Fehlermeldungen, Single Source of Truth für Schema und Typen). |
| Editor-Theme | ✅ Entschieden | One Dark als Dark-Theme-Default (Phase 3). |
| Loop-Protection | ✅ Entschieden | **Acorn + acorn-walk + astring** (leichtgewichtig, standardkonform, ca. 30 KB Parser). |
| Markdown-Renderer | ✅ Entschieden | **react-markdown + remark-gfm** (etabliert, sicher, gut Tailwind-kompatibel). |
| Hosting-Plattform | ⏳ Offen | Wird in Phase 9 evaluiert (Vercel, Netlify, GitHub Pages o. Ä.). |

---

## Wichtige Dateien & Pfade

| Datei / Pfad | Zweck |
| :--- | :--- |
| `Konzept.md` | Ursprüngliches Architektur- und Didaktik-Konzept |
| `state/phases/00_phase-planning.md` | Grobplanung aller 9 Phasen |
| `state/phases/01_phase-init.md` | Detaillierte Task-Planung für Phase 1 |
| `state/phases/02_phase-content.md` | Detaillierte Task-Planung für Phase 2 |
| `state/phases/03_phase-editor.md` | Detaillierte Task-Planung für Phase 3 |
| `state/phases/04_phase-sandbox.md` | Detaillierte Task-Planung für Phase 4 |
| `state/phases/05_phase-validation.md` | Detaillierte Task-Planung für Phase 5 |
| `state/phases/06_phase-ui.md` | Detaillierte Task-Planung für Phase 6 |
| `state/current-state.md` | Dieses Dokument |
| `src/components/CodeEditor.tsx` | Wiederverwendbare CodeMirror-6-Komponente |
| `src/features/editor/EditorPanel.tsx` | Editor-Container mit dynamischen Tabs |
| `src/features/sandbox/PreviewFrame.tsx` | Isoliertes Iframe für Live-Preview |
| `src/components/SimulatedConsole.tsx` | Simulierte Konsole für Iframe-Logs |
| `src/components/TaskPage.tsx` | Aufgabenansicht mit Editor, Sandbox, Konsole und Validierung |
| `src/lib/validationEngine.ts` | Validierungs-Engine für DOM-, Console- und Function-Tests |
| `src/lib/codeAssembler.ts` | Assembler für HTML/CSS/JS zu HTML5-Dokument |
| `src/lib/loopProtect.ts` | AST-basierte Infinite-Loop-Protection |
| `src/lib/contentLoader.ts` | Content-Loader-Service mit Zod-Validierung |
| `public/bundles/bundle-01-html-basics.json` | Canary-Bundle (HTML/CSS Grundlagen) |
| `src/stores/appStore.ts` | Globaler Zustand (Zustand) |
