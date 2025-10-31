import api from './lib/api';
import { createBrowserRouter, redirect } from 'react-router';
import RootLayout from './components/RootLayout';
import Home from './components/Home';
import About from './components/About';
import AuthLayout from './components/AuthLayout';
import Login from './components/Login';
import Register from './components/Register';
import TodoLayout from './components/TodoLayout';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import TodoDetail from './components/TodoDetail';
import TodoEdit from './components/TodoEdit';

export const rootLoader = async () => {
  try {
    const res = await api.post('/auth/refresh');
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const loginAction = async ({ request }: { request: Request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const res = await api.post('/auth/login', data);
    return res.data.data;
  } catch (err: any) {
    return { error: err.response?.data?.message || 'Failed to login' };
  }
};

export const registerAction = async ({ request }: { request: Request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const res = await api.post('/auth/register', data);
    return res.data.data;
  } catch (err: any) {
    return { error: err.response?.data?.message || 'Failed to register' };
  }
};

export const logoutAction = async () => {
  try {
    await api.post('/auth/logout');
  } catch (err) {
    console.error('Logout failed on server, redirecting anyway.', err);
  }
  return redirect('/auth/login');
};

export const todoListLoader = async () => {
  try {
    const res = await api.get('/todo/list');
    return res.data.data;
  } catch (err) {
    return [];
  }
};

export const todoDetailLoader = async ({ params }: { params: any }) => {
  try {
    const res = await api.get(`/todo/${params.id}`);
    if (!res.data.data) {
      throw new Response('Not Found', { status: 404 });
    }
    return res.data;
  } catch (err) {
    if ((err as Response).status === 404) {
      throw err;
    }
    return null;
  }
};

export const todoCreateAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  try {
    await api.post('/todo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return redirect('/todos');
  } catch (err: any) {
    return { error: err.response?.data?.message || 'Failed to create todo' };
  }
};

export const todoUpdateAction = async ({ request, params }: { request: Request; params: any }) => {
  const formData = await request.formData();
  try {
    await api.patch(`/todo/${params.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return redirect(`/todos/${params.id}`);
  } catch (err: any) {
    return { error: err.response?.data?.message || 'Failed to update todo' };
  }
};

export const todoDeleteAction = async ({ params }: { params: any }) => {
  try {
    await api.delete(`/todo/${params.id}`);
    return redirect('/todos');
  } catch (err: any) {
    return { error: err.response?.data?.message || 'Failed to delete todo' };
  }
};

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    loader: rootLoader,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      {
        path: 'auth',
        Component: AuthLayout,
        children: [
          {
            path: 'login',
            Component: Login,
            action: loginAction,
          },
          {
            path: 'register',
            Component: Register,
            action: registerAction,
          },
        ],
      },
      {
        path: 'todos',
        Component: TodoLayout,
        children: [
          {
            index: true,
            Component: TodoList,
            loader: todoListLoader,
          },
          {
            path: 'create',
            Component: TodoCreate,
            action: todoCreateAction,
          },
          {
            path: ':id',
            Component: TodoDetail,
            loader: todoDetailLoader,
          },
          {
            path: ':id/edit',
            Component: TodoEdit,
            loader: todoDetailLoader,
            action: todoUpdateAction,
          },
          {
            path: ':id/delete',
            action: todoDeleteAction,
          },
        ],
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

export default router;
