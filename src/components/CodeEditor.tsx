import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { githubLight } from '@uiw/codemirror-theme-github';
import { lineNumbers, highlightActiveLineGutter, highlightActiveLine } from '@codemirror/view';
import { closeBrackets } from '@codemirror/autocomplete';
import { indentUnit } from '@codemirror/language';
import { EditorView } from '@codemirror/view';

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  language: 'html' | 'css' | 'js';
  className?: string;
  theme?: 'light' | 'dark';
};

function getLanguageExtension(language: CodeEditorProps['language']) {
  switch (language) {
    case 'html':
      return html();
    case 'css':
      return css();
    case 'js':
      return javascript();
    default:
      return [];
  }
}

function getBaseExtensions() {
  return [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightActiveLine(),
    closeBrackets(),
    indentUnit.of('  '),
    EditorView.lineWrapping,
  ];
}

export function CodeEditor({
  value,
  onChange,
  language,
  className,
  theme = 'dark',
}: CodeEditorProps) {
  return (
    <CodeMirror
      value={value}
      height="100%"
      onChange={onChange}
      theme={theme === 'dark' ? oneDark : githubLight}
      extensions={[...getBaseExtensions(), getLanguageExtension(language)]}
      className={className}
      basicSetup={false}
    />
  );
}
