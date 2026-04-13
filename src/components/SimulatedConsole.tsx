import { useRef, useEffect } from 'react';

export type ConsoleLog = {
  id: string;
  level: 'log' | 'warn' | 'error';
  message: string;
  timestamp: number;
};

type SimulatedConsoleProps = {
  logs: ConsoleLog[];
  onClear?: () => void;
};

const LEVEL_COLORS: Record<ConsoleLog['level'], string> = {
  log: 'text-gray-200',
  warn: 'text-yellow-400',
  error: 'text-red-400',
};

export function SimulatedConsole({ logs, onClear }: SimulatedConsoleProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-700 bg-gray-900 shadow">
      <div className="flex items-center justify-between border-b border-gray-700 px-3 py-2">
        <span className="text-xs font-semibold text-gray-400">Konsole</span>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-gray-300"
          >
            Leeren
          </button>
        )}
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 font-mono text-sm">
        {logs.length === 0 && <p className="text-gray-600 italic">Noch keine Ausgaben...</p>}
        {logs.map((log) => (
          <div key={log.id} className={`break-words ${LEVEL_COLORS[log.level]}`}>
            <span className="mr-2 text-gray-600">
              {new Date(log.timestamp).toLocaleTimeString('de-DE', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}
