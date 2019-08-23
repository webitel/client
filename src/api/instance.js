import axios from 'axios';
import Vue from 'vue';
import { logout, refreshToken } from './auth/auth';

// global API configuration
// 'X-Webitel-Access' ~ 'X-Access-Token'
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    // 'X-Webitel-Access': localStorage.getItem('access-token') || '',
    'X-Webitel-Access': 'USER_TOKEN',
  },
});

let isRefresh = false; // prevents infinite loop refresh 401 intercepts and calls itself

// catches 401 error across all api and tries to refresh token
instance.interceptors.response.use(undefined, (error) => {
  if (error.response && error.response.status === 401 && !isRefresh) {
    Vue.$log.info('intercepted 401');
    isRefresh = true;
    refreshToken();
  }
  // if error isn't 401, returns it
  return Promise.reject(error.response.data);
});

export default instance;
