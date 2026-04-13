# Fix 06 Plan: Externe Placeholder-Bilder durch Base64-Data-URIs ersetzen

## Problem

Die HTML-Aufgaben in Bundle 1 verwenden externe Bilder von `https://via.placeholder.com/`. Diese Bilder laden auf GitHub Pages nicht zuverlässig. Die Browser-Console zeigt:

```
GET https://via.placeholder.com/150
NS_ERROR_NET_INTERRUPT
```

bzw.

```
Failed to load resource: net::ERR_CONNECTION_CLOSED @ https://via.placeholder.com/150:0
```

Obwohl die DOM-Validierung (Existenz des `<img>`-Tags) besteht, wird den Lernenden kein Bild angezeigt, was das Lernerlebnis deutlich beeinträchtigt.

## Reproduktion (via Playwright)

1. `https://heiligerg.github.io/WebTasks/task/bundle-01-html-basics/html-basics-02` aufrufen.
2. `<img src="https://via.placeholder.com/150" alt="Beispiel" />` in den Editor eingeben.
3. Das Iframe zeigt einen "gebrochenen Bild"-Link oder bleibt leer.
4. Netzwerk-Tab zeigt `ERR_CONNECTION_CLOSED` für `via.placeholder.com`.

## Root Cause Analyse

- `via.placeholder.com` ist ein externer Dienst, der in manchen Netzwerkumgebungen oder durch Browser-Sicherheitsrichtlinien (CSP, Tracking-Schutz) blockiert oder instabil ist.
- Das Iframe läuft mit `sandbox="allow-scripts"` und `srcdoc`, was möglicherweise zusätzliche Einschränkungen für Cross-Origin-Requests mit sich bringt.
- Die Plattform sollte keine Abhängigkeit von externen Bild-Hosting-Diensten haben, um ein konsistentes Lernerlebnis zu gewährleisten.

## Geplante Lösung

Alle externen `via.placeholder.com`-URLs in `public/bundles/bundle-01-html-basics.json` werden durch **inline Base64-Data-URIs** ersetzt. Dadurch werden die Bilder direkt im HTML-Code eingebettet und erfordern keinen separaten Netzwerk-Request.

### Vorteile von Base64-Data-URIs

- **Keine externen Abhängigkeiten:** Funktioniert offline und in restriktiven Netzwerken.
- **Keine BASE_URL-Problematik:** Im Gegensatz zu lokalen Bilddateien (`/WebTasks/images/...`) müssen keine Pfade zur GitHub Pages Base-URL angepasst werden.
- **Sandbox-kompatibel:** Da kein zusätzlicher Request aus dem Iframe heraus erfolgt, gibt es keine CSP- oder CORS-Probleme.

### Konkrete Änderungen in `bundle-01-html-basics.json`

| Task | Aktueller Wert | Neuer Wert |
|:---|:---|:---|
| **Task 2** (`html-basics-02`) | `src="https://via.placeholder.com/150"` | Base64-SVG-Data-URI (150×150, graues Rechteck mit Text "150x150") |
| **Task 3** (`html-basics-03`) | `src="https://via.placeholder.com/100"` | Base64-SVG-Data-URI (100×100, graues Rechteck mit Text "100x100") |

### Generierung der Base64-URIs

Wir erstellen zwei einfache SVG-Platzhalter und kodieren sie als Base64:

**150×150 SVG:**
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
  <rect width="150" height="150" fill="#cccccc"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#333333">150x150</text>
</svg>
```

**100×100 SVG:**
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#cccccc"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#333333">100x100</text>
</svg>
```

Diese werden mit `btoa()` (oder einem Shell-Befehl) in Base64 umgewandelt und als `data:image/svg+xml;base64,...` eingebettet.

### Datei-Anpassungen

- **`public/bundles/bundle-01-html-basics.json`**:
  - In Task 2 (`html-basics-02`): `instruction` und `initialCode.html` anpassen.
  - In Task 3 (`html-basics-03`): `initialCode.html` anpassen.

> Hinweis: Die `instruction` in Task 2 erwähnt explizit die URL `https://via.placeholder.com/150`. Diese muss ebenfalls durch eine allgemeinere Formulierung ersetzt werden (z. B. "folgende URL als `src`" → "folgenden Platzhalter-Link als `src`").

## Implementierungs-Tasks

| # | Task | Datei(en) |
|:-|:---|:---|
| 1 | Base64-Data-URI für 150×150 SVG generieren | — |
| 2 | Base64-Data-URI für 100×100 SVG generieren | — |
| 3 | `bundle-01-html-basics.json`: Task 2 `instruction` und `initialCode.html` anpassen | `public/bundles/bundle-01-html-basics.json` |
| 4 | `bundle-01-html-basics.json`: Task 3 `initialCode.html` anpassen | `public/bundles/bundle-01-html-basics.json` |
| 5 | JSON validieren (Syntax-Check) | — |
| 6 | `state/current-state.md` aktualisieren | `state/current-state.md` |

## Git-Workflow

1. **Branch erstellen:** `fix/06-placeholder-images` (von `master`)
2. **Implementation**
3. **QA durchführen** (JSON-Validität, lokaler Build-Smoke-Test)
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**
7. **Deployment beobachten** und Live-URL mit Playwright testen

## Testplan nach Deploy

- [ ] Task "Bilder einbinden" (Bundle 1, Task 2): Das Platzhalter-Bild wird im Iframe korrekt angezeigt (graues Rechteck mit "150x150")
- [ ] Task "Deine Profilkarte" (Bundle 1, Task 3): Das Profilbild wird korrekt angezeigt (graues Rechteck mit "100x100")
- [ ] Keine Netzwerk-Fehler mehr für `via.placeholder.com` in der Browser-Konsole
- [ ] DOM-Validierung für beide Tasks funktioniert weiterhin
