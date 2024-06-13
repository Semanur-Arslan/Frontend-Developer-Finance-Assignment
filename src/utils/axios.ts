import axios from 'axios';
import { store } from '../redux/store';

const axiosInstance = axios.create({
  baseURL: 'https://study.logiper.com',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // return Promise.reject(error);
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.data;
      return Promise.reject(errorMessage);
    } else {
      return Promise.reject('error');
    }
  }
);



export default axiosInstance;

