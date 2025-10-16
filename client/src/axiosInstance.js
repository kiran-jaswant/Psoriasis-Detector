import axios from 'axios';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5002',
});

// Add a request interceptor to attach JWT token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
