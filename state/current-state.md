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
[🔄] Phase 2: Content-Architektur & JSON-Datenmodell  ← AKTIV
[⏳] Phase 3: Editor-Kern & Code-Eingabe
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

| Datum | Meilenstein | Details |
| :--- | :--- | :--- |
| 2026-04-13 | Grobplanung finalisiert | `00_phase-planning.md` erstellt und in `master` gemerged. Alle 9 Phasen sowie deren Abhängigkeiten definiert. |
| 2026-04-13 | Phase 1 Task-Planung abgeschlossen | `01_phase-init.md` erstellt. Alle Tasks für das Projekt-Setup sind spezifiziert und priorisiert. |
| 2026-04-13 | Phase 1 Implementierung abgeschlossen | Vite + React + TS Projekt lauffähig. Tailwind, ESLint, Prettier, Zustand, React Router integriert. Ordnerstruktur und Dokumentation stehen. |

---

## Aktive Phase: Phase 2 — Content-Architektur & JSON-Datenmodell

**Ziel dieser Phase:** Die "Headless"-Trennung von Applikationslogik und Lerninhalten technisch verankern.

**Detaillierte Planung:** *Noch zu erstellen: `state/phases/02_phase-content.md`*

**Aktueller Stand in Phase 2:**
- [ ] JSON-Schema für Bundles und Tasks definieren
- [ ] TypeScript-Interfaces aus dem Schema ableiten
- [ ] Validator (Ajv oder Zod) integrieren
- [ ] Content-Ordnerstruktur in `public/bundles/` anlegen
- [ ] Erstes Canary-Bundle als Referenz erstellen

**Blocker / Risiken:**
- Keine bekannten Blocker.

**Nächster geplanter Schritt nach Phase 2:**
- Übergang zu Phase 3: Integration von CodeMirror 6 als Editor-Kern.

---

## Offene Entscheidungen

| Thema | Status | Optionen / Hinweise |
| :--- | :--- | :--- |
| Styling-Library | ✅ Entschieden | Tailwind CSS 3 (leichtgewichtig, schnell, konsistent mit modernem React-Ökosystem). |
| State-Management | ✅ Entschieden | Zustand (minimaler Boilerplate, ausreichend für lokale SPA-State-Persistenz). |
| Editor | ✅ Entschieden | CodeMirror 6 (Phase 3). |
| JSON-Validator | ⏳ Offen | Ajv vs. Zod — wird zu Beginn von Phase 2 evaluiert. |
| Hosting-Plattform | ⏳ Offen | Wird in Phase 9 evaluiert (Vercel, Netlify, GitHub Pages o. Ä.). |

---

## Wichtige Dateien & Pfade

| Datei / Pfad | Zweck |
| :--- | :--- |
| `Konzept.md` | Ursprüngliches Architektur- und Didaktik-Konzept |
| `state/phases/00_phase-planning.md` | Grobplanung aller 9 Phasen |
| `state/phases/01_phase-init.md` | Detaillierte Task-Planung für Phase 1 |
| `state/current-state.md` | Dieses Dokument |
| `src/stores/appStore.ts` | Globaler Zustand (Zustand) |
| `src/components/HomePage.tsx` | Platzhalter-Startseite |
| `src/components/TaskPage.tsx` | Platzhalter-Editor-Ansicht |
| `public/bundles/` | Zukünftiger Speicherort für JSON-Lerninhalte |
