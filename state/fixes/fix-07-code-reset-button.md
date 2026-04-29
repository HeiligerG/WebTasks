# Fix 07 Plan: "Code zurücksetzen"-Button im EditorPanel

## Problem

Ein Nutzer berichtet, dass in der HTML-Aufgabe "Bilder einbinden" (Bundle 1, Task 2) unvollständiger oder veralteter Code im Editor steht:

```html
<img src="data:image/svg+xml;base64,..." alt="Beispielbild"
```

Das abschließende `>` fehlt, und der Task wird fälschlicherweise bereits als "gelöst" angezeigt.

## Root Cause Analyse

Die WebTasks-Plattform speichert den Editor-Code in `localStorage` via Zustands `persist` Middleware. Das `EditorPanel` lädt den Code folgendermaßen:

```tsx
if (codeSnippets[taskId]?.[lang] === undefined) {
  setCode(taskId, lang, initialCode[lang]);
}
```

**Das Verhalten:** Sobald ein Nutzer einmal Code für einen Task eingegeben hat, wird dieser Wert persistiert. Wenn später:

- das Bundle aktualisiert wird (z. B. Fix 06: neuer `initialCode` mit Base64-Bild),
- oder der Nutzer unvollständigen Code eingetippt und die Seite neu geladen hat,

bleibt der alte/unvollständige Code im Editor stehen. Es gibt derzeit **keine Möglichkeit** für den Nutzer, auf den ursprünglichen `initialCode` zurückzukehren, ohne die Browser-DevTools zu öffnen und `localStorage` manuell zu löschen.

## Geplante Lösung

Ein **"Code zurücksetzen"-Button** wird im `EditorPanel` hinzugefügt. Dieser Button setzt den Code der aktuellen Task für alle aktivierten Sprachen (Tabs) auf den ursprünglichen `initialCode` zurück.

### 1. Store erweitern (`src/stores/appStore.ts`)

Neue Action `resetCode(taskId: string, initialCode: { html: string; css: string; js: string })` hinzufügen:

```ts
resetCode: (taskId, initialCode) =>
  set((state) => ({
    codeSnippets: {
      ...state.codeSnippets,
      [taskId]: { ...initialCode },
    },
  })),
```

### 2. `EditorPanel` erweitern (`src/features/editor/EditorPanel.tsx`)

- Import von `resetCode` aus dem Store.
- Eine kleine Reset-Schaltfläche im UI platzieren – am besten unterhalb der Tabs oder als Icon-Button in der Tab-Leiste rechts.
- Bei Klick: `resetCode(taskId, initialCode)` aufrufen.

**Platzierungsvorschlag:** Unterhalb der Editor-Tabs, rechtsbündig:

```tsx
<div className="flex items-center justify-between border-b border-gray-700 px-3 py-1">
  {/* Tabs links */}
  <div className="flex">
    {enabledEditors.map(...)}
  </div>
  {/* Reset-Button rechts */}
  <button
    type="button"
    onClick={handleReset}
    className="text-xs text-gray-500 hover:text-gray-300"
    title="Code auf den Ausgangszustand zurücksetzen"
  >
    ↺ Zurücksetzen
  </button>
</div>
```

### 3. Keine Änderungen an den Bundles nötig

Dies ist ein reiner Client-UI-Fix. Die JSON-Bundles bleiben unverändert.

## Implementierungs-Tasks

| #   | Task                                           | Datei(en)                             |
| :-- | :--------------------------------------------- | :------------------------------------ |
| 1   | `resetCode`-Action zu `appStore.ts` hinzufügen | `src/stores/appStore.ts`              |
| 2   | Reset-Button in `EditorPanel` integrieren      | `src/features/editor/EditorPanel.tsx` |
| 3   | Build, Lint, TypeScript prüfen                 | —                                     |
| 4   | `state/current-state.md` aktualisieren         | `state/current-state.md`              |

## Git-Workflow

1. **Branch erstellen:** `fix/07-code-reset-button` (von `master`)
2. **Implementation**
3. **QA durchführen** (Build, Lint, TypeScript, lokaler Smoke-Test)
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**
7. **Deployment beobachten**

## Testplan nach Deploy

- [ ] Eine HTML-Task öffnen, Code im Editor ändern, Seite neu laden → geänderter Code bleibt erhalten.
- [ ] Auf "↺ Zurücksetzen" klicken → Code springt zurück auf den ursprünglichen `initialCode`.
- [ ] Nach dem Zurücksetzen auf "Code prüfen" klicken → Validierung läuft gegen den frischen `initialCode`.
- [ ] Für Multi-Editor-Tasks (HTML + CSS) werden beide Tabs zurückgesetzt.
