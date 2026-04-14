# Fix 16: Instruction Panel Horizontal Scrollbar

## Ziel
Behebung der horizontalen Scrollbar im linken Instruction-Panel auf kleinen Bildschirmen.

---

## Symptom
Auf mobilen Geräten oder schmalen Viewports zeigt das linke Panel (Anforderungen, Tipp, Instruktionen) eine horizontale Scrollbar an. Lange URLs (z. B. `https://heiligerg.github.io/WebTasks/placeholder.svg`) oder Inline-Code-Blöcke (`<img>`) laufen über den rechten Rand hinaus.

---

## Ursache
Das InstructionPanel hat einen scrollbaren Bereich (`overflow-y-auto`), aber keinen Schutz gegen horizontalen Overflow. Lange Wörter in URLs, Code-Elementen oder Bildbeschreibungen brechen nicht automatisch um, weil weder das Panel noch der `MarkdownRenderer` ein explizites `overflow-wrap: break-word` oder `word-break: break-word` definiert.

---

## Lösung

### Schritt 1: InstructionPanel vor horizontalem Overflow schützen
In `src/components/InstructionPanel.tsx` dem scrollbaren Inhalts-Container `overflow-x-hidden` hinzufügen, damit er nie horizontal scrollt:

**Alt:**
```tsx
<div className="mt-3 flex-1 overflow-y-auto">
```

**Neu:**
```tsx
<div className="mt-3 flex-1 overflow-y-auto overflow-x-hidden">
```

### Schritt 2: Markdown-Inhalt umbrechen lassen
In `src/components/MarkdownRenderer.tsx` dem `prose`-Container die Klasse `break-words` hinzufügen, damit lange Wörter (URLs, Code) innerhalb der verfügbaren Breite umgebrochen werden:

**Alt:**
```tsx
className={`prose prose-sm max-w-none ...`}
```

**Neu:**
```tsx
className={`prose prose-sm max-w-none break-words ...`}
```

Zusätzlich dem `code`-Override in `ReactMarkdown components` ein `break-all` oder `break-words` geben, falls `prose-code` weiterhin überläuft:

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

**Anmerkung:** Falls `prose-code:rounded` etc. bereits ausreichen, kann der explizite `code`-Renderer entfallen. `break-words` auf dem Container ist meist ausreichend.

---

## Betroffene Dateien
- `src/components/InstructionPanel.tsx`
- `src/components/MarkdownRenderer.tsx`

---

## Implementierungs-Workflow

1. **Branch erstellen:** `fix/16-instruction-panel-scrollbar`
2. **Änderungen anwenden:**
   - `InstructionPanel.tsx`: `overflow-x-hidden` zum scrollbaren Container hinzufügen
   - `MarkdownRenderer.tsx`: `break-words` zur `prose`-Klasse hinzufügen; ggf. `code`-Renderer mit `break-words`
3. **QA durchführen:**
   - `npm run build` ausführen
   - Browser-DevTools: Mobile Viewport (z. B. 375px) simulieren
   - Aufgabe mit langen URLs/Tags öffnen (z. B. "Bilder einbinden")
   - Prüfen: Keine horizontale Scrollbar im linken Panel, Text bricht sauber um
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**

---

## Risiken

| Risiko | Mitigation |
|:---|:---|
| `overflow-x-hidden` schneidet sichtbaren Inhalt ab | In Kombination mit `break-words` bricht der Text um, bevor er abgeschnitten wird. |
| `break-words` beeinflusst Code-Readability negativ | URLs und lange Tags müssen sowieso umbrechen; `break-words` ist sanfter als `break-all`. |
