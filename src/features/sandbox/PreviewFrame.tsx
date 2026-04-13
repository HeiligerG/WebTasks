import { useEffect, useRef, forwardRef } from 'react';

type PreviewFrameProps = {
  srcDoc: string;
  onMessage: (message: unknown) => void;
  className?: string;
};

export const PreviewFrame = forwardRef<HTMLIFrameElement, PreviewFrameProps>(function PreviewFrame(
  { srcDoc, onMessage, className },
  ref
) {
  const innerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const iframe = innerRef.current;
      if (iframe && event.source === iframe.contentWindow) {
        onMessage(event.data);
      }
    }

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onMessage]);

  return (
    <iframe
      ref={(node) => {
        innerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      title="Live Preview"
      sandbox="allow-scripts"
      srcDoc={srcDoc}
      className={className}
    />
  );
});
