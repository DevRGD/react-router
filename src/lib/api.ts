import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url !== '/auth/refresh' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh');
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Session expired. Please log in again.');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
