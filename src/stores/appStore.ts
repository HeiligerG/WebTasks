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
  unlockedBadges: string[];
};

type AppActions = {
  setActiveTask: (bundleId: string | null, taskId: string | null) => void;
  setCode: (taskId: string, language: keyof CodeSnippet, code: string) => void;
  resetCode: (taskId: string, initialCode: CodeSnippet) => void;
  markTaskCompleted: (taskId: string) => void;
  setTaskResult: (taskId: string, passed: boolean) => void;
  unlockBadge: (badgeName: string) => void;
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      activeBundleId: null,
      activeTaskId: null,
      codeSnippets: {},
      completedTasks: [],
      taskResults: {},
      unlockedBadges: [],

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

      resetCode: (taskId, initialCode) =>
        set((state) => ({
          codeSnippets: {
            ...state.codeSnippets,
            [taskId]: { ...initialCode },
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

      unlockBadge: (badgeName) =>
        set((state) => ({
          unlockedBadges: state.unlockedBadges.includes(badgeName)
            ? state.unlockedBadges
            : [...state.unlockedBadges, badgeName],
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
        unlockedBadges: state.unlockedBadges,
      }),
    }
  )
);
