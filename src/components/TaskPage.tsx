import { useParams } from 'react-router-dom';

export function TaskPage() {
  const { bundleId, taskId } = useParams<{ bundleId: string; taskId: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-600">Task View</h1>
        <p className="mt-4 text-gray-600">
          Bundle: <strong>{bundleId}</strong> | Task: <strong>{taskId}</strong>
        </p>
        <p className="mt-2 text-gray-500">Editor-Ansicht kommt in Phase 3/4</p>
      </div>
    </div>
  );
}
