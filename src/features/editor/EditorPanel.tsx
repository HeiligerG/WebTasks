import { useState, useEffect } from 'react';
import { CodeEditor } from '../../components/CodeEditor';
import { useAppStore } from '../../stores/appStore';
import type { Task } from '../../types/content';

type EditorPanelProps = {
  taskId: string;
  enabledEditors: Task['enabledEditors'];
  initialCode: Task['initialCode'];
};

const TAB_LABELS: Record<string, string> = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript',
};

export function EditorPanel({ taskId, enabledEditors, initialCode }: EditorPanelProps) {
  const [activeTab, setActiveTab] = useState(enabledEditors[0] ?? 'html');
  const codeSnippets = useAppStore((state) => state.codeSnippets);
  const setCode = useAppStore((state) => state.setCode);
  const resetCode = useAppStore((state) => state.resetCode);

  useEffect(() => {
    // Ensure each enabled editor has a value in the store
    enabledEditors.forEach((lang) => {
      const current = codeSnippets[taskId]?.[lang];
      if (current === undefined) {
        setCode(taskId, lang, initialCode[lang]);
      }
    });
    // Reset active tab if current one is not enabled
    if (!enabledEditors.includes(activeTab)) {
      setActiveTab(enabledEditors[0] ?? 'html');
    }
  }, [taskId, enabledEditors, initialCode, codeSnippets, setCode, activeTab]);

  const handleChange = (language: typeof activeTab, value: string) => {
    setCode(taskId, language, value);
  };

  const handleReset = () => {
    resetCode(taskId, initialCode);
  };

  const showTabs = enabledEditors.length > 1;

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-700 bg-gray-900 shadow">
      <div className={`flex items-center border-b border-gray-700 ${showTabs ? 'justify-between' : 'justify-end'}`}>
        {showTabs && (
          <div className="flex">
            {enabledEditors.map((editor) => (
              <button
                key={editor}
                type="button"
                onClick={() => setActiveTab(editor)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === editor
                    ? 'bg-gray-800 text-blue-400'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                {TAB_LABELS[editor] ?? editor}
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-2 text-xs text-gray-500 hover:text-gray-300"
          title="Code auf den Ausgangszustand zurücksetzen"
        >
          ↺ Zurücksetzen
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        {enabledEditors.map((editor) => (
          <div key={editor} className={`h-full ${activeTab === editor ? 'block' : 'hidden'}`}>
            <CodeEditor
              value={codeSnippets[taskId]?.[editor] ?? initialCode[editor]}
              onChange={(value) => handleChange(editor, value)}
              language={editor}
              className="h-full text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
