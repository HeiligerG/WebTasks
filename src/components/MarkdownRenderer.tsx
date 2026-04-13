import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownRendererProps = {
  children: string;
  className?: string;
};

export function MarkdownRenderer({ children, className }: MarkdownRendererProps) {
  return (
    <div
      className={`prose prose-sm max-w-none prose-headings:font-semibold prose-headings:text-gray-800 prose-p:text-gray-700 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-pre:rounded-lg prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:text-gray-100 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-ul:text-gray-700 prose-ol:text-gray-700 dark:prose-headings:text-gray-100 dark:prose-p:text-gray-300 dark:prose-code:bg-gray-800 dark:prose-code:text-gray-100 dark:prose-pre:bg-gray-950 dark:prose-a:text-blue-400 dark:prose-ul:text-gray-300 dark:prose-ol:text-gray-300 ${className ?? ''}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
