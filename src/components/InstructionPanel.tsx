import { useEffect, useRef } from 'react';
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

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h1 className="text-xl font-bold text-gray-800 md:text-2xl">{title}</h1>
      <div className="mt-4 flex-1 overflow-y-auto">
        <MarkdownRenderer>{instruction}</MarkdownRenderer>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={onValidate}
          disabled={validating}
          className="w-full rounded bg-green-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
        >
          {validating ? 'Prüfe...' : 'Code prüfen'}
        </button>

        {validationResult && (
          <div className="mt-3 space-y-2">
            {validationResult.success ? (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-green-800">
                <strong>Super!</strong> Alle Tests bestanden.
              </div>
            ) : (
              validationResult.results
                .filter((r) => !r.passed)
                .map((r, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
                  >
                    <strong>Test {r.testIndex + 1} fehlgeschlagen:</strong> {r.feedback}
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
