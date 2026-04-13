# Projekt-Status: E-Learning-Plattform für Programmier-Schnupperlehren

> **Zweck dieses Dokuments:** Dieses Dokument dient als "Single Source of Truth" für den aktuellen Projektstand. Es wird nach jeder abgeschlossenen Phase oder signifikanten Meilenstein aktualisiert, um bei Context-Verlust oder neuen Gesprächen sofort den Überblick zu gewährleisten.

---

## Projekt-Metadaten

| Attribut                  | Wert                                                          |
| :------------------------ | :------------------------------------------------------------ |
| **Projektname**           | Modulare E-Learning-Plattform für Programmier-Schnupperlehren |
| **Basisdokument**         | `Konzept.md`                                                  |
| **Grobplanung**           | `state/phases/00_phase-planning.md`                           |
| **Gesamtphasen**          | 9                                                             |
| **Letzte Aktualisierung** | 2026-04-13                                                    |

---

## Status-Übersicht

```
[✅] Phase 0: Konzeption & Grobplanung
[✅] Phase 1: Projekt-Setup & Tooling-Infrastruktur
[✅] Phase 2: Content-Architektur & JSON-Datenmodell
[🔄] Phase 3: Editor-Kern & Code-Eingabe  ← AKTIV
[⏳] Phase 4: Sandbox, Live-Preview & Sicherheit
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

| Datum      | Meilenstein                           | Details                                                                                                                                                                |
| :--------- | :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-04-13 | Grobplanung finalisiert               | `00_phase-planning.md` erstellt und in `master` gemerged. Alle 9 Phasen sowie deren Abhängigkeiten definiert.                                                          |
| 2026-04-13 | Phase 1 Task-Planung abgeschlossen    | `01_phase-init.md` erstellt. Alle Tasks für das Projekt-Setup sind spezifiziert und priorisiert.                                                                       |
| 2026-04-13 | Phase 1 Implementierung abgeschlossen | Vite + React + TS Projekt lauffähig. Tailwind, ESLint, Prettier, Zustand, React Router integriert. Ordnerstruktur und Dokumentation stehen.                            |
| 2026-04-13 | Phase 2 Task-Planung abgeschlossen    | `02_phase-content.md` erstellt. Zod als Validator gewählt. Domain-Modell, Schemata, Loader-Service und Canary-Bundle detailliert spezifiziert.                         |
| 2026-04-13 | Phase 2 Implementierung abgeschlossen | Zod-Schemata für Bundle, Task und ValidationTest stehen. Content-Loader-Service lädt und validiert JSON. Canary-Bundle erfolgreich integriert und im Browser getestet. |

---

## Aktive Phase: Phase 3 — Editor-Kern & Code-Eingabe

**Ziel dieser Phase:** Den zentralen Arbeitsbereich für die Schüler – den Code-Editor – als wiederverwendbare React-Komponente realisieren.

**Detaillierte Planung:** _Noch zu erstellen: `state/phases/03_phase-editor.md`_

**Aktueller Stand in Phase 3:**

- [ ] Zod-Entscheidung für Editor-Integration dokumentieren (CodeMirror 6 via `@uiw/react-codemirror`)
- [ ] CodeMirror 6 installieren (`@uiw/react-codemirror`, `@codemirror/lang-html`, `@codemirror/lang-css`, `@codemirror/lang-javascript`)
- [ ] Basis-Editor-Komponente erstellen (`CodeEditor.tsx`)
- [ ] Editor-Container mit Tabs (HTML/CSS/JS) implementieren
- [ ] Editor-State mit Zustand-Store synchronisieren
- [ ] Beginner-freundliche Defaults aktivieren (Auto-Closing Brackets, Line-Wrapping, Dark Theme)

**Blocker / Risiken:**

- Keine bekannten Blocker.

**Nächster geplanter Schritt nach Phase 3:**

- Übergang zu Phase 4: Sandbox mit Iframe, `srcdoc` und `postMessage`-Kommunikation.

---

## Offene Entscheidungen

| Thema             | Status         | Optionen / Hinweise                                                                                            |
| :---------------- | :------------- | :------------------------------------------------------------------------------------------------------------- |
| Styling-Library   | ✅ Entschieden | Tailwind CSS 3 (leichtgewichtig, schnell, konsistent mit modernem React-Ökosystem).                            |
| State-Management  | ✅ Entschieden | Zustand (minimaler Boilerplate, ausreichend für lokale SPA-State-Persistenz).                                  |
| Editor            | ✅ Entschieden | CodeMirror 6 (Phase 3).                                                                                        |
| JSON-Validator    | ✅ Entschieden | **Zod** (native TypeScript-Integration, bessere Fehlermeldungen, Single Source of Truth für Schema und Typen). |
| Hosting-Plattform | ⏳ Offen       | Wird in Phase 9 evaluiert (Vercel, Netlify, GitHub Pages o. Ä.).                                               |

---

## Wichtige Dateien & Pfade

| Datei / Pfad                                | Zweck                                                     |
| :------------------------------------------ | :-------------------------------------------------------- |
| `Konzept.md`                                | Ursprüngliches Architektur- und Didaktik-Konzept          |
| `state/phases/00_phase-planning.md`         | Grobplanung aller 9 Phasen                                |
| `state/phases/01_phase-init.md`             | Detaillierte Task-Planung für Phase 1                     |
| `state/phases/02_phase-content.md`          | Detaillierte Task-Planung für Phase 2                     |
| `state/current-state.md`                    | Dieses Dokument                                           |
| `src/types/content.ts`                      | Zod-Schemata und abgeleitete TypeScript-Typen für Content |
| `src/lib/contentLoader.ts`                  | Content-Loader-Service mit Zod-Validierung                |
| `public/bundles/bundle-01-html-basics.json` | Canary-Bundle (HTML/CSS Grundlagen)                       |
| `src/stores/appStore.ts`                    | Globaler Zustand (Zustand)                                |
| `src/components/HomePage.tsx`               | Startseite mit Canary-Bundle-Integrationstest             |
| `src/components/TaskPage.tsx`               | Platzhalter-Editor-Ansicht                                |
