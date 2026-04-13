import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadAllBundles } from '../lib/contentLoader';
import { useAppStore } from '../stores/appStore';
import type { Bundle } from '../types/content';

export function CertificatePage() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const completedTasks = useAppStore((state) => state.completedTasks);
  const unlockedBadges = useAppStore((state) => state.unlockedBadges);

  useEffect(() => {
    loadAllBundles(['/bundles/bundle-01-html-basics.json'])
      .then((data) => setBundles(data))
      .catch(() => setBundles([]));
  }, []);

  const completedBundles = bundles.filter((bundle) =>
    bundle.tasks.every((t) => completedTasks.includes(t.id))
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-4 shadow-sm md:px-6 print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
            WebTasks
          </Link>
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:underline">
              ← Zurück zur Übersicht
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <div className="rounded-2xl border-4 border-blue-200 bg-white p-8 text-center shadow-lg md:p-16">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600 md:h-20 md:w-20">
            🎓
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 md:text-5xl">
            Teilnahmezertifikat
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            Herzlichen Glückwunsch zum Abschluss deines Schnuppertages bei WebTasks!
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Gelöste Aufgaben</p>
              <p className="text-2xl font-bold text-gray-800">{completedTasks.length}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Abgeschlossene Module</p>
              <p className="text-2xl font-bold text-gray-800">{completedBundles.length}</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Erhaltene Abzeichen</p>
              <p className="text-2xl font-bold text-gray-800">{unlockedBadges.length}</p>
            </div>
          </div>

          {unlockedBadges.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-medium text-gray-600">Erhaltene Abzeichen</p>
              <div className="mt-3 flex flex-wrap justify-center gap-3">
                {unlockedBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-yellow-300 bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800"
                  >
                    🏅 {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {completedBundles.length > 0 && (
            <div className="mt-8 text-left">
              <p className="text-sm font-medium text-gray-600">Abgeschlossene Module</p>
              <ul className="mt-2 space-y-1 text-gray-700">
                {completedBundles.map((bundle) => (
                  <li key={bundle.id}>✅ {bundle.title}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="rounded bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Zertifikat drucken
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
