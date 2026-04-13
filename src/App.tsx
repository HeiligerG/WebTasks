import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { TaskPage } from './components/TaskPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/task/:bundleId/:taskId" element={<TaskPage />} />
    </Routes>
  );
}

export default App;
