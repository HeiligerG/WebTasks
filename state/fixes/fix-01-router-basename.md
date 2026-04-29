# Fix 01 Plan: React Router basename für GitHub Pages

## Problem

Nach dem erfolgreichen Deployment auf GitHub Pages bleibt die WebTasks-Plattform komplett **weiß** (blank screen). Die Browser-Konsole zeigt:

```
No routes matched location "/WebTasks/"
```

Alle Netzwerk-Requests für JS- und CSS-Chunks returnieren HTTP 200, d. h. der Build wird korrekt ausgeliefert.

## Reproduktion

1. Deployment-Workflow auf `master` ausführen.
2. `https://heiligerg.github.io/WebTasks/` aufrufen.
3. Seite bleibt weiß; React-Root ist im DOM vorhanden, aber keine Komponente wird gerendert.

## Root Cause Analyse

Die Anwendung wird als **GitHub Pages Project Page** unter dem Subpfad `/WebTasks/` gehostet.

- `vite.config.ts` ist korrekt mit `base: '/WebTasks/'` konfiguriert, sodass alle Assets (JS, CSS) korrekt unter `/WebTasks/assets/...` geladen werden.
- **React Router `BrowserRouter` in `src/main.tsx` hat jedoch kein `basename` gesetzt.**
- React Router versucht daher, die aktuelle URL `/WebTasks/` gegen die definierten Routes zu matchen. Da die Routes auf `/` (Root) ausgelegt sind, findet er keine Übereinstimmung.
- Das führt dazu, dass keine Route gerendert wird → blank screen.

Zusätzlich wurde beobachtet:

```
GET https://heiligerg.github.io/favicon.svg [HTTP/2 404]
```

Das Favicon in `index.html` wird ebenfalls ohne Berücksichtigung der `base` URL von `/favicon.svg` angefragt, was auf GitHub Pages zu einem 404 führt.

## Geplante Lösung

### 1. React Router basename setzen

In `src/main.tsx` muss `BrowserRouter` mit dem Prop `basename="/WebTasks"` initialisiert werden:

```tsx
<BrowserRouter basename="/WebTasks">
  <App />
</BrowserRouter>
```

Dadurch werden alle internen Routes relativ zu `/WebTasks/` behandelt. Die Route-Definitionen in `App.tsx` (z. B. `/`, `/task/:bundleId/:taskId`, `/certificate`) funktionieren dann korrekt.

### 2. Favicon-Pfad korrigieren

In `index.html` sollte der Favicon-Pfad relativ zur aktuellen Base sein:

```html
<link rel="icon" type="image/svg+xml" href="/WebTasks/favicon.svg" />
```

Alternativ (sauberer): Vite resolved bei einem Build mit `base` automatisch relative Pfade, aber `index.html` wird als statisches Template behandelt. Der absolutpfad `/favicon.svg` bleibt unverändert. Die explizite Anpassung auf `/WebTasks/favicon.svg` ist daher notwendig.

### 3. SPA-Routing-Restore anpassen

In `src/main.tsx` prüft das SPA-Routing-Restore-Logic aktuell:

```ts
if (currentPath === '/WebTasks/' || currentPath === '/WebTasks/index.html') {
```

Dies funktioniert weiterhin, sollte aber getestet werden, nachdem `basename` gesetzt wurde, um sicherzustellen, dass `history.replaceState` nicht mit doppelten Bases konfligiert.

> Hinweis: `history.replaceState` arbeitet mit absoluten Pfaden. Da `BrowserRouter` den `basename` intern bei der Pfad-Matching-Logik abzieht, ist die Kombination aus absolutem `replaceState` und `basename` korrekt.

## Implementierungs-Tasks

| #   | Task                                                                 | Datei(en)                |
| :-- | :------------------------------------------------------------------- | :----------------------- |
| 1   | `BrowserRouter` um `basename="/WebTasks"` erweitern                  | `src/main.tsx`           |
| 2   | Favicon-Link in `index.html` auf `/WebTasks/favicon.svg` ändern      | `index.html`             |
| 3   | Build lokal ausführen und prüfen, ob keine neuen Warnungen entstehen | —                        |
| 4   | Lint und TypeScript-Check ausführen                                  | —                        |
| 5   | `state/current-state.md` aktualisieren (Fix-Status dokumentieren)    | `state/current-state.md` |

## Git-Workflow

Wie bei allen vorherigen Änderungen wird strikt der Feature-Branch-Workflow eingehalten:

1. **Branch erstellen:** `fix/01-router-basename` (von `master`)
2. **Implementation** der oben genannten Änderungen
3. **QA durchführen** (Build, Lint, TypeScript)
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen** (lokal und remote)
7. **Deployment beobachten** und Live-URL testen

## Testplan nach Deploy

- [ ] `https://heiligerg.github.io/WebTasks/` zeigt die `HomePage` mit Hero und Bundle-Kacheln an
- [ ] Direkter Link zu einer Task-Route (z. B. `/WebTasks/task/bundle-01-html-basics/task-01`) funktioniert über den `404.html`-Redirect
- [ ] Navigation zwischen Tasks funktioniert
- [ ] Favicon-Request liefert kein 404 mehr
- [ ] Alle 3 Bundles werden auf der Startseite gelistet
