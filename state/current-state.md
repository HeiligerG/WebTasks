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
[🔄] Phase 1: Projekt-Setup & Tooling-Infrastruktur  ← AKTIV
[⏳] Phase 2: Content-Architektur & JSON-Datenmodell
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

---

## Aktive Phase: Phase 1 — Projekt-Setup & Tooling-Infrastruktur

**Ziel dieser Phase:** Eine stabile, wartbare und skalierbare Entwicklungsumgebung etablieren.

**Detaillierte Planung:** `state/phases/01_phase-init.md`

**Aktueller Stand in Phase 1:**
- [ ] Task 1.1: Vite-Projekt initialisieren (React + TypeScript + SWC)
- [ ] Task 1.2: TypeScript strikt konfigurieren
- [ ] Task 1.3: ESLint + Prettier einrichten
- [ ] Task 1.4: Tailwind CSS installieren und konfigurieren
- [ ] Task 1.5: Ordnerstruktur anlegen
- [ ] Task 1.6: Zustandsmanagement (Zustand) einrichten
- [ ] Task 1.7: React Router installieren und basis-konfigurieren
- [ ] Task 1.8: README.md und AGENTS.md erstellen
- [ ] Task 1.9: Smoke-Test und Initial-Commit durchführen

**Blocker / Risiken:**
- Keine bekannten Blocker.

**Nächster geplanter Schritt nach Phase 1:**
- Übergang zu Phase 2: Definition des JSON-Schemas und der TypeScript-Typen für Bundles & Tasks.

---

## Offene Entscheidungen

| Thema | Status | Optionen / Hinweise |
| :--- | :--- | :--- |
| Styling-Library | ✅ Entschieden | Tailwind CSS (leichtgewichtig, schnell, konsistent mit modernem React-Ökosystem). |
| State-Management | ✅ Entschieden | Zustand (minimaler Boilerplate, ausreichend für lokale SPA-State-Persistenz). |
| Editor | ✅ Entschieden | CodeMirror 6 (Phase 3). |
| Hosting-Plattform | ⏳ Offen | Wird in Phase 9 evaluiert (Vercel, Netlify, GitHub Pages o. Ä.). |

---

## Wichtige Dateien & Pfade

| Datei / Pfad | Zweck |
| :--- | :--- |
| `Konzept.md` | Ursprüngliches Architektur- und Didaktik-Konzept |
| `state/phases/00_phase-planning.md` | Grobplanung aller 9 Phasen |
| `state/phases/01_phase-init.md` | Detaillierte Task-Planung für Phase 1 |
| `state/current-state.md` | Dieses Dokument |
