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

export async function validateDomTest(
  test: DomTest,
  code: { html: string; css: string; js: string }
): Promise<TestResult> {
  const propertyCheck =
    test.property !== undefined && test.expectedValue !== undefined
      ? `
        var computed = window.getComputedStyle(el);
        var actual = computed.getPropertyValue(${JSON.stringify(toKebabCase(test.property))}) || '';
        if (actual !== ${JSON.stringify(test.expectedValue)}) {
          window.parent.postMessage({ type: 'VALIDATION_RESULT', passed: false, feedback: ${JSON.stringify(test.feedbackFailure)} }, '*');
          return;
        }
      `
      : '';

  const textCheck =
    test.expectedText !== undefined
      ? `
      var text = el.textContent ? el.textContent.trim() : '';
      if (text !== ${JSON.stringify(test.expectedText)}) {
        window.parent.postMessage({ type: 'VALIDATION_RESULT', passed: false, feedback: ${JSON.stringify(test.feedbackFailure)} }, '*');
        return;
      }
    `
      : '';

  const containsCheck =
    test.expectedTextContains !== undefined
      ? `
      var text = el.textContent ? el.textContent : '';
      if (!text.includes(${JSON.stringify(test.expectedTextContains)})) {
        window.parent.postMessage({ type: 'VALIDATION_RESULT', passed: false, feedback: ${JSON.stringify(test.feedbackFailure)} }, '*');
        return;
       }
     `
       : '';

  const attributesCheck = test.requiredAttributes !== undefined && test.requiredAttributes.length > 0
    ? `
      ${test.requiredAttributes.map(attr => `
        if (!el.hasAttribute(${JSON.stringify(attr)})) {
          window.parent.postMessage({ type: 'VALIDATION_RESULT', passed: false, feedback: ${JSON.stringify(test.feedbackFailure)} }, '*');
          return;
        }
      `).join('')}
    `
    : '';

  const emptyCheck =
    test.shouldBeEmpty !== undefined
      ? `
      var hasContent = el.children.length > 0 || (el.textContent ? el.textContent.trim() !== '' : false);
      if ((test.shouldBeEmpty && hasContent) || (!test.shouldBeEmpty && !hasContent)) {
        window.parent.postMessage({ type: 'VALIDATION_RESULT', passed: false, feedback: ${JSON.stringify(test.feedbackFailure)} }, '*');
        return;
      }
    `
      : '';

  const validationScript = `
    (function() {
      try {
        var el = document.querySelector(${JSON.stringify(test.selector)});
        if (!el) {
          window.parent.postMessage({ type: 'VALIDATION_RESULT', passed: false, feedback: ${JSON.stringify(test.feedbackFailure)} }, '*');
          return;
        }
        ${propertyCheck}
        ${textCheck}
        ${containsCheck}
        ${attributesCheck}
        ${emptyCheck}
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
        feedback: msg.feedback ?? test.feedbackSuccess ?? 'Test bestanden.',
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
  code: { html: string; css: string; js: string }
): Promise<ValidationResult> {
  const results: TestResult[] = [];

  for (let i = 0; i < task.validationTests.length; i++) {
    const test = task.validationTests[i];
    let result: TestResult;

    switch (test.type) {
      case 'dom':
        result = await validateDomTest(test, code);
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
