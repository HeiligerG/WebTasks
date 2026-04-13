# Fix 09 Plan: Bundle 1 Content Cleanup – placeholder.svg & konsistente initialCodes

## Problem

Der Nutzer meldet drei Inhaltsprobleme im Bundle "HTML & CSS Grundlagen":

1. **Task 1** (`html-basics-01`): Im Editor steht scheinbar `<h1>Hallo Welt</p>` (oder eine halb-korrekte Variante). Der Nutzer empfindet dies als Bug, weil die Aufgabe bereits "fast gelöst" aussieht, aber falsch ist.
2. **Task 2** (`html-basics-02`): Die `instruction` enthält einen sehr langen Base64-Data-URI, der im Editor unleserlich ist.
3. **Task 3** (`html-basics-03`): Der `initialCode` enthält ebenfalls einen langen Base64-Data-URI für das Profilbild, was den Code unübersichtlich macht.

## Root Cause Analyse

### Task 1
Der `initialCode` in `bundle-01-html-basics.json` ist korrekt als `<p>Hallo Welt</p>` hinterlegt. Wenn der Nutzer einen abweichenden (halb-fertigen) Code im Editor sieht, stammt dieser aus seinem `localStorage` (persistierter Zustand aus früheren Sitzungen). Da der `initialCode` seit Projektbeginn mehrfach unverändert `<p>Hallo Welt</p>` war, kann es vorkommen, dass veraltete/gemischte Werte im Browser-Store stehen bleiben.

### Task 2 & Task 3
In Fix 06 wurden externe `via.placeholder.com`-URLs durch **inline Base64-SVG-Data-URIs** ersetzt. Diese funktionieren technisch, sind aber extrem lang und verschlechtern die Lesbarkeit des Codes im Editor erheblich. Der Nutzer hat nun eine eigene `placeholder.svg` in `public/placeholder.svg` bereitgestellt, die als saubere Alternative dienen soll.

## Geplante Lösung

### 1. `placeholder.svg` als statisches Asset verwenden

Die Datei `public/placeholder.svg` wird beim Build von Vite automatisch in `dist/placeholder.svg` kopiert. Auf GitHub Pages ist sie unter der absoluten URL erreichbar:

```
https://heiligerg.github.io/WebTasks/placeholder.svg
```

> **Hinweis:** Relative Pfade wie `placeholder.svg` oder `./placeholder.svg` funktionieren **nicht** innerhalb eines `srcdoc`-Iframes, weil das Iframe keine eigene URL hat und relative Pfade gegen die aktuelle Browser-Route aufgelöst würden (z. B. `/WebTasks/task/bundle-01-html-basics/html-basics-02/placeholder.svg`). Daher muss die **absolute URL** verwendet werden.

### 2. Task 1: initialCode leicht verändern

Um sicherzustellen, dass der "Zurücksetzen"-Button (Fix 07) auch wirklich einen frischen, unverwechselbaren Zustand herstellt, wird der `initialCode` von Task 1 minimal angepasst:

```html
<p>Willkommen bei WebTasks</p>
```

Das eliminiert jegliche Verwechslung mit möglichen alten `localStorage`-Werten.

### 3. Task 2: instruction und initialCode bereinigen

- **`instruction`:** Der lange Base64-String wird entfernt. Stattdessen wird der Nutzer aufgefordert, das bereitgestellte Bild zu verwenden:
  
  > "Verwende dafür folgende Bild-URL als `src`:\n\n`https://heiligerg.github.io/WebTasks/placeholder.svg`"

- **`initialCode`:** Bleibt `<div>Bild kommt hier hin</div>` (bereits in Fix 08 korrigiert).

### 4. Task 3: initialCode mit absoluter SVG-URL

Der Base64-String im `initialCode` wird durch die absolute URL ersetzt:

```html
<div class="profile-card">
  <img src="https://heiligerg.github.io/WebTasks/placeholder.svg" alt="Profilbild" />
  <h2>Dein Name</h2>
  <p>Hobby: Programmieren</p>
</div>
```

## Implementierungs-Tasks

| # | Task | Datei(en) |
|:-|:---|:---|
| 1 | Task 1 `initialCode.html` anpassen | `public/bundles/bundle-01-html-basics.json` |
| 2 | Task 2 `instruction` bereinigen (Base64 → absolute URL) | `public/bundles/bundle-01-html-basics.json` |
| 3 | Task 3 `initialCode.html` bereinigen (Base64 → absolute URL) | `public/bundles/bundle-01-html-basics.json` |
| 4 | JSON validieren (Syntax-Check) | — |
| 5 | `state/current-state.md` aktualisieren | `state/current-state.md` |

## Git-Workflow

1. **Branch erstellen:** `fix/09-bundle-content-cleanup` (von `master`)
2. **Implementation**
3. **QA durchführen** (JSON-Validität, Build)
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**
7. **Deployment beobachten**

## Testplan nach Deploy

- [ ] Task 1: Nach Klick auf "↺ Zurücksetzen" steht `<p>Willkommen bei WebTasks</p>` im Editor.
- [ ] Task 2: `instruction` zeigt die saubere URL `https://heiligerg.github.io/WebTasks/placeholder.svg` an.
- [ ] Task 2: `initialCode` ist `<div>Bild kommt hier hin</div>`.
- [ ] Task 3: `initialCode` verwendet `https://heiligerg.github.io/WebTasks/placeholder.svg` statt eines Base64-Strings.
- [ ] Alle 3 Tasks laden ihre Bilder korrekt im Preview-Iframe.
- [ ] DOM-Validierung funktioniert für alle 3 Tasks weiterhin.
