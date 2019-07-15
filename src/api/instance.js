import axios from 'axios';
import Vue from 'vue';
import { refreshToken } from './auth';

// global API configuration
// 'X-Webitel-Access' ~ 'X-Access-Token'
const instance = axios.create({
  baseURL: 'http://10.10.10.8:1907',
  headers: {
    'X-Webitel-Access': localStorage.getItem('access-token') || '',
  },
});

// catches 401 error across all api and tries to refresh token
instance.interceptors.response.use(undefined, (error) => {
  if (error.response && error.response.status === 401) {
    Vue.$log.info('intercepted 401');
    return refreshToken();
  }
  // if error isn't 401, returns it
  return Promise.reject(error.response.data);
});

export default instance;
