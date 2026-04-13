import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      title={theme === 'light' ? 'Dunkles Theme aktivieren' : 'Helles Theme aktivieren'}
      aria-label={theme === 'light' ? 'Dunkles Theme aktivieren' : 'Helles Theme aktivieren'}
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
