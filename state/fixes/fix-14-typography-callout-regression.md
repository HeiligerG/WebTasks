# Fix 14: Typography Plugin Callout Regression

## Ziel
Behebung visueller Regressionen in den Markdown-Callouts (`Anforderungen:`, `Tipp:`, `Wichtig:`), die durch die Installation des `@tailwindcss/typography` Plugins (Fix 13) entstanden sind.

---

## Symptom
Nach Installation des `@tailwindcss/typography` Plugins sind die Callouts in den Aufgabenbeschreibungen visuell durcheinander:
- Inline-Code-Elemente (z. B. `` `istVolljaehrig(alter)` ``) innerhalb der blauen/gelben/orangen Callout-Boxen erhalten einen grauen bzw. dunkelgrauen Hintergrund, der sich mit den Callout-Farben beißt.
- Die `prose`-Styles (Padding, Margin, Farben) des Typography-Plugins greifen auf Elemente innerhalb der Callouts zu und zerstören deren kompaktes, einheitliches Erscheinungsbild.

---

## Ursache
`MarkdownRenderer.tsx` wickelt den gesamten Inhalt in einen `.prose`-Container. Der Custom `<p>`-Renderer (`CalloutParagraph`) rendert zwar die Callouts als eigene `<div>`-Boxen, aber diese liegen logisch weiterhin innerhalb von `.prose`. Das `@tailwindcss/typography` Plugin wendet daher seine Reset- und Styling-Regeln (insbesondere für `code`, `ul`, `ol`, `li`, `p`) auch auf die Callout-Inhalte an und überschreibt/überlagert deren beabsichtigte Styles.

---

## Lösung
Die Callout-Container vom `prose`-Styling ausschließen, indem jedem Callout-`<div>` die Tailwind-Klasse `not-prose` hinzugefügt wird.

**Betroffene Stelle in `src/components/MarkdownRenderer.tsx`:**
- `CalloutParagraph` → `Tipp:`-Branch
- `CalloutParagraph` → `Anforderungen:`-Branch
- `CalloutParagraph` → `Wichtig:`-Branch

**Änderung (für alle drei Callout-Typen identisch):**
```tsx
// Alt
<div className="my-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200">

// Neu
<div className="not-prose my-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200">
```

**Effekt:**
- Das Typography-Plugin ignoriert alle Kinder des Callouts.
- Inline-Code fällt auf Browser-Defaults zurück (Monospace, transparent/erbt), was innerhalb der farbigen Callouts deutlich besser aussieht.
- Listen und Paragraphen innerhalb der Callouts erhalten keine unerwünschten `prose`-Margins mehr.
- Listen und Texte **außerhalb** der Callouts bleiben vom Typography-Plugin korrekt gestylt (inklusive `dark:prose-ul:text-gray-300`).

---

## Betroffene Datei
- `src/components/MarkdownRenderer.tsx`

---

## Implementierungs-Workflow

1. **Branch erstellen:** `fix/14-typography-callout-regression`
2. **Änderung anwenden:**
   - `src/components/MarkdownRenderer.tsx`: `not-prose` zu den drei Callout-`<div>`-Klassen hinzufügen
3. **QA durchführen:**
   - `npm run build` ausführen
   - Visuell prüfen (Light Mode): Callouts haben keine grauen Code-Hintergründe mehr
   - Visuell prüfen (Dark Mode): Callouts haben keine dunklen Code-Hintergründe mehr, Text bleibt lesbar
   - Visuell prüfen (Dark Mode): Listen außerhalb der Callouts bleiben hellgrau
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**

---

## Risiken

| Risiko | Mitigation |
|:---|:---|
| `not-prose` entfernt zu viele Styles (z. B. `<code>`-Monospace) | Browser-Defaults für `<code>` und `<strong>` sind ausreichend für Callouts. |
| Listen innerhalb von Callouts verlieren Bullet-Points | In Markdown können Listen nicht innerhalb von `<p>` liegen; sie werden sowieso außerhalb gerendert. |
