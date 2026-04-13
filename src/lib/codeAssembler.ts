export function getConsoleInterceptorScript(): string {
  return `
    (function() {
      var originalLog = console.log;
      var originalWarn = console.warn;
      var originalError = console.error;

      function sendMessage(type, level, payload) {
        try {
          window.parent.postMessage({ type: type, level: level, payload: payload }, '*');
        } catch (e) {}
      }

      console.log = function() {
        sendMessage('CONSOLE', 'log', Array.prototype.slice.call(arguments));
        originalLog.apply(console, arguments);
      };

      console.warn = function() {
        sendMessage('CONSOLE', 'warn', Array.prototype.slice.call(arguments));
        originalWarn.apply(console, arguments);
      };

      console.error = function() {
        sendMessage('CONSOLE', 'error', Array.prototype.slice.call(arguments));
        originalError.apply(console, arguments);
      };

      window.onerror = function(message, filename, lineno, colno, error) {
        sendMessage('ERROR', 'error', { message: message, filename: filename, lineno: lineno, colno: colno });
      };
    })();
  `;
}

export function assembleDocument(params: { html: string; css: string; js: string }): string {
  const { html, css, js } = params;

  return `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <style>
${css}
    </style>
  </head>
  <body>
${html}
    <script>
${getConsoleInterceptorScript()}
    </script>
    <script>
${js}
    </script>
  </body>
</html>`;
}
