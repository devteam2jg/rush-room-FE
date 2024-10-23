import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.22:80/api/v1',
  withCredentials: true,
});

export default axiosInstance;
