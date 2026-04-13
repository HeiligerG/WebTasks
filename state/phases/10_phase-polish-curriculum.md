# Phase 10: UI-Polish, Dark Mode & Curriculum Scale

## Übersicht

Diese Phase poliert die WebTasks-Plattform visuell und inhaltlich auf ein professionelles Niveau. Sie gliedert sich in drei aufeinander aufbauende Sub-Phasen:

1. **Dark Mode**: Systemweiter Light/Dark-Toggle mit persistierter Präferenz
2. **UI/UX Polish**: Aufgeräumte Instruktionen, Callouts, Icons und konsistentes Design
3. **Curriculum Scale**: Erweiterung jedes Bundles auf 20 Tasks (60 Tasks total)

---

## Sub-Phase A: Dark Mode Implementation

**Status:** ✅ Abgeschlossen

**Implementierte Änderungen:**
- `tailwind.config.js`: `darkMode: 'class'` aktiviert
- `src/stores/appStore.ts`: `theme: 'light' | 'dark'` mit Persistenz und `toggleTheme()`
- `src/components/ThemeProvider.tsx`: Synchronisiert Theme mit `<html class="...">`
- `src/components/ThemeToggle.tsx`: Moon/Sun Toggle-Button mit `lucide-react`
- `src/components/CodeEditor.tsx`: Dynamisches CodeMirror-Theme (githubLight / oneDark)
- Alle UI-Komponenten erhalten `dark:`-Varianten für adaptives Styling

**Merge-Commit:** `20ab1ab`

---

## Sub-Phase B: UI/UX Polish

**Status:** ✅ Abgeschlossen

**Implementierte Änderungen:**
- `src/components/MarkdownRenderer.tsx`: Callout-Erkennung für `**Tipp:**`, `**Anforderungen:**`, `**Wichtig:**` mit farbigen Boxen und Icons
- `src/components/InstructionPanel.tsx`: Redesign mit `CheckCircle2`, `XCircle`, `Loader2`; kompakteres Feedback
- `src/components/HomePage.tsx`: Kompakterer Hero-Bereich
- `src/components/TaskPage.tsx**: "Zurück zur Übersicht"-Link im Header
- `src/features/editor/EditorPanel.tsx`: `RotateCcw`-Icon für Reset
- `src/components/BundleCard.tsx`: `ArrowRight`-Icon statt Text-Pfeil

**Merge-Commit:** `467fbf9`

---

## Sub-Phase C: Curriculum Scale (60 Tasks total)

**Status:** ⏳ In Planung

### Ziel
Jedes der drei Bundles wird von seinem aktuellen Stand (Bundle 1: 3 Tasks, Bundle 2: 4 Tasks, Bundle 3: 3 Tasks) auf **20 Tasks** erweitert. Die neuen Tasks folgen einer klaren Schwierigkeitsprogression und schließen jeweils mit einem Abschlussprojekt ab.

### Detaillierte Planung

Die vollständige, task-level Planung für alle 51 neuen Tasks befindet sich in den folgenden drei Dokumenten:

| Bundle | Datei | Umfang |
|:---|:---|:---|
| **Bundle 1: HTML & CSS Grundlagen** | `state/phases/10c_phase-curriculum-bundle1.md` | Tasks 04–20 (17 neue Tasks) |
| **Bundle 2: JavaScript Grundlagen** | `state/phases/10c_phase-curriculum-bundle2.md` | Tasks 05–20 (16 neue Tasks) |
| **Bundle 3: Interaktive Web-Apps** | `state/phases/10c_phase-curriculum-bundle3.md` | Tasks 04–20 (17 neue Tasks) |

### Implementierungs-Workflow

1. **Branch:** `feat/phase-10c-curriculum-scale`
2. **Implementierung pro Bundle:**
   - JSON-Datei des Bundles erweitern (bestehende Tasks beibehalten, neue anhängen)
   - Jede Task mit `id`, `title`, `instruction`, `initialCode`, `enabledEditors`, `validationTests`
   - `npm run build` nach jedem Bundle validieren
3. **QA:** Alle Tasks nacheinander in der Live-Preview testen
4. **Commit, Merge (`--no-ff`), Branch löschen**

### Qualitätskriterien

- Alle Tasks müssen durch die bestehende `ValidationEngine` validierbar sein
- Keine neuen Abhängigkeiten
- `npm run lint` und `npm run build` müssen fehlerfrei durchlaufen
- Die JSON-Bundles dürfen keine Syntaxfehler enthalten
