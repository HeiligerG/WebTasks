import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { TaskPage } from './components/TaskPage';
import { CertificatePage } from './components/CertificatePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task/:bundleId/:taskId" element={<TaskPage />} />
      <Route path="/certificate" element={<CertificatePage />} />
    </Routes>
  );
}

export default App;
