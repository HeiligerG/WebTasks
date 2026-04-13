# Phase 1: Projekt-Setup & Tooling-Infrastruktur — Detaillierte Task-Planung

> **Dokumentenzweck:** Dieses Dokument enthält die vollständige Aufschlüsselung aller Tasks für Phase 1. Jeder Task ist eigenständig abgrenzbar, priorisiert und mit konkreten Akzeptanzkriterien versehen.  
> **Phase-DoD:** `npm run dev` startet die App fehlerfrei, die Ordnerstruktur ist etabliert, alle Tooling-Konfigurationen sind committed und der `master`-Branch repräsentiert einen sauberen Baseline-Stand.

---

## Task-Übersicht

| ID | Task-Name | Priorität | Geschätzter Aufwand |
| :--- | :--- | :--- | :--- |
| 1.1 | Vite-Projekt initialisieren | Kritisch | Klein |
| 1.2 | TypeScript strikt konfigurieren | Kritisch | Klein |
| 1.3 | ESLint + Prettier einrichten | Hoch | Klein |
| 1.4 | Tailwind CSS installieren und konfigurieren | Hoch | Klein |
| 1.5 | Ordnerstruktur anlegen | Kritisch | Klein |
| 1.6 | Zustandsmanagement (Zustand) einrichten | Hoch | Klein |
| 1.7 | React Router installieren und basis-konfigurieren | Hoch | Klein |
| 1.8 | README.md und AGENTS.md erstellen | Mittel | Klein |
| 1.9 | Smoke-Test und Initial-Commit durchführen | Kritisch | Klein |

---

## Task 1.1: Vite-Projekt initialisieren

**Beschreibung:**
Die Codebasis wird als moderne Single Page Application (SPA) mit Vite aufgesetzt. Ziel ist ein schlankes, schnelles Entwicklungs- und Build-Erlebnis.

**Aktionen:**
1. Im Projekt-Root (`/home/developer/workspace/WebTasks`) Vite initialisieren: `npm create vite@latest . -- --template react-swc-ts` (oder vergleichbar).
2. Alle generierten Vite-Dateien (`.gitignore`, `index.html`, `vite.config.ts`) auf Vollständigkeit prüfen.
3. `npm install` ausführen, um die Basispakete zu laden.
4. Die `index.html` anpassen: aussagekräftiger `<title>` und Meta-Viewport.
5. Die default `App.tsx` und `App.css` bereinigen (Vite-Willkommens-Content entfernen), sodass eine minimale "Hello WebTasks"-Ausgabe erscheint.

**Akzeptanzkriterien:**
- [ ] `npm run dev` startet einen lokalen Dev-Server ohne Fehler.
- [ ] Die App zeigt im Browser eine minimale React-Komponente an (z. B. `<h1>WebTasks Platform</h1>`).
- [ ] `vite.config.ts` existiert und ist unverändert funktional.
- [ ] Keine unversionierten Dateien außerhalb von `node_modules`.

---

## Task 1.2: TypeScript strikt konfigurieren

**Beschreibung:**
TypeScript muss von Beginn an strikt konfiguriert sein, um Laufzeitfehler frühzeitig zu vermeiden und die Codequalität zu sichern.

**Aktionen:**
1. `tsconfig.json` öffnen und folgende Flags explizit setzen (falls nicht bereits default):
   - `"strict": true`
   - `"noUnusedLocals": true`
   - `"noUnusedParameters": true`
   - `"noImplicitReturns": true`
   - `"noFallthroughCasesInSwitch": true`
2. Sicherstellen, dass `tsconfig.app.json` und `tsconfig.node.json` (falls von Vite generiert) konsistent sind.
3. Einmalig `npm run build` ausführen, um zu verifizieren, dass die strikte Konfiguration keine Fehler in der initialen Codebasis wirft.

**Akzeptanzkriterien:**
- [ ] `tsconfig.json` enthält `"strict": true` und die oben genannten Flags.
- [ ] `npm run build` schließt erfolgreich ab (Type-Check ohne Fehler).
- [ ] `tsc --noEmit` (sofern anwendbar) läuft fehlerfrei durch.

---

## Task 1.3: ESLint + Prettier einrichten

**Beschreibung:**
Automatisierte Code-Qualität und konsistente Formatierung sind essenziell für ein wartbares Projekt, insbesondere bei agentenbasierter Entwicklung.

**Aktionen:**
1. ESLint konfigurieren (Vite liefert oft eine Basis-Config; diese erweitern):
   - `eslint-plugin-react-hooks` und `eslint-plugin-react-refresh` hinzufügen.
   - TypeScript-Parser und -Plugin sicherstellen.
2. Prettier installieren und konfigurieren:
   - `.prettierrc` mit `semi: true`, `singleQuote: true`, `trailingComma: "es5"`, `printWidth: 100`.
   - `.prettierignore` mit `node_modules`, `dist`, `build`.
