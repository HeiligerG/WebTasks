import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { loadBundle } from '../lib/contentLoader';
import { assembleDocument } from '../lib/codeAssembler';
import { protectLoops } from '../lib/loopProtect';
import { validateTask, type ValidationResult } from '../lib/validationEngine';
import { EditorPanel } from '../features/editor/EditorPanel';
import { PreviewFrame } from '../features/sandbox/PreviewFrame';
import { SimulatedConsole, type ConsoleLog } from './SimulatedConsole';
import { useAppStore } from '../stores/appStore';
import { useDebounce } from '../hooks/useDebounce';
import type { Bundle, Task } from '../types/content';

export function TaskPage() {
  const { bundleId, taskId } = useParams<{ bundleId: string; taskId: string }>();
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [validating, setValidating] = useState(false);

  const previewRef = useRef<HTMLIFrameElement>(null);
  const codeSnippets = useAppStore((state) => state.codeSnippets);
  const markTaskCompleted = useAppStore((state) => state.markTaskCompleted);
  const setTaskResult = useAppStore((state) => state.setTaskResult);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setBundle(null);
    setTask(null);
    setConsoleLogs([]);
    setValidationResult(null);

    loadBundle('/bundles/bundle-01-html-basics.json')
      .then((data) => {
        setBundle(data);
        const found = data.tasks.find((t) => t.id === taskId);
        if (found) {
          setTask(found);
        } else {
          setError(`Task "${taskId}" not found in bundle "${data.title}".`);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
  }, [bundleId, taskId]);

  const currentCode = useMemo(
    () =>
      task
        ? {
            html: codeSnippets[task.id]?.html ?? task.initialCode.html,
            css: codeSnippets[task.id]?.css ?? task.initialCode.css,
            js: codeSnippets[task.id]?.js ?? task.initialCode.js,
          }
        : { html: '', css: '', js: '' },
    [task, codeSnippets]
  );

  const debouncedCode = useDebounce(currentCode, 500);

  const srcDoc = assembleDocument({
    html: debouncedCode.html,
    css: debouncedCode.css,
    js: protectLoops(debouncedCode.js),
  });

  const handleFrameMessage = useCallback((message: unknown) => {
    if (typeof message !== 'object' || message === null) return;
    const msg = message as { type?: string; level?: string; payload?: unknown };

    if (msg.type === 'CONSOLE' && typeof msg.level === 'string') {
      let text = '';
      if (Array.isArray(msg.payload)) {
        text = msg.payload
          .map((item) => (typeof item === 'object' ? JSON.stringify(item) : String(item)))
          .join(' ');
      } else {
        text = String(msg.payload);
      }

      setConsoleLogs((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          level: msg.level as ConsoleLog['level'],
          message: text,
          timestamp: Date.now(),
        },
      ]);
    } else if (msg.type === 'ERROR') {
      const errPayload = msg.payload as { message?: string } | undefined;
      setConsoleLogs((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          level: 'error',
          message: errPayload?.message ?? 'Unknown error in iframe',
          timestamp: Date.now(),
        },
      ]);
    }
  }, []);

  const clearConsole = useCallback(() => {
    setConsoleLogs([]);
  }, []);

  const handleValidate = useCallback(async () => {
    if (!task) return;
    setValidating(true);
    setValidationResult(null);

    const result = await validateTask(task, previewRef.current, currentCode);
    setValidationResult(result);
    setTaskResult(task.id, result.success);

    if (result.success) {
      markTaskCompleted(task.id);
    }

    setValidating(false);
  }, [task, currentCode, markTaskCompleted, setTaskResult]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        {loading && <p className="text-gray-600">Lade Aufgabe...</p>}

        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
            <strong>Fehler:</strong> {error}
          </div>
        )}

        {task && bundle && (
          <>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h1 className="text-xl font-bold text-gray-800 md:text-2xl">{task.title}</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Bundle: {bundle.title} | Task-ID: {task.id}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleValidate}
                  disabled={validating}
                  className="rounded bg-green-600 px-5 py-2 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
                >
                  {validating ? 'Prüfe...' : 'Code prüfen'}
                </button>
              </div>
            </div>

            {validationResult && (
              <div className="space-y-2">
                {validationResult.success ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
                    <strong>Super!</strong> Alle Tests bestanden.
                  </div>
                ) : (
                  validationResult.results
                    .filter((r) => !r.passed)
                    .map((r, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
                      >
                        <strong>Test {r.testIndex + 1} fehlgeschlagen:</strong> {r.feedback}
                      </div>
                    ))
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="h-[400px] rounded-lg border border-gray-200 bg-white p-3 shadow-sm md:h-[500px]">
                <EditorPanel
                  taskId={task.id}
                  enabledEditors={task.enabledEditors}
                  initialCode={task.initialCode}
                />
              </div>

              <div className="h-[400px] rounded-lg border border-gray-200 bg-white p-3 shadow-sm md:h-[500px]">
                <PreviewFrame
                  ref={previewRef}
                  srcDoc={srcDoc}
                  onMessage={handleFrameMessage}
                  className="h-full w-full rounded border border-gray-300 bg-white"
                />
              </div>
            </div>

            <div className="h-[200px]">
              <SimulatedConsole logs={consoleLogs} onClear={clearConsole} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
