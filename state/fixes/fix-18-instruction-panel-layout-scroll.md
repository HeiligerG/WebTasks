# Fix 18: Instruction Panel Scrollbar & Text Overflow

## Ziel
Behebung zweier verbleibender UI-Probleme im linken Instruction-Panel:
1. Vertikale Scrollbar im Panel auf kleinen Bildschirmen soll entfernt werden.
2. Lange Texte (URLs, Code-Snippets) sollen nicht mehr horizontal abgeschnitten oder über den Rand hinausgeschoben werden.

---

## Bug 1: Vertikale Scrollbar im Instruction-Panel auf kleinen Bildschirmen

### Symptom
Auf mobilen Geräten oder schmalen Viewports zeigt das linke Instruction-Panel eine vertikale Scrollbar. Der Benutzer möchte, dass das Panel seine volle Höhe einnimmt und die **gesamte Seite** scrollt, nicht das Panel selbst.

### Ursache
In `InstructionPanel.tsx` hat der Inhalts-Container `overflow-y-auto`. Auf Desktop (`lg` und größer) ist dies korrekt, weil das Panel in einem Container mit fixer Höhe (`lg:h-[calc(100vh-8rem)]`) liegt. Auf kleinen Bildschirmen (`< lg`) sind die drei Spalten jedoch untereinander gestapelt, der äußere Container hat keine feste Höhe, und das Panel scrollt intern statt sich auszudehnen.

### Lösung
In `src/components/InstructionPanel.tsx` das `overflow-y-auto` auf Desktop (`lg`) beschränken:

**Alt:**
```tsx
<div className="mt-3 flex-1 overflow-y-auto overflow-x-hidden">
```

**Neu:**
```tsx
<div className="mt-3 flex-1 overflow-x-hidden lg:overflow-y-auto">
```

Damit dehnt sich das Panel auf kleinen Bildschirmen auf seine natürliche Höhe aus (keine vertikale Scrollbar mehr), während auf Desktop das bewährte Scroll-Verhalten erhalten bleibt.

---

## Bug 2: Lange Texte werden horizontal abgeschnitten oder überlappen

### Symptom
Bei bestimmten Aufgaben (z. B. HTML Aufgabe 2 "Bilder einbinden") sind Texte wie lange URLs (`https://heiligerg.github.io/WebTasks/placeholder.svg`) oder Code-Snippets im Tipp-Callout so lang, dass sie über den rechten Rand des Panels hinausgehen oder abgeschnitten werden.

### Ursache
Es gibt **vier separate Ursachen**, die zusammenwirken:

#### 2a: Callouts haben kein Word-Break
Die Callout-Boxen (`Anforderungen:`, `Tipp:`, `Wichtig:`) verwenden `not-prose`, um das Typography-Plugin auszuschließen. Dadurch greift die `break-words`-Klasse vom äußeren `prose`-Container **nicht** für den Inhalt der Callouts. Lange URLs oder Code-Snippets innerhalb der Callouts brechen nicht um.

#### 2b: Fallback-Paragraph hat kein Word-Break
Der Fallback-`<p>` in `CalloutParagraph` (für normale Paragraphen außerhalb der Callouts) hat nur `leading-relaxed`, aber kein `break-words`.

#### 2c: Links (`<a>`) haben kein Word-Break
Das `@tailwindcss/typography` Plugin stylt Links innerhalb von `.prose`, bietet aber keine `break-all`/`break-words`-Utility für `prose-a`. Lange URLs in Links brechen nicht um.

#### 2d: `<code>`-Renderer ist zu sanft
Der aktuelle Custom `code`-Renderer verwendet `break-words`, was bei sehr langen Zeichenketten ohne Leerzeichen (z. B. `src="https://heiligerg.github.io/WebTasks/placeholder.svg"`) nicht ausreicht.

### Lösung

#### In `src/components/MarkdownRenderer.tsx`:

**Callout-Container:** Allen drei Callout-Divs `break-all` hinzufügen:
```tsx
<div className="not-prose my-3 ... break-all">
```

**Fallback-Paragraph:** `break-words` hinzufügen:
```tsx
return <p className="break-words leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>;
```

**Custom `code`-Renderer:** `break-all` statt `break-words` verwenden:
```tsx
code: ({ children }) => (
  <code className="break-all rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100">
    {children}
  </code>
),
```

**Custom `a`-Renderer hinzufügen:**
```tsx
a: ({ children, href }) => (
  <a href={href} className="break-all text-blue-600 no-underline hover:underline dark:text-blue-400">
    {children}
  </a>
),
```

**Anmerkung:** Der Custom `a`-Renderer ersetzt die `prose-a` Styles. Wir behalten die gleichen visuellen Eigenschaften bei (`text-blue-600`, `hover:underline`, Dark Mode), fügen aber `break-all` hinzu.

---

## Betroffene Dateien
- `src/components/InstructionPanel.tsx`
- `src/components/MarkdownRenderer.tsx`

---

## Implementierungs-Workflow

1. **Branch erstellen:** `fix/18-instruction-panel-layout-scroll`
2. **Änderungen anwenden:**
   - `InstructionPanel.tsx`: `overflow-y-auto` → `lg:overflow-y-auto`
   - `MarkdownRenderer.tsx`: 
     - `break-all` zu allen drei Callout-`<div>`-Klassen hinzufügen
     - Fallback-`<p>`: `break-words` hinzufügen
     - `code`-Renderer: `break-all` verwenden
     - `a`-Renderer mit `break-all` hinzufügen
3. **QA durchführen:**
   - `npm run build` ausführen
   - Mobile Viewport (375px) simulieren
   - Aufgabe "Bilder einbinden" (HTML Bundle, Task 2) öffnen
   - Prüfen: Keine vertikale Scrollbar im Panel, Seite scrollt gesamt
   - Prüfen: Lange URL im Tipp-Callout bricht um und ist vollständig lesbar
   - Prüfen: Kein horizontal abgeschnittener Text
   - Desktop-Viewport prüfen: Panel scrollt vertikal weiterhin korrekt
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**

---

## Risiken

| Risiko | Mitigation |
|:---|:---|
| `break-all` bricht normale Wörter in Callouts unschön um | In Callouts stehen primär URLs und Code-Snippets, wo `break-all` akzeptabel ist. Fließtext ist selten. |
| `a`-Renderer überschreibt `prose-a` unvollständig | Der Custom-Renderer behält bewusst die identischen visuellen Eigenschaften bei. |
| `lg:overflow-y-auto` entfernt Desktop-Scrolling | Unter `lg` fehlt `overflow-y-auto`, was korrekt ist (keine fixe Höhe). Ab `lg` ist es aktiv. |
