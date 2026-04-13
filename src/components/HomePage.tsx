import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadAllBundles, getBundleUrl } from '../lib/contentLoader';
import { useAppStore } from '../stores/appStore';
import { BundleCard } from './BundleCard';
import { BadgeDisplay } from './BadgeDisplay';
import { ThemeToggle } from './ThemeToggle';
import type { Bundle } from '../types/content';

export function HomePage() {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const completedTasks = useAppStore((state) => state.completedTasks);
  const unlockedBadges = useAppStore((state) => state.unlockedBadges);

  useEffect(() => {
    loadAllBundles([
      getBundleUrl('bundle-01-html-basics'),
      getBundleUrl('bundle-02-javascript-basics'),
      getBundleUrl('bundle-03-interactive-web'),
    ])
      .then((data) => {
        setBundles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-xl font-bold text-blue-600">WebTasks</span>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <section className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 md:text-5xl">
            Willkommen bei WebTasks
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Lerne HTML, CSS und JavaScript Schritt für Schritt. Baue deine eigenen Webseiten und
            interaktiven Anwendungen – direkt im Browser, ohne Installationen.
          </p>
        </section>

        <section className="mt-10">
          <BadgeDisplay badges={unlockedBadges} />
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Deine Lernmodule</h2>
            <Link to="/certificate" className="text-sm font-medium text-blue-600 hover:underline">
              Zum Zertifikat →
            </Link>
          </div>

          {loading && <p className="mt-4 text-gray-500 dark:text-gray-400">Lade Module...</p>}

          {error && (
            <div className="mt-4 rounded border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
              <strong>Fehler:</strong> {error}
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bundles.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} completedTaskIds={completedTasks} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
