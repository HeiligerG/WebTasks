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

**Status:** ✅ Abgeschlossen

**Implementierte Änderungen:**
- `public/bundles/bundle-01-html-basics.json`: Erweitert auf 20 Tasks (Tasks 04–20 hinzugefügt)
- `public/bundles/bundle-02-javascript-basics.json`: Erweitert auf 20 Tasks (Tasks 05–20 hinzugefügt)
- `public/bundles/bundle-03-interactive-web.json`: Erweitert auf 20 Tasks (Tasks 04–20 hinzugefügt)
- `src/components/CertificatePage.tsx`: Lädt jetzt alle 3 Bundles statt nur Bundle 1
- Alle Tasks enthalten vollständige `instruction`, `initialCode`, `enabledEditors` und `validationTests`
- `npm run build` und JSON-Validierung erfolgreich durchgeführt

**Detaillierte Planung**

Die vollständige, task-level Planung für alle 51 neuen Tasks befindet sich in:

| Bundle | Datei | Umfang |
|:---|:---|:---|
| **Bundle 1: HTML & CSS Grundlagen** | `state/phases/10c_phase-curriculum-bundle1.md` | Tasks 04–20 (17 neue Tasks) |
| **Bundle 2: JavaScript Grundlagen** | `state/phases/10c_phase-curriculum-bundle2.md` | Tasks 05–20 (16 neue Tasks) |
| **Bundle 3: Interaktive Web-Apps** | `state/phases/10c_phase-curriculum-bundle3.md` | Tasks 04–20 (17 neue Tasks) |
