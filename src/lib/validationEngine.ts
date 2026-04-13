import { assembleDocument } from './codeAssembler';
import { protectLoops } from './loopProtect';
import type { Task, DomTest, ConsoleTest, FunctionTest } from '../types/content';

export type TestResult = {
  testIndex: number;
  passed: boolean;
  feedback: string;
};

export type ValidationResult = {
  success: boolean;
  results: TestResult[];
};

function toKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

export async function validateDomTest(test: DomTest, iframe: HTMLIFrameElement): Promise<TestResult> {
  // Give the iframe a moment to render the updated DOM
  await new Promise((resolve) => setTimeout(resolve, 100));
  const doc = iframe.contentDocument ?? iframe.contentWindow?.document;

  if (!doc) {
    return {
      testIndex: -1,
      passed: false,
      feedback: 'Konnte nicht auf das Vorschau-Dokument zugreifen.',
    };
  }

  const el = doc.querySelector(test.selector);

  if (!el) {
    return {
      testIndex: -1,
      passed: false,
      feedback: test.feedbackFailure,
    };
  }

  if (test.property !== undefined && test.expectedValue !== undefined) {
    const computed = doc.defaultView?.getComputedStyle(el);
    const propertyName = toKebabCase(test.property);
    const actual = computed?.getPropertyValue(propertyName) ?? '';

    if (actual !== test.expectedValue) {
      return {
        testIndex: -1,
        passed: false,
        feedback: test.feedbackFailure,
      };
    }
  }

  return {
    testIndex: -1,
    passed: true,
    feedback: test.feedbackSuccess ?? 'Test bestanden.',
  };
}

function createValidationIframe(srcDoc: string): HTMLIFrameElement {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.setAttribute('sandbox', 'allow-scripts');
  iframe.srcdoc = srcDoc;
  document.body.appendChild(iframe);
  return iframe;
}

function removeValidationIframe(iframe: HTMLIFrameElement): void {
  iframe.remove();
}

function waitForValidationMessage(iframe: HTMLIFrameElement, timeoutMs: number): Promise<unknown> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve({ type: 'TIMEOUT' });
    }, timeoutMs);

    function handler(event: MessageEvent) {
      if (event.source === iframe.contentWindow) {
        clearTimeout(timer);
        window.removeEventListener('message', handler);
        resolve(event.data);
      }
    }

    window.addEventListener('message', handler);
  });
}

export async function validateConsoleTest(
  test: ConsoleTest,
  code: { html: string; css: string; js: string }
): Promise<TestResult> {
  const srcDoc = assembleDocument({
    html: code.html,
    css: code.css,
    js: protectLoops(code.js),
  });

  const iframe = createValidationIframe(srcDoc);

  const logs: unknown[][] = [];

  // Collect all console messages from this iframe
  function collectHandler(event: MessageEvent) {
    if (
      event.source === iframe.contentWindow &&
      typeof event.data === 'object' &&
      event.data !== null
    ) {
      const msg = event.data as { type?: string; level?: string; payload?: unknown[] };
      if (msg.type === 'CONSOLE' && msg.payload) {
        logs.push(msg.payload);
      }
    }
  }

  window.addEventListener('message', collectHandler);

  // Wait for the iframe to load, execute scripts, and emit console messages
  await new Promise((resolve) => setTimeout(resolve, 500));

  window.removeEventListener('message', collectHandler);
  removeValidationIframe(iframe);

  const expected = test.expectedOutput;
  const logStrings = logs.map((entry) =>
    entry.map((item) => (typeof item === 'object' ? JSON.stringify(item) : String(item))).join(' ')
  );

  let passed = false;

  if (Array.isArray(expected)) {
    passed =
      logStrings.length >= expected.length && expected.every((exp, idx) => logStrings[idx] === exp);
  } else {
    passed = logStrings.some((str) => str === expected);
  }

  return {
    testIndex: -1,
    passed,
    feedback: passed ? (test.feedbackSuccess ?? 'Test bestanden.') : test.feedbackFailure,
  };
}

export async function validateFunctionTest(
  test: FunctionTest,
  code: { html: string; css: string; js: string }
): Promise<TestResult> {
  const validationScript = `
    (function() {
      try {
        var fn = window["${test.functionName}"];
        if (typeof fn !== "function") {
          window.parent.postMessage({ type: "VALIDATION_ERROR", error: "Function '${test.functionName}' not found" }, "*");
          return;
        }
        var result = fn.apply(null, ${JSON.stringify(test.args)});
        window.parent.postMessage({ type: "VALIDATION_RESULT", result: result }, "*");
      } catch (e) {
        window.parent.postMessage({ type: "VALIDATION_ERROR", error: e.message }, "*");
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
    const msg = response as { type: string; result?: unknown; error?: string };

    if (msg.type === 'VALIDATION_RESULT') {
      let passed = false;
      const actual = msg.result;
      const expected = test.expectedResult;

      if (
        typeof actual === 'object' &&
        actual !== null &&
        typeof expected === 'object' &&
        expected !== null
      ) {
        passed = JSON.stringify(actual) === JSON.stringify(expected);
      } else {
        passed = actual === expected;
      }

      return {
        testIndex: -1,
        passed,
        feedback: passed ? (test.feedbackSuccess ?? 'Test bestanden.') : test.feedbackFailure,
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
        feedback: 'Zeitüberschreitung bei der Funktionsprüfung.',
      };
    }
  }

  return {
    testIndex: -1,
    passed: false,
    feedback: test.feedbackFailure,
  };
}

export async function validateTask(
  task: Task,
  iframe: HTMLIFrameElement | null,
  code: { html: string; css: string; js: string }
): Promise<ValidationResult> {
  const results: TestResult[] = [];

  for (let i = 0; i < task.validationTests.length; i++) {
    const test = task.validationTests[i];
    let result: TestResult;

    switch (test.type) {
      case 'dom':
        if (!iframe) {
          result = {
            testIndex: i,
            passed: false,
            feedback: 'Vorschau-Frame nicht verfügbar für DOM-Test.',
          };
        } else {
          result = await validateDomTest(test, iframe);
        }
        break;
      case 'console':
        result = await validateConsoleTest(test, code);
        break;
      case 'function':
        result = await validateFunctionTest(test, code);
        break;
      default:
        result = {
          testIndex: i,
          passed: false,
          feedback: 'Unbekannter Test-Typ.',
        };
    }

    result.testIndex = i;
    results.push(result);
  }

  const success = results.every((r) => r.passed);

  return {
    success,
    results,
  };
}
