# Fix 17: Instruction Panel Horizontal Scrollbar

## Ziel
Behebung der horizontalen Scrollbar im linken Instruction-Panel auf kleinen Bildschirmen.

---

## Symptom
Auf mobilen Geräten oder schmalen Viewports zeigt das linke Instruction-Panel (da wo "Anforderungen", "Tipp" etc. stehen) eine horizontale Scrollbar an. Lange Code-Blöcke oder URLs überschreiten den rechten Rand des Panels.

---

## Ursache
In Flexbox-Containern haben Items standardmäßig `min-width: auto`. Das bedeutet, sie dürfen nicht kleiner werden als ihr breitester Inhalt. Lange `<pre>`-Code-Blöcke oder URLs im Instruction-Panel erzwingen dadurch eine horizontale Scrollbar, obwohl `overflow-x-hidden` bereits auf dem inneren Scroll-Container gesetzt wurde. Zusätzlich fehlt den Flex-Spalten in `TaskPage.tsx` und dem `InstructionPanel` selbst ein `min-w-0`, das dieses Verhalten korrigieren würde.

---

## Lösung

### Schritt 1: Flex-Spalte in TaskPage schrumpfen lassen
In `src/components/TaskPage.tsx` der linken Spalte `min-w-0` hinzufügen:

**Alt:**
```tsx
<div className="flex flex-col lg:w-[30%]">
```

**Neu:**
```tsx
<div className="flex min-w-0 flex-col lg:w-[30%]">
```

### Schritt 2: InstructionPanel schrumpfen lassen
In `src/components/InstructionPanel.tsx` dem äußersten Container `min-w-0` hinzufügen:

**Alt:**
```tsx
<div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
```

**Neu:**
```tsx
<div className="flex h-full min-w-0 flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
```

### Schritt 3: Code-Blöcke intern scrollen lassen
In `src/components/MarkdownRenderer.tsx` einen expliziten `<pre>`-Renderer hinzufügen, der `overflow-x-auto` und `max-w-full` erzwingt. Damit scrollen lange Code-Blöcke intern statt das Panel zu sprengen.

**Alt:**
```tsx
components={{
  p: CalloutParagraph,
  code: ({ children }) => (
    <code className="break-words rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100">
      {children}
    </code>
  ),
}}
```

**Neu:**
```tsx
components={{
  p: CalloutParagraph,
  code: ({ children }) => (
    <code className="break-words rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="overflow-x-auto max-w-full rounded-lg bg-gray-900 p-4 text-sm text-gray-100 dark:bg-gray-950">
      {children}
    </pre>
  ),
}}
```

---

## Betroffene Dateien
- `src/components/TaskPage.tsx`
- `src/components/InstructionPanel.tsx`
- `src/components/MarkdownRenderer.tsx`

---

## Implementierungs-Workflow

1. **Branch erstellen:** `fix/17-instruction-panel-horizontal-scroll`
2. **Änderungen anwenden:**
   - `TaskPage.tsx`: `min-w-0` zur linken Spalte hinzufügen
   - `InstructionPanel.tsx`: `min-w-0` zum äußersten Container hinzufügen
   - `MarkdownRenderer.tsx`: `<pre>`-Renderer mit `overflow-x-auto max-w-full` hinzufügen
3. **QA durchführen:**
   - `npm run build` ausführen
   - Browser-DevTools: Mobile Viewport (z. B. 375px) simulieren
   - Aufgabe mit langen Code-Blöcken öffnen (z. B. "Bilder einbinden")
   - Prüfen: Keine horizontale Scrollbar im linken Panel
   - Prüfen: Code-Blöcke sind intern horizontal scrollbar, nicht das Panel
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**

---

## Risiken

| Risiko | Mitigation |
|:---|:---|
| `min-w-0` schneidet erwünschten Inhalt ab | Inhalt wird nicht abgeschnitten, er bricht nur um oder scrollt intern (`pre`). |
| `<pre>`-Renderer überschreibt `prose-pre` unvollständig | Der Custom-Renderer enthält bewusst die gleichen visuellen Attribute wie `prose-pre`, plus `overflow-x-auto`. |
