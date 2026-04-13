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
[🔄] Phase 4: Sandbox, Live-Preview & Sicherheit  ← AKTIV (Planung abgeschlossen, Implementierung steht aus)
[⏳] Phase 5: Validierungs-Engine & Feedback-System
[⏳] Phase 6: UI/UX, Navigation & State-Persistenz
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

---

## Aktive Phase: Phase 4 — Sandbox, Live-Preview & Sicherheit

**Ziel dieser Phase:** Nutzergenerierten Code sicher, isoliert und in Echtzeit ausführen.

**Detaillierte Planung:** `state/phases/04_phase-sandbox.md`

**Aktueller Stand in Phase 4:**
- [ ] Task 4.1: `PreviewFrame`-Komponente mit `srcdoc` und `sandbox` erstellen
- [ ] Task 4.2: Code-Assembler/Compiler implementieren
- [ ] Task 4.3: Debounce-Hook für Live-Preview erstellen
- [ ] Task 4.4: `postMessage`-Interceptor und `SimulatedConsole` implementieren
- [ ] Task 4.5: AST-basierte Loop-Protection implementieren
- [ ] Task 4.6: Sandbox in `TaskPage` integrieren
- [ ] Task 4.7: Sicherheits- und Funktions-Smoke-Tests durchführen
- [ ] Task 4.8: Dokumentation aktualisieren

**Blocker / Risiken:**
- Keine bekannten Blocker.

**Nächster geplanter Schritt nach Phase 4:**
- Übergang zu Phase 5: Validierungs-Engine mit DOM-Inspektion und JS-Test-Runner.

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
| `state/current-state.md` | Dieses Dokument |
| `src/components/CodeEditor.tsx` | Wiederverwendbare CodeMirror-6-Komponente |
| `src/features/editor/EditorPanel.tsx` | Editor-Container mit dynamischen Tabs |
| `src/components/TaskPage.tsx` | Aufgabenansicht mit Editor-Panel |
| `src/types/content.ts` | Zod-Schemata und abgeleitete TypeScript-Typen für Content |
| `src/lib/contentLoader.ts` | Content-Loader-Service mit Zod-Validierung |
| `public/bundles/bundle-01-html-basics.json` | Canary-Bundle (HTML/CSS Grundlagen) |
| `src/stores/appStore.ts` | Globaler Zustand (Zustand) |
