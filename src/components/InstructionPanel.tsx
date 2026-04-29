import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, XCircle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { triggerConfetti } from '../lib/confetti';
import type { ValidationResult } from '../lib/validationEngine';

type InstructionPanelProps = {
  title: string;
  instruction: string;
  onValidate: () => void;
  validating: boolean;
  validationResult: ValidationResult | null;
};

export function InstructionPanel({
  title,
  instruction,
  onValidate,
  validating,
  validationResult,
}: InstructionPanelProps) {
  const prevSuccessRef = useRef(false);
  const [currentFailedIndex, setCurrentFailedIndex] = useState(0);

  // Reset current index when validation result changes
  useEffect(() => {
    setCurrentFailedIndex(0);
  }, [validationResult]);

  useEffect(() => {
    if (validationResult?.success && !prevSuccessRef.current) {
      triggerConfetti();
    }
    prevSuccessRef.current = validationResult?.success ?? false;
  }, [validationResult]);

  const failedResults = validationResult?.results.filter((r) => !r.passed) ?? [];
  const currentFailed = failedResults[currentFailedIndex];

  return (
    <div className="flex h-full min-w-0 flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 md:text-xl">{title}</h1>
      <div className="mt-3 flex-1 overflow-x-hidden lg:overflow-y-auto">
        <MarkdownRenderer>{instruction}</MarkdownRenderer>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-700">
        <button
          type="button"
          onClick={onValidate}
          disabled={validating}
          className="flex w-full items-center justify-center gap-2 rounded bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
        >
          {validating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Prüfe...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Code prüfen
            </>
          )}
        </button>

        {validationResult && (
          <div className="mt-3 space-y-2">
            {validationResult.success ? (
              <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-2.5 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <strong>Super!</strong> Alle Tests bestanden.
                </span>
              </div>
            ) : failedResults.length > 0 ? (
              <div>
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold">
                      Test {currentFailed.testIndex + 1} fehlgeschlagen
                    </div>
                    <div className="mt-1">{currentFailed.feedback}</div>
                  </div>
                </div>

                {failedResults.length > 1 && (
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentFailedIndex((i) => Math.max(0, i - 1))}
                      disabled={currentFailedIndex === 0}
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 dark:text-gray-400 dark:hover:bg-gray-800 disabled:dark:hover:bg-transparent"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Vorheriger
                    </button>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {currentFailedIndex + 1} / {failedResults.length}
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentFailedIndex((i) => Math.min(failedResults.length - 1, i + 1))}
                      disabled={currentFailedIndex === failedResults.length - 1}
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 dark:text-gray-400 dark:hover:bg-gray-800 disabled:dark:hover:bg-transparent"
                    >
                      Nächster
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Validierung fehlgeschlagen</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
