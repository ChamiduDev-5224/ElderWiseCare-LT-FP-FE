import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token to all requests
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
