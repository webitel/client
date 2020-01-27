import axios from 'axios';
import {refreshToken} from './auth/auth';
import eventBus from "../utils/eventBus";

// global API configuration
// 'X-Webitel-Access' ~ 'X-Access-Token'
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    // 'X-Webitel-Access': localStorage.getItem('access-token') || '',
    'X-Webitel-Access': 'USER_TOKEN',
    // 'X-Webitel-Access': 'ITS_TOKEN',
  },
});

let isRefresh = false; // prevents infinite loop refresh 401 intercepts and calls itself

// catches 401 error across all api and tries to refresh token
instance.interceptors.response.use(undefined, (error) => {
  if (error.response && error.response.status === 401 && !isRefresh) {
    console.warn('intercepted 401');
    isRefresh = true;
    refreshToken().then();
  }
  // if error isn't 401, returns it
  eventBus.$emit('notificationError', error);
  return Promise.reject(error.response.data);
});

export default instance;
