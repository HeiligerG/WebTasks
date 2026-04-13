import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadBundle } from '../lib/contentLoader';
import { EditorPanel } from '../features/editor/EditorPanel';
import type { Bundle, Task } from '../types/content';

export function TaskPage() {
  const { bundleId, taskId } = useParams<{ bundleId: string; taskId: string }>();
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setBundle(null);
    setTask(null);

    // For Phase 3 we load the known canary bundle;
    // later this will be resolved dynamically via bundleId.
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        {loading && <p className="text-gray-600">Lade Aufgabe...</p>}

        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
            <strong>Fehler:</strong> {error}
          </div>
        )}

        {task && bundle && (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
              <p className="mt-1 text-sm text-gray-500">
                Bundle: {bundle.title} | Task-ID: {task.id}
              </p>
            </div>

            <div className="h-[500px] rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <EditorPanel
                taskId={task.id}
                enabledEditors={task.enabledEditors}
                initialCode={task.initialCode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
