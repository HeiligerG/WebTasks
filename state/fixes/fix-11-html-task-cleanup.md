# Fix 11 Plan: HTML-Task 1–3 finale Inhaltsbereinigung

## Problem

Der Nutzer meldet zwei verbleibende Inhaltsprobleme im Bundle "HTML & CSS Grundlagen":

1. **Task 1** (`html-basics-01`): Der Editor zeigt scheinbar `<h1>Willkommen bei WebTasks</p>` an. Der Nutzer fragt, ob es nicht korrekt `<h1>Willkommen bei WebTasks</h1>` sein müsse.
2. **Task 2 & Task 3**: Die `<img>`-Tags sollen das Attribut `width="150"` erhalten, damit die `placeholder.svg` konsistent in 150px Breite dargestellt wird.

## Root Cause Analyse

### Task 1

Der `initialCode` in der JSON ist korrekt als `<p>Willkommen bei WebTasks</p>` hinterlegt. Wenn der Nutzer jedoch `<h1>Willkommen bei WebTasks</p>` sieht, stammt dieser Wert aus seinem `localStorage` (persistierter Code aus einer früheren Sitzung).

Das Problem entsteht, weil der `initialCode` einen halb-fertigen Zustand suggeriert (`<p>...</p>`), der vom Nutzer nur in `<h1>...</h1>` umgewandelt werden muss. Bei einem früheren Versuch konnte der Nutzer den schließenden Tag falsch gesetzt haben (`</p>` statt `</h1>`), und dieser Wert blieb im Speicher.

**Lösung:** Der `initialCode` wird auf reinen Text ohne HTML-Tags gesetzt:

```
Willkommen bei WebTasks
```

Damit muss der Nutzer den `<h1>`-Tag **komplett selbst** einfügen (öffnend UND schließend). Das eliminiert jede Verwechslung mit halb-korrekten Tags aus dem `localStorage` und ist didaktisch klarer.

### Task 2

Die `placeholder.svg` hat im Original eine ViewBox von 800×800 und wird ohne Größenattribut sehr groß dargestellt. Der Nutzer soll das Bild mit `width="150"` einbinden.

**Lösung:** Die `instruction` wird angepasst und zeigt als vollständiges Beispiel:

```html
<img src="https://heiligerg.github.io/WebTasks/placeholder.svg" width="150" alt="Beispielbild" />
```

### Task 3

Der `initialCode` enthält bereits das `<img>`-Tag mit der `placeholder.svg`-URL, aber ohne `width`-Attribut.

**Lösung:** `width="150"` wird in den `initialCode` eingefügt:

```html
<img src="https://heiligerg.github.io/WebTasks/placeholder.svg" width="150" alt="Profilbild" />
```

## Implementierungs-Tasks

| #   | Task                                                       | Datei(en)                                   |
| :-- | :--------------------------------------------------------- | :------------------------------------------ |
| 1   | Task 1 `initialCode.html` auf reinen Text ohne Tags setzen | `public/bundles/bundle-01-html-basics.json` |
| 2   | Task 2 `instruction` um `width="150"` im Beispiel ergänzen | `public/bundles/bundle-01-html-basics.json` |
| 3   | Task 3 `initialCode.html` um `width="150"` ergänzen        | `public/bundles/bundle-01-html-basics.json` |
| 4   | JSON validieren (Syntax-Check)                             | —                                           |
| 5   | `state/current-state.md` aktualisieren                     | `state/current-state.md`                    |

## Git-Workflow

1. **Branch erstellen:** `fix/11-html-task-cleanup` (von `master`)
2. **Implementation**
3. **QA durchführen** (JSON-Validität, Build)
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**
7. **Deployment beobachten**

## Testplan nach Deploy

- [ ] Task 1: Nach Klick auf "↺ Zurücksetzen" steht reiner Text `Willkommen bei WebTasks` im Editor.
- [ ] Task 1: Nutzer tippt `<h1>Willkommen bei WebTasks</h1>` → Validierung bestanden.
- [ ] Task 2: `instruction` zeigt das vollständige Beispiel mit `width="150"` an.
- [ ] Task 3: Bild in der Profilkarte wird mit `width="150"` angezeigt.
