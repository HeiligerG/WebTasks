# Projekt-Status: E-Learning-Plattform für Programmier-Schnupperlehren

> **Zweck dieses Dokuments:** Dieses Dokument dient als "Single Source of Truth" für den aktuellen Projektstand. Es wird nach jeder abgeschlossenen Phase oder signifikanten Meilenstein aktualisiert, um bei Context-Verlust oder neuen Gesprächen sofort den Überblick zu gewährleisten.

---

## Projekt-Metadaten

| Attribut | Wert |
| :--- | :--- |
| **Projektname** | Modulare E-Learning-Plattform für Programmier-Schnupperlehren |
| **Basisdokument** | `Koncept.md` |
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
[✅] Phase 6: UI/UX, Navigation & State-Persistenz
[🔄] Phase 7: Gamification & Motivationsdesign  ← AKTIV (Planung abgeschlossen, Implementierung steht aus)
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
| 2026-04-13 | Phase 6 Implementierung abgeschlossen | Zustand persistiert in `localStorage`. `react-markdown` integriert. `TaskPage` nutzt 3-Spalten-Layout mit `InstructionPanel`. `HomePage` zeigt Hero und `BundleCard`s mit Fortschrittsbalken. Navigation mit Vorherige/Nächste Aufgabe. Responsives Layout umgesetzt. Build und Lint fehlerfrei. |
| 2026-04-13 | Phase 7 Task-Planung abgeschlossen | `07_phase-gamification.md` erstellt. Konfetti-Animation, Badge-System, Bundle-Abschluss-Belohnungen und Zertifikatsseite detailliert spezifiziert. |

---

## Aktive Phase: Phase 7 — Gamification & Motivationsdesign

**Ziel dieser Phase:** Kurzfristige Belohnungsmechanismen implementieren, die die Verweildauer und Abschlussrate steigern.

**Detaillierte Planung:** `state/phases/07_phase-gamification.md`

**Aktueller Stand in Phase 7:**
- [ ] Task 7.1: `canvas-confetti` installieren und Basis-Trigger testen
- [ ] Task 7.2: Konfetti-Animation bei erfolgreicher Validierung integrieren
- [ ] Task 7.3: Badge-System im Zustand-Store modellieren
- [ ] Task 7.4: `BadgeDisplay`-Komponente erstellen
- [ ] Task 7.5: Bundle-Abschluss-Badges automatisch vergeben
- [ ] Task 7.6: Zertifikats-/Abschlussseite erstellen
- [ ] Task 7.7: Zertifikats-Druck- oder Export-Funktion vorbereiten
- [ ] Task 7.8: Smoke-Tests und Build-Validierung
- [ ] Task 7.9: Dokumentation aktualisieren

**Blocker / Risiken:**
- Keine bekannten Blocker.

**Nächster geplanter Schritt nach Phase 7:**
- Übergang zu Phase 8: Curriculum-Content & End-to-End-Integration (alle 3 Bundles vollständig befüllen).

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
| Konfetti-Bibliothek | ✅ Entschieden | **canvas-confetti** (leichtgewichtig, etabliert, einfache API). |
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
| `state/phases/07_phase-gamification.md` | Detaillierte Task-Planung für Phase 7 |
| `state/current-state.md` | Dieses Dokument |
| `src/components/HomePage.tsx` | Startseite mit Hero und Bundle-Kacheln |
| `src/components/BundleCard.tsx` | Bundle-Kachel mit Fortschrittsbalken |
| `src/components/TaskPage.tsx` | Aufgabenansicht im 3-Spalten-Layout |
| `src/components/InstructionPanel.tsx` | Linke Spalte mit Markdown-Instruktion |
| `src/components/MarkdownRenderer.tsx` | Markdown-Renderer für Aufgabenstellungen |
| `src/components/CodeEditor.tsx` | Wiederverwendbare CodeMirror-6-Komponente |
| `src/features/editor/EditorPanel.tsx` | Editor-Container mit dynamischen Tabs |
| `src/features/sandbox/PreviewFrame.tsx` | Isoliertes Iframe für Live-Preview |
| `src/components/SimulatedConsole.tsx` | Simulierte Konsole für Iframe-Logs |
| `src/lib/validationEngine.ts` | Validierungs-Engine für DOM-, Console- und Function-Tests |
| `src/lib/codeAssembler.ts` | Assembler für HTML/CSS/JS zu HTML5-Dokument |
| `src/lib/loopProtect.ts` | AST-basierte Infinite-Loop-Protection |
| `src/lib/contentLoader.ts` | Content-Loader-Service mit Zod-Validierung |
| `public/bundles/bundle-01-html-basics.json` | Canary-Bundle (HTML/CSS Grundlagen) |
| `src/stores/appStore.ts` | Globaler Zustand mit `localStorage`-Persistenz |
