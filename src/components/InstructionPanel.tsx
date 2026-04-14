import { useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
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

  useEffect(() => {
    if (validationResult?.success && !prevSuccessRef.current) {
      triggerConfetti();
    }
    prevSuccessRef.current = validationResult?.success ?? false;
  }, [validationResult]);

  const failedResults = validationResult?.results.filter((r) => !r.passed) ?? [];

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
            ) : (
              failedResults.map((r, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-2.5 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
                >
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong>Test {r.testIndex + 1} fehlgeschlagen:</strong> {r.feedback}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
