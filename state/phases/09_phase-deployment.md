# Phase 9 Plan: QA, Optimierung & Deployment

## Ziel
Die WebTasks-Plattform wird produktionsreif gemacht und auf **GitHub Pages** deployed. Dazu führen wir eine abschließende Qualitätssicherung (QA) durch, beheben Performance-Warnungen und richten eine automatische Deployment-Pipeline ein.

---

## 1. Hosting-Entscheidung: GitHub Pages

### 1.1 Warum GitHub Pages?
- **Kostenlos & integriert:** Kein separater Hosting-Anbieter nötig; das Repository enthält Code und Deployment-Infrastruktur.
- **Statische SPA:** WebTasks ist eine reine Client-Side-Anwendung (React + Vite). Es gibt kein Backend, keine API-Routes und keine serverseitige Logik – ideal für statisches Hosting.
- **HTTPS out-of-the-box:** GitHub Pages liefert automatisch SSL-Zertifikate.
- **CI/CD über GitHub Actions:** Ermöglicht automatisches Deployment bei jedem Push auf `master`.

### 1.2 Technische Anforderungen an GitHub Pages
- **Project Page vs. User Page:** Da das Repository `WebTasks` heißt und unter einem normalen Account/Organisation liegt, wird es eine **Project Page** (`https://<user>.github.io/WebTasks/`). Das erfordert die Konfiguration der `base` URL in Vite.
- **SPA-Routing:** Direkte Links zu Routes (z. B. `/task/bundle-01/task-01`) führen auf GitHub Pages zu einem 404-Fehler, weil der Server die Route nicht kennt. Dies wird durch den bewährten `404.html`-Redirect-Trick gelöst.

---

## 2. QA-Checkliste (Pre-Deployment)

Bevor deployt wird, müssen folgende Qualitätsgatter erfolgreich passiert werden:

- [ ] **Linting:** `npm run lint` läuft fehlerfrei (ESLint + Prettier).
- [ ] **TypeScript:** `npx tsc --noEmit` läuft unter `strict` Mode ohne Fehler.
- [ ] **Build:** `npm run build` erzeugt erfolgreich den `dist/`-Ordner.
- [ ] **Smoke-Test:** Der Produktions-Build wird lokal mit `npm run preview` gestartet und im Browser auf Funktionalität geprüft.
- [ ] **Curriculum-Validierung:** Alle 10 Tasks aus den 3 Bundles werden manuell durchgespielt (Code eingeben, Validierung auslösen, Badge freischalten).
- [ ] **Persistence-Check:** `localStorage` (Zustand, Code-Snippets, abgeschlossene Tasks) funktioniert auch nach einem Reload des deployed Builds.

---

## 3. Optimierungsmaßnahmen

### 3.1 Build-Warnung: JS-Chunk > 500 kB
- **Problem:** Die Produktions-Build warnt, dass ein JavaScript-Chunk die 500-kB-Grenze überschreitet (verursacht durch CodeMirror und react-markdown).
- **Lösung:**
  1. **Manuelles Chunk-Splitting** in `vite.config.ts` einrichten, um große Bibliotheken in separate Chunks auszulagern (z. B. `vendor-codemirror`, `vendor-markdown`).
  2. **`chunkSizeWarningLimit`** auf `800` erhöhen, damit der Build sauber durchläuft, ohne dass legitime Vendor-Bibliotheken als Fehler dargestellt werden.

### 3.2 SPA-Routing auf GitHub Pages
- **Problem:** React Router verwendet Browser-History. Ein direkter Aufruf von `/task/bundle-02/task-01` führt auf GitHub Pages zu 404.
- **Lösung:**
  - Eine `404.html` im `public/`-Ordner erstellen, die die aktuelle URL in einen Query-Parameter umwandelt und auf `index.html` redirectet.
  - In `main.tsx` (oder einem dedizierten `restoreSpaRouting`-Utility) die URL nach dem Load wiederherstellen.

### 3.3 SEO & Meta-Daten
- `index.html` um `<meta name="description">` und OpenGraph-Tags (`og:title`, `og:description`) erweitern.
- `robots.txt` in `public/` hinzufügen (`User-agent: *\nAllow: /`).

---

## 4. Deployment-Pipeline (GitHub Actions)

### 4.1 Workflow-Datei
- **Pfad:** `.github/workflows/deploy.yml`
- **Trigger:** `push` auf `master`
- **Jobs:**
  1. **Build-Job:**
     - Checkout des Repository
     - Node.js 20 einrichten
     - `npm ci`
     - `npm run build`
     - Upload des `dist/`-Ordners als GitHub Actions Artifact
  2. **Deploy-Job:**
     - Download des Artifacts
     - Deployment auf GitHub Pages via `actions/deploy-pages`

### 4.2 Repository-Einstellungen
- In den GitHub-Repository-Einstellungen unter **Pages** die Source auf **GitHub Actions** umstellen.

---

## 5. Dokumentation

- **`README.md`:**
  - Kurzbeschreibung des Projekts
  - Link zur deployed GitHub Pages URL
  - Build-Befehle (`npm run dev`, `npm run build`, `npm run preview`)
  - Architektur-Überblick (React + Vite + Zustand + CodeMirror)
- **`AGENTS.md`:**
  - Deployment-Workflow dokumentieren
  - Hinweis auf `base` URL und SPA-Routing-Trick
- **`state/current-state.md`:**
  - Phase 9 als "in Progress" markieren

---

## 6. Implementierungs-Reihenfolge & Git-Workflow

Wie in allen vorherigen Phasen wird strikt der Feature-Branch-Workflow eingehalten:

1. **Branch `feat/phase-09-deployment-optimization` erstellen** (von `master`).
2. **Implementierung:**
   - `vite.config.ts` anpassen (`base`, `manualChunks`, `chunkSizeWarningLimit`)
   - `404.html` + Routing-Restore implementieren
   - `.github/workflows/deploy.yml` erstellen
   - Meta-Tags und `robots.txt` hinzufügen
   - Dokumentation aktualisieren
3. **QA durchführen:** Build, Lint, TypeScript, lokaler Preview, manuelle Task-Tests.
4. **Commit & Push** des Feature-Branches.
5. **Merge** in `master` via **`--no-ff`** mit einer aussagekräftigen Merge-Commit-Message.
6. **Branch löschen** (lokal und remote).
7. **Deployment beobachten:** GitHub Actions Pipeline überwachen und Live-URL testen.

---

## 7. Risiken & Fallbacks

| Risiko | Mitigation |
|:---|:---|
| GitHub Pages `base` URL falsch gesetzt | Vor dem ersten Deploy lokal mit `npm run preview` und simulierter `base` testen. |
| SPA-Routing funktioniert nicht nach Deploy | `404.html`-Trick gründlich in lokalem Build testen; Fallback auf Hash-Router dokumentieren. |
| GitHub Actions schlägt fehl | Build-Logs analysieren; ggf. Berechtigungen (`permissions: contents: read, pages: write, id-token: write`) prüfen. |
| Chunk-Splitting bricht dynamisches Import-Verhalten | Nach Build `dist/assets/` prüfen; alle Bundles müssen weiterhin via `fetch()` ladbar sein. |
