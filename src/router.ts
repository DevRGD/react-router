import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import AuthLayout from './components/AuthLayout';
import TodoLayout from './components/TodoLayout';
import TodoCreate from './components/TodoCreate';
import TodoDetail from './components/TodoDetail';
import RootLayout from './components/RootLayout';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      {
        path: 'auth',
        Component: AuthLayout,
        children: [
          { path: 'login', Component: Login },
          { path: 'register', Component: Register },
        ],
      },
      {
        path: 'todos',
        Component: TodoLayout,
        children: [
          { index: true, Component: TodoList },
          { path: 'create', Component: TodoCreate },
          { path: ':id', Component: TodoDetail },
        ],
      },
    ],
  },
]);

export default router;
