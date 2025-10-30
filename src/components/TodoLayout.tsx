import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function TodoLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#CA4246] mb-6">Your Todos</h1>
      <Outlet />
    </div>
  );
}
