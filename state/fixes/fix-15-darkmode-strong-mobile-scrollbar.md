# Fix 15: Dark Mode Strong Text & Mobile Scrollbar

## Ziel

Behebung von zwei verbleibenden UI-Problemen: Dunkler `<strong>`-Text im Dark Mode sowie eine unerwünschte horizontale Scrollbar auf kleinen Bildschirmen.

---

## Bug 1: `<strong>`-Text im Dark Mode zu dunkel

### Symptom

Fettgedruckte Texte (z. B. `**Beispiel:**`, `**zweite**`) innerhalb der Markdown-Instruktionen sind im Dark Mode kaum lesbar, da sie eine dunkle Farbe behalten.

### Ursache

`MarkdownRenderer.tsx` definiert zwar viele Dark-Mode-Overrides für das `prose`-Container (z. B. `dark:prose-p:text-gray-300`, `dark:prose-headings:text-gray-100`), jedoch fehlt explizit eine Override für `strong`-Elemente (`dark:prose-strong`). Das `@tailwindcss/typography` Plugin erbt daher im Dark Mode eine dunkle Standardfarbe für `<strong>`.

### Lösung

In `MarkdownRenderer.tsx` dem `prose`-Container die Klasse `dark:prose-strong:text-gray-100` hinzufügen.

**Betroffene Datei:**

- `src/components/MarkdownRenderer.tsx`

---

## Bug 2: Horizontale Scrollbar auf kleinen Bildschirmen

### Symptom

Auf mobilen Geräten oder schmalen Viewports entsteht eine horizontale Scrollbar für die gesamte Seite.

### Ursache

Die App besitzt kein globales `overflow-x: hidden`. Lange Code-Blöcke (`<pre>`) in den Instruktionen oder breite Editor/Preview-Elemente können leicht über die Viewport-Breite hinauswachsen und so eine horizontale Scrollbar am `<body>` oder `<html>` verursachen.

### Lösung

In `src/index.css` den Selektoren `html` und `body` ein `overflow-x-hidden` hinzufügen.

**Alt:**

```css
body {
  font-family: ...;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Neu:**

```css
html,
body {
  overflow-x: hidden;
}

body {
  font-family: ...;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Betroffene Datei:**

- `src/index.css`

---

## Implementierungs-Workflow

1. **Branch erstellen:** `fix/15-darkmode-strong-mobile-scrollbar`
2. **Änderungen anwenden:**
   - `src/components/MarkdownRenderer.tsx`: `dark:prose-strong:text-gray-100` zur `prose`-Klasse hinzufügen
   - `src/index.css`: `html, body { overflow-x: hidden; }` hinzufügen
3. **QA durchführen:**
   - `npm run build` ausführen
   - Visuell prüfen (Dark Mode): Fettgedruckte Texte in Instruktionen sind hellgrau/weiß
   - Visuell prüfen (Mobile/Resized Browser): Keine horizontale Scrollbar auf der Startseite und Task-Seite
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**

---

## Risiken

| Risiko                                          | Mitigation                                                                                                                            |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `overflow-x: hidden` versteckt gewollten Inhalt | Der Layout-Container (`max-w-7xl`) und responsive Breakpoints stellen sicher, dass kein kritischer Inhalt am Rand abgeschnitten wird. |
| `dark:prose-strong` greift nicht                | Tailwind generiert die Klasse korrekt, solange das Typography-Plugin aktiv ist.                                                       |
