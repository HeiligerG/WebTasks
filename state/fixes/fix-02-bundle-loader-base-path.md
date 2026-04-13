# Fix 02 Plan: Bundle-Loader Pfade für GitHub Pages Base URL

## Problem

Nach dem Deployment auf GitHub Pages werden die Lernmodule (Bundles) nicht geladen. Die Startseite bleibt leer (keine Bundle-Kacheln), und die Task-Seite kann keine Aufgaben anzeigen. Die Browser-Console zeigt:

```
GET https://heiligerg.github.io/bundles/bundle-01-html-basics.json [HTTP/2 404]
GET https://heiligerg.github.io/bundles/bundle-02-javascript-basics.json [HTTP/2 404]
GET https://heiligerg.github.io/bundles/bundle-03-interactive-web.json [HTTP/2 404]
```

Zusätzlich bleibt der Favicon-Request ein 404:
```
GET https://heiligerg.github.io/WebTasks/favicon.svg [HTTP/2 404]
```

## Reproduktion

1. Deployment auf GitHub Pages ausführen.
2. `https://heiligerg.github.io/WebTasks/` aufrufen.
3. Startseite zeigt keine Bundles an.
4. Direkter Link zu einer Task-Seite zeigt keine Aufgaben an.

## Root Cause Analyse

### Bundle-URLs
Die Anwendung wird als **GitHub Pages Project Page** unter dem Subpfad `/WebTasks/` gehostet. In `vite.config.ts` ist `base: '/WebTasks/'` korrekt konfiguriert, wodurch alle JS/CSS-Assets unter `/WebTasks/assets/...` geladen werden.

Die Bundle-JSON-Dateien liegen jedoch im `public/bundles/`-Ordner. Vite kopiert den `public/`-Ordner beim Build relativ zur konfigurierten `base` URL in das `dist/`-Verzeichnis. Das bedeutet, die Bundles sind nach dem Deploy unter `https://heiligerg.github.io/WebTasks/bundles/...` erreichbar.

Im Code werden die Bundles jedoch mit **absoluten Pfaden** von der Domain-Root aus geladen:

- `src/components/HomePage.tsx:18-20`
  ```ts
  '/bundles/bundle-01-html-basics.json'
  '/bundles/bundle-02-javascript-basics.json'
  '/bundles/bundle-03-interactive-web.json'
  ```
- `src/components/TaskPage.tsx:41`
  ```ts
  const bundleUrl = `/bundles/${bundleId}.json`;
  ```
- `src/components/CertificatePage.tsx:13`
  ```ts
  loadAllBundles(['/bundles/bundle-01-html-basics.json'])
  ```

Diese führen zu Requests gegen `https://heiligerg.github.io/bundles/...`, was ein 404 liefert, da die Dateien tatsächlich unter `/WebTasks/bundles/...` liegen.

### Favicon
In `index.html` wurde der Favicon-Pfad in Fix 01 auf `/WebTasks/favicon.svg` geändert. Das 404 deutet darauf hin, dass die Datei `public/favicon.svg` nicht im Repository vorhanden ist und somit auch nicht in den Build kopiert wurde. Dieser Fehler ist unabhängig vom Base-Path-Problem, wird aber in diesem Fix mitadressiert.

## Geplante Lösung

### 1. Zentrale Bundle-URL-Helper-Funktion

In `src/lib/contentLoader.ts` wird eine neue Hilfsfunktion eingeführt, die die Vite-Base-URL berücksichtigt:

```ts
export function getBundleUrl(bundleId: string): string {
  return `${import.meta.env.BASE_URL}bundles/${bundleId}.json`;
}
```

`import.meta.env.BASE_URL` wird von Vite zur Build-Zeit injiziert und enthält automatisch den Wert aus `vite.config.ts` (hier: `/WebTasks/`). Falls die App jemals unter einer anderen Base deployed wird, muss nur die Vite-Konfiguration angepasst werden – die Bundle-URLs passen sich automatisch an.

### 2. Alle Aufrufstellen anpassen

| Datei | Aktueller Code | Neuer Code |
|:---|:---|:---|
| `HomePage.tsx` | `loadAllBundles(['/bundles/bundle-01-html-basics.json', ...])` | `loadAllBundles([getBundleUrl('bundle-01-html-basics'), ...])` |
| `TaskPage.tsx` | `` `bundles/${bundleId}.json` `` | `getBundleUrl(bundleId)` |
| `CertificatePage.tsx` | `loadAllBundles(['/bundles/bundle-01-html-basics.json'])` | `loadAllBundles([getBundleUrl('bundle-01-html-basics')])` |

### 3. Favicon bereinigen

- Prüfen, ob `public/favicon.svg` existiert. Falls nicht, wird eine einfache SVG-Datei als Platzhalter erstellt, um das 404 zu vermeiden.
- Alternativ kann der Favicon-Link aus `index.html` entfernt werden, falls keine Favicon-Datei gewünscht ist.

### 4. QA-Checks

- `npm run lint` muss fehlerfrei durchlaufen.
- `npx tsc --noEmit` muss fehlerfrei durchlaufen.
- `npm run build` muss fehlerfrei durchlaufen.
- Im `dist/`-Ordner prüfen, ob `dist/bundles/` vorhanden ist (Vite kopiert `public/bundles/` in `dist/bundles/`).

## Implementierungs-Tasks

| # | Task | Datei(en) |
|:-|:---|:---|
| 1 | `getBundleUrl()` in `contentLoader.ts` hinzufügen | `src/lib/contentLoader.ts` |
| 2 | `HomePage.tsx` auf `getBundleUrl()` umstellen | `src/components/HomePage.tsx` |
| 3 | `TaskPage.tsx` auf `getBundleUrl()` umstellen | `src/components/TaskPage.tsx` |
| 4 | `CertificatePage.tsx` auf `getBundleUrl()` umstellen | `src/components/CertificatePage.tsx` |
| 5 | Favicon-Problem beheben (SVG erstellen oder Link entfernen) | `public/favicon.svg` oder `index.html` |
| 6 | Build, Lint, TypeScript prüfen | — |
| 7 | `state/current-state.md` aktualisieren | `state/current-state.md` |

## Git-Workflow

Wie bei allen vorherigen Änderungen wird strikt der Feature-Branch-Workflow eingehalten:

1. **Branch erstellen:** `fix/02-bundle-loader-base-path` (von `master`)
2. **Implementation** der oben genannten Änderungen
3. **QA durchführen** (Build, Lint, TypeScript)
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen** (lokal und remote)
7. **Deployment beobachten** und Live-URL testen

## Testplan nach Deploy

- [ ] `https://heiligerg.github.io/WebTasks/` zeigt alle 3 Bundles als Kacheln an
- [ ] Klick auf ein Bundle öffnet die erste Task korrekt
- [ ] Direkter Link zu einer Task-Route lädt die Aufgabenbeschreibung und den Editor
- [ ] `favicon.svg` lädt ohne 404 (oder es wird kein Favicon-Request mehr ausgelöst)
- [ ] Keine 404-Fehler für JSON-Bundles in der Browser-Console
