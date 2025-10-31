import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;
    if (status === 401 && originalRequest.url !== '/auth/refresh' && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;

      try {
        await api.post('/auth/refresh');
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Session expired. Please log in again.');
        window.location.href = '/auth/login';
        return new Promise(() => {});
      }
    }
    return Promise.reject(error);
  },
);

export default api;
