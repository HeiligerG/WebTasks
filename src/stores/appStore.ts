import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CodeSnippet = {
  html: string;
  css: string;
  js: string;
};

type AppState = {
  activeBundleId: string | null;
  activeTaskId: string | null;
  codeSnippets: Record<string, CodeSnippet>;
  completedTasks: string[];
  taskResults: Record<string, boolean>;
};

type AppActions = {
  setActiveTask: (bundleId: string | null, taskId: string | null) => void;
  setCode: (taskId: string, language: keyof CodeSnippet, code: string) => void;
  markTaskCompleted: (taskId: string) => void;
  setTaskResult: (taskId: string, passed: boolean) => void;
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      activeBundleId: null,
      activeTaskId: null,
      codeSnippets: {},
      completedTasks: [],
      taskResults: {},

      setActiveTask: (bundleId, taskId) =>
        set(() => ({
          activeBundleId: bundleId,
          activeTaskId: taskId,
        })),

      setCode: (taskId, language, code) =>
        set((state) => ({
          codeSnippets: {
            ...state.codeSnippets,
            [taskId]: {
              ...state.codeSnippets[taskId],
              [language]: code,
            },
          },
        })),

      markTaskCompleted: (taskId) =>
        set((state) => ({
          completedTasks: state.completedTasks.includes(taskId)
            ? state.completedTasks
            : [...state.completedTasks, taskId],
        })),

      setTaskResult: (taskId, passed) =>
        set((state) => ({
          taskResults: {
            ...state.taskResults,
            [taskId]: passed,
          },
        })),
    }),
    {
      name: 'webtasks-storage',
      partialize: (state) => ({
        codeSnippets: state.codeSnippets,
        completedTasks: state.completedTasks,
        taskResults: state.taskResults,
        activeBundleId: state.activeBundleId,
        activeTaskId: state.activeTaskId,
      }),
    }
  )
);