3. Ein `lint`-Script in `package.json` hinzufügen: `"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"`.
4. Ein `format`-Script in `package.json` hinzufügen: `"format": "prettier --write ."`.
5. Optional: Husky + lint-staged einrichten, um Pre-Commit-Hooks zu gewährleisten.

**Akzeptanzkriterien:**
- [ ] `npm run lint` läuft durch die gesamte Codebasis ohne Fehler.
- [ ] `npm run format` formatiert alle relevanten Dateien konsistent.
- [ ] ESLint meldet keine Warnungen in `src/App.tsx` oder `src/main.tsx`.

---

## Task 1.4: Tailwind CSS installieren und konfigurieren

**Beschreibung:**
Tailwind CSS wird als primäres Styling-Tool verwendet, um schnell responsive und konsistente UIs zu bauen.

**Aktionen:**
1. Tailwind CSS installieren: `npm install -D tailwindcss postcss autoprefixer`.
2. `npx tailwindcss init -p` ausführen.
3. `tailwind.config.js` erweitern:
   - `content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]`
4. Eine globale CSS-Datei (z. B. `src/index.css`) anlegen oder ergänzen mit:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
5. Die globale CSS-Datei in `src/main.tsx` importieren.
6. In `App.tsx` ein minimales Tailwind-Klassen-Beispiel einbauen (z. B. `className="text-2xl font-bold text-blue-600"`), um die Funktionalität visuell zu verifizieren.

**Akzeptanzkriterien:**
- [ ] `tailwind.config.js` (oder `.ts`) existiert und ist korrekt konfiguriert.
- [ ] Der Dev-Server zeigt die Tailwind-stilisierte Komponente korrekt an.
- [ ] `npm run build` produziert keinen Fehler bezüglich PostCSS/Tailwind.

---

## Task 1.5: Ordnerstruktur anlegen

**Beschreibung:**
Eine klare, semantische Ordnerstruktur reduziert kognitive Komplexität und skaliert mit dem Projekt.

**Aktionen:**
1. Folgende Verzeichnisse unter `src/` anlegen:
   - `src/components/` — Wiederverwendbare React-Komponenten
   - `src/components/ui/` — Primitive UI-Komponenten (Button, Card, etc.)
   - `src/features/` — Domain-spezifische Features (z. B. `editor/`, `sandbox/`, `validation/`)
   - `src/hooks/` — Custom React Hooks
   - `src/lib/` — Hilfsfunktionen und Utility-Dateien
   - `src/stores/` — Zustand-Stores
   - `src/types/` — Globale TypeScript-Typen und Interfaces
   - `src/assets/` — Statische Assets (Bilder, Fonts)
2. Folgende Verzeichnisse unter `public/` anlegen:
   - `public/bundles/` — Hier werden später die JSON-Content-Dateien liegen
3. Eine leere `.gitkeep` in leeren Verzeichnissen platzieren, falls nötig, damit Git sie trackt.

**Akzeptanzkriterien:**
- [ ] Alle oben genannten Verzeichnisse existieren physisch im Repository.
- [ ] Keine `.gitkeep`-Dateien sind notwendig, wenn mindestens eine sinnvolle Datei (z. B. `index.ts`) pro Ordner existiert.
- [ ] Die Struktur ist konsistent mit der geplanten Feature-Architektur.

---

## Task 1.6: Zustandsmanagement (Zustand) einrichten

**Beschreibung:**
Der globale Applikationszustand (aktive Aufgabe, geschriebener Code, Fortschritt) wird mit Zustand verwaltet. Dieser Task legt die technische Grundlage.

**Aktionen:**
1. `npm install zustand` ausführen.
2. Einen Basis-Store unter `src/stores/appStore.ts` anlegen.
3. Der Store soll folgende minimale State-Slices definieren (als Interface/Typ):
   - `activeBundleId: string | null`
   - `activeTaskId: string | null`
   - `codeSnippets: Record<string, { html: string; css: string; js: string }>`
   - `completedTasks: string[]`
4. Grundlegende Setter-Methoden bereitstellen:
   - `setActiveTask(bundleId, taskId)`
   - `setCode(taskId, language, code)`
   - `markTaskCompleted(taskId)`
5. Optional: Zustand `persist`-Middleware vorbereiten (nicht vollständig implementieren, aber konfigurierbar halten für Phase 6).

**Akzeptanzkriterien:**
- [ ] `zustand` ist in `package.json` gelistet.
- [ ] Der `appStore.ts` kompiliert ohne TypeScript-Fehler.
- [ ] Ein einfacher Test in `App.tsx` (z. B. Button, der einen Zustand verändert) demonstriert die Funktionalität.

---

## Task 1.7: React Router installieren und basis-konfigurieren

