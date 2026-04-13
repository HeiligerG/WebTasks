# Fix 08 Plan: Task 2 "Bilder einbinden" initialCode korrigieren

## Problem

Nach Fix 06 enthält die HTML-Aufgabe "Bilder einbinden" (Bundle 1, Task 2) im Editor bereits ein vollständiges `<img>`-Tag mit Base64-Data-URI als `initialCode`. Das führt dazu, dass:

- Die Aufgabe bereits als "gelöst" erscheint, sobald man sie öffnet.
- Der Nutzer keinen Lerneffekt hat, weil er das `<img>`-Tag nicht selbst einfügen muss.
- Der eigentliche Sinn der Aufgabe ("Ersetze den Platzhalter-Text durch ein Bild") verloren geht.

## Root Cause Analyse

In Fix 06 wurden die externen `via.placeholder.com`-URLs durch Base64-Data-URIs ersetzt. Dabei wurde fälschlicherweise nicht nur die Beispiel-URL in der `instruction`, sondern auch der `initialCode` auf das fertige `<img>`-Tag umgestellt.

Ursprünglicher `initialCode` (vor Fix 06):
```html
<div>Bild kommt hier hin</div>
```

Falscher `initialCode` (nach Fix 06):
```html
<img src="data:image/svg+xml;base64,..." alt="Beispielbild" />
```

Der `initialCode` sollte weiterhin einen **Platzhalter-Text** enthalten, den der Nutzer selbst durch ein `<img>`-Tag ersetzt.

## Geplante Lösung

### 1. `initialCode` von Task 2 wieder zurücksetzen

In `public/bundles/bundle-01-html-basics.json` wird der `initialCode` von Task 2 (`html-basics-02`) wieder auf einen neutralen Platzhalter gesetzt:

```json
"initialCode": {
  "html": "<div>Bild kommt hier hin</div>",
  "css": "",
  "js": ""
}
```

### 2. `instruction` anpassen

Die `instruction` sollte den Base64-Data-URI als **empfohlenen Wert** behalten, damit der Nutzer ihn kopieren und als `src` einfügen kann. Der Text wird leicht angepasst:

> "Ersetze den Platzhalter-Text durch ein Bild. Verwende dafür folgenden Base64-Platzhalter als `src`:
> 
> `data:image/svg+xml;base64,PHN2Zy...`"

Die Validierung prüft nur auf das Vorhandensein eines `<img>`-Tags (`selector: "img"`). Es ist also unerheblich, welche `src` der Nutzer verwendet, solange das Tag korrekt eingefügt wird.

### 3. Keine Änderungen an anderen Tasks

- Task 1 bleibt unverändert.
- Task 3 behält seinen `initialCode` mit dem bereits eingebauten Bild, da hier der Fokus auf CSS (`border-radius`) liegt.

## Implementierungs-Tasks

| # | Task | Datei(en) |
|:-|:---|:---|
| 1 | `initialCode` von Task 2 in `bundle-01-html-basics.json` auf Platzhalter-Text zurücksetzen | `public/bundles/bundle-01-html-basics.json` |
| 2 | `instruction` von Task 2 leicht anpassen (Base64-String als empfohlenen Wert behalten) | `public/bundles/bundle-01-html-basics.json` |
| 3 | JSON validieren (Syntax-Check) | — |
| 4 | `state/current-state.md` aktualisieren | `state/current-state.md` |

## Git-Workflow

1. **Branch erstellen:** `fix/08-task-02-initialcode` (von `master`)
2. **Implementation**
3. **QA durchführen** (JSON-Validität, Build)
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**
7. **Deployment beobachten**

## Testplan nach Deploy

- [ ] Task "Bilder einbinden" öffnen → Editor zeigt `<div>Bild kommt hier hin</div>` an
- [ ] Nutzer tippt `<img src="data:image/svg+xml;base64,..." alt="..." />` ein
- [ ] Klick auf "Code prüfen" → Test wird bestanden
- [ ] Der "↺ Zurücksetzen"-Button setzt den Code wieder auf `<div>Bild kommt hier hin</div>` zurück
