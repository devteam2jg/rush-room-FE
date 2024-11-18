import axios from 'axios';

const baseURLEnv = import.meta.env.VITE_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURLEnv,
  withCredentials: true,
});

export default axiosInstance;
