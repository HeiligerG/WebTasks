import { create } from 'zustand';

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
};

type AppActions = {
  setActiveTask: (bundleId: string | null, taskId: string | null) => void;
  setCode: (taskId: string, language: keyof CodeSnippet, code: string) => void;
  markTaskCompleted: (taskId: string) => void;
};

export const useAppStore = create<AppState & AppActions>((set) => ({
  activeBundleId: null,
  activeTaskId: null,
  codeSnippets: {},
  completedTasks: [],

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
}));
