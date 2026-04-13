import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadBundle, getBundleUrl } from '../lib/contentLoader';
import { assembleDocument } from '../lib/codeAssembler';
import { protectLoops } from '../lib/loopProtect';
import { validateTask, type ValidationResult } from '../lib/validationEngine';
import { triggerBigConfetti } from '../lib/confetti';
import { EditorPanel } from '../features/editor/EditorPanel';
import { PreviewFrame } from '../features/sandbox/PreviewFrame';
import { SimulatedConsole, type ConsoleLog } from './SimulatedConsole';
import { InstructionPanel } from './InstructionPanel';
import { useAppStore } from '../stores/appStore';
import { ThemeToggle } from './ThemeToggle';
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
  const completedTasks = useAppStore((state) => state.completedTasks);
  const markTaskCompleted = useAppStore((state) => state.markTaskCompleted);
  const setTaskResult = useAppStore((state) => state.setTaskResult);
  const unlockBadge = useAppStore((state) => state.unlockBadge);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setBundle(null);
    setTask(null);
    setConsoleLogs([]);
    setValidationResult(null);

    if (!bundleId) {
      setError('Bundle ID fehlt.');
      setLoading(false);
      return;
    }
    const bundleUrl = getBundleUrl(bundleId);
    loadBundle(bundleUrl)
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

  // Clear console whenever the preview iframe reloads with new code
  useEffect(() => {
    setConsoleLogs([]);
  }, [debouncedCode]);

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

    const result = await validateTask(task, currentCode);
    setValidationResult(result);
    setTaskResult(task.id, result.success);

    if (result.success) {
      markTaskCompleted(task.id);

      if (bundle) {
        const allCompleted = bundle.tasks.every((t) => [...completedTasks, task.id].includes(t.id));
        if (allCompleted) {
          unlockBadge(bundle.badgeName);
          triggerBigConfetti();
        }
      }
    }

    setValidating(false);
  }, [task, currentCode, markTaskCompleted, setTaskResult, bundle, completedTasks, unlockBadge]);

  const prevTask = useMemo(() => {
    if (!bundle || !task) return null;
    const idx = bundle.tasks.findIndex((t) => t.id === task.id);
    return idx > 0 ? bundle.tasks[idx - 1] : null;
  }, [bundle, task]);

  const nextTask = useMemo(() => {
    if (!bundle || !task) return null;
    const idx = bundle.tasks.findIndex((t) => t.id === task.id);
    return idx >= 0 && idx < bundle.tasks.length - 1 ? bundle.tasks[idx + 1] : null;
  }, [bundle, task]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:px-6 print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="text-lg font-bold text-blue-600 hover:text-blue-700">
            WebTasks
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden text-sm text-gray-600 hover:text-gray-900 hover:underline dark:text-gray-300 dark:hover:text-gray-100 sm:block"
            >
              ← Zurück zur Übersicht
            </Link>
            {bundle && task && (
              <nav className="hidden text-sm text-gray-600 dark:text-gray-300 md:block">
                {bundle.title} <span className="mx-2 text-gray-400 dark:text-gray-500">/</span> {task.title}
              </nav>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          {loading && <p className="text-gray-600 dark:text-gray-300">Lade Aufgabe...</p>}

          {error && (
            <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
              <strong>Fehler:</strong> {error}
            </div>
          )}

          {task && bundle && (
            <div className="flex flex-col gap-4 lg:h-[calc(100vh-8rem)] lg:flex-row">
              {/* Left: Instruction */}
              <div className="flex flex-col lg:w-[30%]">
                <InstructionPanel
                  title={task.title}
                  instruction={task.instruction}
                  onValidate={handleValidate}
                  validating={validating}
                  validationResult={validationResult}
                />

                <div className="mt-3 flex items-center justify-between print:hidden">
                  {prevTask ? (
                    <Link
                      to={`/task/${bundle.id}/${prevTask.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      ← Vorherige Aufgabe
                    </Link>
                  ) : (
                    <span />
                  )}
                  {nextTask ? (
                    <Link
                      to={`/task/${bundle.id}/${nextTask.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Nächste Aufgabe →
                    </Link>
                  ) : (
                    <span />
                  )}
                </div>
              </div>

              {/* Middle: Editor */}
              <div className="flex flex-col lg:w-[40%]">
                <div className="flex-1 rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                  <EditorPanel
                    taskId={task.id}
                    enabledEditors={task.enabledEditors}
                    initialCode={task.initialCode}
                  />
                </div>
              </div>

              {/* Right: Preview + Console */}
              <div className="flex flex-col gap-4 lg:w-[30%]">
                <div className="flex-[2] rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                  <PreviewFrame
                    ref={previewRef}
                    srcDoc={srcDoc}
                    onMessage={handleFrameMessage}
                    className="h-full w-full rounded border border-gray-300 bg-white dark:border-gray-700"
                  />
                </div>
                <div className="min-h-[180px] flex-1">
                  <SimulatedConsole logs={consoleLogs} onClear={clearConsole} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