**Beschreibung:**
Die Navigation zwischen Startseite und Editor-Ansicht wird durch React Router realisiert.

**Aktionen:**
1. `npm install react-router-dom` ausführen.
2. In `src/main.tsx` den `<BrowserRouter>` um die `<App />`-Komponente wrappen.
3. In `src/App.tsx` ein minimales Routing-Setup mit `Routes` und `Route` erstellen:
   - `/` → Platzhalter-Komponente `HomePage` (z. B. "Startseite kommt in Phase 6")
   - `/task/:bundleId/:taskId` → Platzhalter-Komponente `TaskPage` (z. B. "Editor-Ansicht kommt in Phase 3/4")
4. Zwei minimalistische Dummy-Komponenten (`HomePage.tsx`, `TaskPage.tsx`) in `src/components/` anlegen.
5. Sicherstellen, dass direkte Links (z. B. `/task/bundle-1/html-01`) die korrekte Route anzeigen.

**Akzeptanzkriterien:**
- [ ] `react-router-dom` ist installiert.
- [ ] Navigation zu `/` zeigt `HomePage`.
- [ ] Navigation zu `/task/bundle-1/task-1` zeigt `TaskPage` mit lesbaren Parametern.
- [ ] Keine Routing-Fehler in der Browser-Konsole.

---

## Task 1.8: README.md und AGENTS.md erstellen

**Beschreibung:**
Dokumentation für menschliche Entwickler und künftige Agenten sichert die langfristige Wartbarkeit.

**Aktionen:**
1. `README.md` im Projekt-Root aktualisieren:
   - Projektname und Kurzbeschreibung (1–2 Sätze).
   - Tech-Stack-Übersicht.
   - Installationsanleitung (`npm install`, `npm run dev`, `npm run build`).
   - Verweis auf `Konzept.md` für architektonische Details.
2. `AGENTS.md` im Projekt-Root erstellen:
   - Branching-Strategie (Feature-Branches, Merge via `--no-ff`, Löschen nach Merge).
   - Commit-Namen Konventionen (z. B. Conventional Commits: `feat:`, `fix:`, `docs:`).
   - Ordnerstruktur-Erklärung.
   - Wichtige Hinweise zur Code-Qualität (ESLint, Prettier).
   - Verweis auf `state/current-state.md` für den Projektstatus.

**Akzeptanzkriterien:**
- [ ] `README.md` ist im Root-Verzeichnis vorhanden und enthält alle genannten Abschnitte.
- [ ] `AGENTS.md` ist im Root-Verzeichnis vorhanden und gibt Agenten klare Orientierung.
- [ ] Beide Dateien sind frei von Tippfehlern und technisch korrekt.

---

## Task 1.9: Smoke-Test und Initial-Commit durchführen

**Beschreibung:**
Der finale Task der Phase sichert, dass alle vorherigen Konfigurationen zusammenspielen und einen sauberen Baseline-Stand auf `master` hinterlassen.

**Aktionen:**
1. `npm run lint` ausführen und eventuelle Fehler beheben.
2. `npm run format` ausführen.
3. `npm run build` ausführen und sicherstellen, dass der Produktions-Build fehlerfrei ist.
4. `npm run dev` starten und im Browser visuell prüfen:
   - Tailwind-Styling ist aktiv.
   - Routing funktioniert.
   - Zustand funktioniert (sofern ein Test-UI existiert).
5. Alle Änderungen committen.

**Akzeptanzkriterien:**
- [ ] Alle vorherigen Tasks (1.1–1.8) sind abgeschlossen.
- [ ] `npm run dev`, `npm run build` und `npm run lint` laufen fehlerfrei.
- [ ] Der Arbeitsbaum ist sauber (keine uncommitteden Änderungen).
- [ ] `current-state.md` wird aktualisiert: Phase 1 als abgeschlossen markieren.

---

## Phase-1 Definition of Done (Zusammenfassung)

Die Phase 1 gilt als **vollständig abgeschlossen**, wenn folgende Bedingungen erfüllt sind:

1. ✅ Ein React + Vite + TypeScript-Projekt läuft stabil.
2. ✅ TypeScript ist strikt konfiguriert (`strict: true`).
3. ✅ ESLint und Prettier sind eingerichtet und durch Scripts aufrufbar.
4. ✅ Tailwind CSS ist integriert und visuell funktional.
5. ✅ Die semantische Ordnerstruktur (`src/components`, `src/features`, `src/stores`, etc.) existiert.
6. ✅ Zustand und React Router sind installiert, typisiert und grundlegend konfiguriert.
7. ✅ `README.md` und `AGENTS.md` dokumentieren das Projekt.
8. ✅ Der `master`-Branch enthält einen sauberen, konsistenten Baseline-Stand.
9. ✅ `state/current-state.md` reflektiert den Abschluss von Phase 1.
