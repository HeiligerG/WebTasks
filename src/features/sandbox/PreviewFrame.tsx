import { useEffect, useRef } from 'react';

type PreviewFrameProps = {
  srcDoc: string;
  onMessage: (message: unknown) => void;
  className?: string;
};

export function PreviewFrame({ srcDoc, onMessage, className }: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (iframeRef.current && event.source === iframeRef.current.contentWindow) {
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
      ref={iframeRef}
      title="Live Preview"
      sandbox="allow-scripts"
      srcDoc={srcDoc}
      className={className}
    />
  );
}
