import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <Outlet />
    </div>
  );
}
