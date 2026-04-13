# Fix 05 Plan: DOM-Validierung via postMessage wegen Cross-Origin Sandbox

## Problem

HTML-Tasks (DOM-Tests) bestehen die Validierung weiterhin nicht. Der Nutzer tippt korrekten HTML-Code ein, klickt auf "Code prüfen", aber der Test schlägt fehl.

## Reproduktion (via Playwright)

1. `https://heiligerg.github.io/WebTasks/task/bundle-01-html-basics/html-basics-01` aufrufen.
2. Editor-Text auf `<h1>Hallo Welt</h1>` ändern.
3. Auf "Code prüfen" klicken.
4. Browser-Konsole zeigt:

```
SecurityError: Failed to read a named property 'document' from 'Window': 
Blocked a frame with origin "https://heiligerg.github.io" from accessing a cross-origin frame.
```

## Root Cause Analyse

In Fix 04 wurde `validateDomTest` so umgestellt, dass es ein eigenes temporäres Iframe erstellt und dann auf `iframe.contentDocument` zugreift:

```ts
const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
```

Dies funktioniert lokal (`npm run dev`) problemlos, weil beide Frames unter `localhost` laufen. Auf GitHub Pages jedoch hat das temporäre Validation-Iframe durch `sandbox="allow-scripts"` (ohne `allow-same-origin`) eine **`null`-Origin**. Die Host-Seite (`https://heiligerg.github.io`) versucht dann, auf das `document` eines Iframes mit `null`-Origin zuzugreifen – was der Browser strikt als **Cross-Origin Scripting** blockiert.

> **Wichtig:** Dieser Fehler tritt nur bei DOM-Tests auf. Console-Tests und Function-Tests funktionieren, weil sie ausschließlich über `postMessage` kommunizieren und nie direkt auf das Iframe-DOM zugreifen.

## Geplante Lösung

`validateDomTest` muss genau wie `validateFunctionTest` arbeiten: Der Test-Code wird **innerhalb** des Iframes ausgeführt, und das Ergebnis wird via `postMessage` an den Host zurückgeschickt.

### 1. `validateDomTest` neu schreiben

Statt vom Parent auf `contentDocument` zuzugreifen, injizieren wir ein Validation-Skript in das temporäre Iframe:

```ts
export async function validateDomTest(
  test: DomTest,
  code: { html: string; css: string; js: string }
): Promise<TestResult> {
  const validationScript = `
    (function() {
      try {
        var el = document.querySelector(${JSON.stringify(test.selector)});
        if (!el) {
          window.parent.postMessage({ type: 'VALIDATION_RESULT', passed: false, feedback: ${JSON.stringify(test.feedbackFailure)} }, '*');
          return;
        }
        ${test.property !== undefined && test.expectedValue !== undefined ? `
        var computed = window.getComputedStyle(el);
        var actual = computed.getPropertyValue(${JSON.stringify(toKebabCase(test.property))}) || '';
        if (actual !== ${JSON.stringify(test.expectedValue)}) {
          window.parent.postMessage({ type: 'VALIDATION_RESULT', passed: false, feedback: ${JSON.stringify(test.feedbackFailure)} }, '*');
          return;
        }
        ` : ''}
        window.parent.postMessage({ type: 'VALIDATION_RESULT', passed: true, feedback: ${JSON.stringify(test.feedbackSuccess ?? 'Test bestanden.')} }, '*');
      } catch (e) {
        window.parent.postMessage({ type: 'VALIDATION_ERROR', error: e.message }, '*');
      }
    })();
  `;

  const srcDoc = assembleDocument({
    html: code.html,
    css: code.css,
    js: protectLoops(code.js) + '\n' + validationScript,
  });

  const iframe = createValidationIframe(srcDoc);
  const response = await waitForValidationMessage(iframe, 1000);
  removeValidationIframe(iframe);

  if (typeof response === 'object' && response !== null && 'type' in response) {
    const msg = response as { type: string; passed?: boolean; feedback?: string; error?: string };

    if (msg.type === 'VALIDATION_RESULT') {
      return {
        testIndex: -1,
        passed: msg.passed ?? false,
        feedback: msg.feedback ?? (test.feedbackSuccess ?? 'Test bestanden.'),
      };
    }

    if (msg.type === 'VALIDATION_ERROR') {
      return {
        testIndex: -1,
        passed: false,
        feedback: msg.error ?? test.feedbackFailure,
      };
    }

    if (msg.type === 'TIMEOUT') {
      return {
        testIndex: -1,
        passed: false,
        feedback: 'Zeitüberschreitung bei der DOM-Prüfung.',
      };
    }
  }

  return {
    testIndex: -1,
    passed: false,
    feedback: test.feedbackFailure,
  };
}
```

### 2. `waitForValidationMessage` prüfen

Die bestehende Hilfsfunktion `waitForValidationMessage` hört auf `postMessage`-Events vom Iframe. Da der DOM-Test nun auch `postMessage` verwendet, können wir dieselbe Funktion wiederverwenden. Keine Änderung nötig.

### 3. `validateTask`

Da `validateDomTest` in Fix 04 bereits die Signatur `validateDomTest(test, code)` erhielt, muss `validateTask` nicht mehr angepasst werden. Der Aufruf bleibt:

```ts
case 'dom':
  result = await validateDomTest(test, code);
  break;
```

### 4. `TaskPage.tsx`

Keine Änderung nötig.

## Implementierungs-Tasks

| # | Task | Datei(en) |
|:-|:---|:---|
| 1 | `validateDomTest` komplett auf postMessage-basierte Prüfung innerhalb des Iframes umstellen | `src/lib/validationEngine.ts` |
| 2 | Build, Lint, TypeScript prüfen | — |
| 3 | `state/current-state.md` aktualisieren | `state/current-state.md` |

## Git-Workflow

1. **Branch erstellen:** `fix/05-dom-validation-cross-origin` (von `master`)
2. **Implementation**
3. **QA durchführen** (Build, Lint, TypeScript)
4. **Commit & Push**
5. **Merge** in `master` via `--no-ff`
6. **Branch löschen**
7. **Deployment beobachten** und Live-URL mit Playwright testen

## Testplan nach Deploy

- [ ] Task "Dein erstes HTML-Element" (Bundle 1, Task 1): `<h1>Hallo Welt</h1>` wird auf GitHub Pages bestanden
- [ ] Task "Bilder einbinden" (Bundle 1, Task 2): `<img src="...">` wird bestanden
- [ ] Task "Deine Profilkarte" (Bundle 1, Task 3): `.profile-card` und `border-radius: 50%` werden erkannt
- [ ] Keine `SecurityError`-Meldungen mehr in der Browser-Konsole bei DOM-Tests
