import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';

// SPA routing restore for GitHub Pages Project Pages
const redirect = sessionStorage.getItem('webtasks-redirect');
if (redirect) {
  sessionStorage.removeItem('webtasks-redirect');
  const currentPath = window.location.pathname;
  if (currentPath === '/WebTasks/' || currentPath === '/WebTasks/index.html') {
    window.history.replaceState(null, '', '/WebTasks' + redirect);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/WebTasks">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
