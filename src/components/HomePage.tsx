import { useEffect, useState } from 'react';
import { loadBundle } from '../lib/contentLoader';
import type { Bundle } from '../types/content';

export function HomePage() {
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBundle('/bundles/bundle-01-html-basics.json')
      .then((data) => {
        setBundle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold text-blue-600">WebTasks Platform</h1>
        <p className="mt-4 text-gray-600">Startseite kommt in Phase 6</p>

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Content-Loader Test</h2>

          {loading && <p className="mt-2 text-gray-500">Lade Canary-Bundle...</p>}

          {error && (
            <p className="mt-2 text-red-600">
              <strong>Fehler:</strong> {error}
            </p>
          )}

          {bundle && (
            <div className="mt-2 space-y-2 text-gray-700">
              <p>
                <strong>Bundle:</strong> {bundle.title}
              </p>
              <p>
                <strong>Tasks gefunden:</strong> {bundle.tasks.length}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {bundle.tasks.map((task) => (
                  <li key={task.id}>
                    {task.title} ({task.validationTests.length} Test
                    {task.validationTests.length !== 1 ? 's' : ''})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
