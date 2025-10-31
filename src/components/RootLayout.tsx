import logo from '../assets/logo.svg';
import { NavLink, Outlet, useLoaderData, Form } from 'react-router';
import { AuthProvider, type User, useAuth } from '../context/AuthContext';

function AppRoot() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/todos', label: 'Todos', auth: true },
    { to: '/auth/login', label: 'Login', hideIfAuth: true },
    { to: '/auth/register', label: 'Register', hideIfAuth: true },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <nav className="flex items-center justify-between px-10 py-4 bg-slate-950 text-white shadow-lg shrink-0">
          <div className="flex items-center gap-2 select-none">
            <img src={logo} alt="React Router Logo" className="w-28 h-10 drop-shadow-lg" />
          </div>
          <div className="text-lg font-medium">Loading...</div>
        </nav>
        <main className="flex-1 p-6 flex items-center justify-center">
          <p>Loading application...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between px-10 py-4 bg-slate-950 text-white shadow-lg shrink-0">
        <div className="flex items-center gap-2 select-none">
          <img src={logo} alt="React Router Logo" className="w-28 h-10 drop-shadow-lg" />
        </div>

        <div className="flex gap-8 text-lg font-medium items-center">
          {navLinks
            .filter((link) => {
              if (link.auth && !isAuthenticated) return false;
              if (link.hideIfAuth && isAuthenticated) return false;
              return true;
            })
            .map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  [
                    'relative pb-1 transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:h-1 after:rounded-2xl after:bg-[#CA4246] after:transition-all after:duration-300 hover:after:w-full',
                    isActive ? 'after:w-full text-[#CA4246]' : 'after:w-0',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}

          {isAuthenticated && (
            <Form
              action="/logout"
              method="post"
              onSubmit={() => {
                logout();
              }}
            >
              <button
                type="submit"
                className="px-4 py-1.5 bg-red-600 text-white text-base rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </Form>
          )}
        </div>
      </nav>

      <main className="flex-1 p-6 bg-linear-to-b from-white via-[#FFF9F7] to-[#FFEFEA]">
        <Outlet />
      </main>
    </div>
  );
}

export default function RootLayout() {
  const initialUser = useLoaderData() as User | null;

  return (
    <AuthProvider initialUser={initialUser}>
      <AppRoot />
    </AuthProvider>
  );
}
