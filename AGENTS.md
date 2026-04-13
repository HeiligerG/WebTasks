# AGENTS.md — WebTasks Platform

Diese Datei enthält projektspezifische Konventionen und Hinweise für alle Entwickler und KI-Agenten, die an diesem Projekt arbeiten.

---

## Git-Workflow

### Branching-Strategie

- **Nie direkt auf `master` committen.**
- Für jede inhaltliche Änderung wird ein dedizierter Feature-Branch erstellt:
  - `feat/<kurzbeschreibung>` für neue Features oder Implementierungen
  - `docs/<kurzbeschreibung>` für Dokumentation oder Planung
  - `fix/<kurzbeschreibung>` für Bugfixes
- Nach Fertigstellung wird der Branch via `--no-ff` in `master` gemerged, um einen sauberen, lesbaren Git-Graphen zu erhalten.
- Der Branch wird unmittelbar nach dem Merge gelöscht.

### Beispiel

```bash
git checkout -b feat/phase-01-setup
# ... Arbeiten und committen ...
git checkout master
git merge --no-ff feat/phase-01-setup -m "Merge branch 'feat/phase-01-setup' into master"
git branch -d feat/phase-01-setup
```

### Commit-Konventionen

Wir verwenden **Conventional Commits**:

- `feat:` — Neue Funktionalität
- `fix:` — Bugfix
- `docs:` — Dokumentation
- `refactor:` — Code-Refactoring ohne Funktionsänderung
- `chore:` — Wartung, Tooling-Updates
- `style:` — Reine Formatierungsänderungen

---

## Code-Qualität

- **TypeScript:** `strict: true` ist Pflicht. Jeder Code muss typisiert sein.
- **ESLint:** Vor jedem Commit `npm run lint` ausführen. Keine Warnungen im produktiven Code.
- **Prettier:** Vor jedem Commit `npm run format` ausführen.
- **Build:** `npm run build` muss nach jeder signifikanten Änderung fehlerfrei durchlaufen.

---

## Ordnerstruktur

| Pfad                     | Zweck                                                     |
| :----------------------- | :-------------------------------------------------------- |
| `src/components/`        | Wiederverwendbare React-Komponenten                       |
| `src/components/ui/`     | Primitive UI-Komponenten (Button, Card, etc.)             |
| `src/features/`          | Domain-spezifische Features (editor, sandbox, validation) |
| `src/hooks/`             | Custom React Hooks                                        |
| `src/lib/`               | Hilfsfunktionen und Utilities                             |
| `src/stores/`            | Zustand-Stores                                            |
| `src/types/`             | Globale TypeScript-Interfaces und -Typen                  |
| `public/bundles/`        | JSON-Dateien für Lerninhalte (Bundles & Tasks)            |
| `state/phases/`          | Projektplanung und Task-Definitionen                      |
| `state/current-state.md` | Aktueller Projektstatus (immer aktuell halten!)           |

---

## Wichtige Hinweise

- **`state/current-state.md` ist die Single Source of Truth für den Projektfortschritt.** Nach Abschluss einer Phase oder eines signifikanten Meilensteins muss diese Datei aktualisiert werden.
- Alle Aufgabeninhalte (Bundles, Tasks, Validierungsregeln) werden über JSON-Dateien in `public/bundles/` gesteuert. Sie dürfen nicht im React-Code hartkodiert werden.
- Der Nutzer-Code wird in einem isolierten `<iframe sandbox="allow-scripts">` mit `srcdoc` ausgeführt. Sicherheitsaspekte (Sandboxing, Loop-Protection) haben höchste Priorität.
