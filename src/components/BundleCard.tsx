import { Link } from 'react-router-dom';
import type { Bundle } from '../types/content';

type BundleCardProps = {
  bundle: Bundle;
  completedTaskIds: string[];
};

export function BundleCard({ bundle, completedTaskIds }: BundleCardProps) {
  const completedCount = bundle.tasks.filter((t) => completedTaskIds.includes(t.id)).length;
  const progress = Math.round((completedCount / bundle.tasks.length) * 100);
  const isCompleted = progress === 100;

  // Find first uncompleted task, or first task if all completed
  const firstOpenTask =
    bundle.tasks.find((t) => !completedTaskIds.includes(t.id)) ?? bundle.tasks[0];

  return (
    <Link
      to={`/task/${bundle.id}/${firstOpenTask.id}`}
      className={`flex flex-col rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md ${
        isCompleted
          ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950'
          : 'border-gray-200 bg-white hover:border-blue-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-700'
      }`}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{bundle.title}</h3>
        {isCompleted && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
            Abgeschlossen
          </span>
        )}
      </div>
      <p className="mt-2 flex-1 text-sm text-gray-600 dark:text-gray-300">{bundle.description}</p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>
            {completedCount} / {bundle.tasks.length} Aufgaben
          </span>
          <span>{progress}%</span>
        </div>
        <div className="mt-1 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-2 rounded-full transition-all ${
              isCompleted ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
        {isCompleted ? 'Wiederholen →' : 'Weiterlernen →'}
      </div>
    </Link>
  );
}
