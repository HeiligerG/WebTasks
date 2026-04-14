import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ReactNode } from 'react';
import { Lightbulb, ClipboardList, AlertTriangle } from 'lucide-react';

type MarkdownRendererProps = {
  children: string;
  className?: string;
};

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return '';
}

function CalloutParagraph({ children }: { children?: ReactNode }) {
  const text = extractText(children);

  if (text.startsWith('Tipp:')) {
    return (
      <div className="not-prose my-3 break-all rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
        <div className="flex items-start gap-2">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
          <div>{children}</div>
        </div>
      </div>
    );
  }

  if (text.startsWith('Anforderungen:')) {
    return (
      <div className="not-prose my-3 break-all rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200">
        <div className="flex items-start gap-2">
          <ClipboardList className="mt-0.5 h-4 w-4 shrink-0" />
          <div>{children}</div>
        </div>
      </div>
    );
  }

  if (text.startsWith('Wichtig:')) {
    return (
      <div className="not-prose my-3 break-all rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-200">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>{children}</div>
        </div>
      </div>
    );
  }

  return <p className="break-words leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>;
}

export function MarkdownRenderer({ children, className }: MarkdownRendererProps) {
  return (
    <div
      className={`prose prose-sm max-w-none break-words prose-headings:font-semibold prose-headings:text-gray-800 prose-p:text-gray-700 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-pre:rounded-lg prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:text-gray-100 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-ul:text-gray-700 prose-ol:text-gray-700 dark:prose-headings:text-gray-100 dark:prose-p:text-gray-300 dark:prose-code:bg-gray-800 dark:prose-code:text-gray-100 dark:prose-pre:bg-gray-950 dark:prose-a:text-blue-400 dark:prose-ul:text-gray-300 dark:prose-ol:text-gray-300 dark:prose-strong:text-gray-100 ${className ?? ''}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: CalloutParagraph,
          code: ({ children }) => (
            <code className="break-all rounded bg-gray-100 px-1 py-0.5 font-mono text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-100">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="max-w-full overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100 dark:bg-gray-950">
              {children}
            </pre>
          ),
          a: ({ children, href }) => (
            <a href={href} className="break-all text-blue-600 no-underline hover:underline dark:text-blue-400">
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
