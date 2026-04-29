import { z } from 'zod';

// ============================================================================
// Domain Model: Validation Tests
// ============================================================================

export const DomTestSchema = z.object({
  type: z.literal('dom'),
  selector: z.string().min(1),
  property: z.string().optional(),
  expectedValue: z.string().optional(),
  requiredAttributes: z.array(z.string()).optional(),
  minCount: z.number().min(1).optional(),
  minItemsPerParent: z.number().min(1).optional(),
  expectedText: z.string().optional(),
  expectedTextContains: z.string().optional(),
  shouldBeEmpty: z.boolean().optional(),
  feedbackSuccess: z.string().optional(),
  feedbackFailure: z.string().min(1),
});

export const ConsoleTestSchema = z.object({
  type: z.literal('console'),
  expectedOutput: z.union([z.string(), z.array(z.string())]),
  feedbackSuccess: z.string().optional(),
  feedbackFailure: z.string().min(1),
});

export const FunctionTestSchema = z.object({
  type: z.literal('function'),
  functionName: z.string().min(1),
  args: z.array(z.unknown()).default([]),
  expectedResult: z.unknown(),
  feedbackSuccess: z.string().optional(),
  feedbackFailure: z.string().min(1),
});

export const CssTestSchema = z.object({
  type: z.literal('css'),
  requiredText: z.string().min(1),
  feedbackSuccess: z.string().optional(),
  feedbackFailure: z.string().min(1),
});

export const ValidationTestSchema = z.union([
  DomTestSchema,
  ConsoleTestSchema,
  FunctionTestSchema,
  CssTestSchema,
]);

// ============================================================================
// Domain Model: Task
// ============================================================================

export const TaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  instruction: z.string(),
  initialCode: z.object({
    html: z.string(),
    css: z.string(),
    js: z.string(),
  }),
  enabledEditors: z.array(z.enum(['html', 'css', 'js'])),
  validationTests: z.array(ValidationTestSchema).min(1),
});

// ============================================================================
// Domain Model: Bundle
// ============================================================================

export const BundleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  badgeName: z.string().min(1),
  tasks: z.array(TaskSchema).min(1),
});

export const BundleListSchema = z.array(BundleSchema);

// ============================================================================
// Derived TypeScript Types
// ============================================================================

export type DomTest = z.infer<typeof DomTestSchema>;
export type ConsoleTest = z.infer<typeof ConsoleTestSchema>;
export type FunctionTest = z.infer<typeof FunctionTestSchema>;
export type CssTest = z.infer<typeof CssTestSchema>;
export type ValidationTest = z.infer<typeof ValidationTestSchema>;

export type Task = z.infer<typeof TaskSchema>;
export type Bundle = z.infer<typeof BundleSchema>;
