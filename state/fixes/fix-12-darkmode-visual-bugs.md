# Fix 12: Dark Mode Visual Bugs

## Ziel
Behebung von zwei visuellen Dark-Mode-Fehlern, die die Lesbarkeit der Instruktionen und die Sichtbarkeit der Live-Preview beeinträchtigen.

---

## Bug 1: Instruktions-Text im Dark Mode zu dunkel

### Symptom
Die normalen Paragraphen im Erklärungstext der `InstructionPanel`-Komponente sind im Dark Mode kaum lesbar (erscheinen dunkel statt hell).

### Ursache
`MarkdownRenderer.tsx` verwendet einen Custom `p`-Renderer (`CalloutParagraph`). Normale Paragraphen (die keine Callouts sind) werden als `<p className="leading-relaxed">{children}</p>` gerendert. Dieses `<p>` hat keine explizite Textfarbe. Obwohl der äußere `prose`-Container `dark:prose-p:text-gray-300` definiert, greift die Tailwind-Typography-Plugin-Klasse bei Custom Components nicht zuverlässig, sodass der Paragraph im Dark Mode eine dunkle Standardfarbe erbt.

### Lösung
Dem Fallback-Paragraph in `CalloutParagraph` explizite Farbklassen hinzufügen:

```tsx
return <p className="leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>;
```

### Betroffene Datei
- `src/components/MarkdownRenderer.tsx`

---

## Bug 2: Live-Preview iframe im Dark Mode zu dunkel

### Symptom
Im Dark Mode ist der Inhalt des Live-Preview iframes kaum sichtbar, weil der iframe-Hintergrund selbst sehr dunkel ist. Die meisten Schüler-Aufgaben setzen keinen expliziten weißen Hintergrund im `<body>`, wodurch Text und Elemente im Preview verschwinden.

### Ursache
In `TaskPage.tsx` hat das `PreviewFrame`-iframe die Klasse:
```
bg-white dark:border-gray-700 dark:bg-gray-950
```
Die Klasse `dark:bg-gray-950` färbt den iframe-Hintergrund im Dark Mode fast schwarz. Da der Preview die Ausgabe des Schüler-Codes zeigt – der typischerweise für einen hellen Hintergrund geschrieben ist – muss der iframe selbst immer hell bleiben.

### Lösung
Die Dark-Mode-Hintergrundfarbe vom iframe entfernen, sodass es immer weiß bleibt:

**Alt:**
```tsx
className="h-full w-full rounded border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950"
```

**Neu:**
```tsx
className="h-full w-full rounded border border-gray-300 bg-white dark:border-gray-700"
```

### Betroffene Datei
- `src/components/TaskPage.tsx`

---

## Implementierungs-Workflow

1. **Branch erstellen:** `fix/12-darkmode-visual-bugs`
2. **Änderungen anwenden:**
   - `src/components/MarkdownRenderer.tsx`: `text-gray-700 dark:text-gray-300` zum Fallback-`<p>` hinzufügen
   - `src/components/TaskPage.tsx`: `dark:bg-gray-950` vom `PreviewFrame`-`className` entfernen
3. **QA durchführen:**
   - `npm run build` ausführen
   - Visuell prüfen: Instruktionstext im Dark Mode hellgrau
   - Visuell prüfen: Live-Preview iframe im Dark Mode weißer Hintergrund
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**

---

## Risiken

| Risiko | Mitigation |
|:---|:---|
| Tailwind-Klassen konfliktieren mit `prose` | Wir setzen die Farbe nur auf dem Fallback-`<p>`, Callouts behalten ihre eigenen Farben. |
| iframe-Änderung betrifft Light Mode | `bg-white` bleibt unverändert, nur die Dark-Variante wird entfernt. |
