import axios from 'axios';
import eventBus from "../utils/eventBus";

// global API configuration
// 'X-Webitel-Access' ~ 'X-Access-Token'
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'X-Webitel-Access': localStorage.getItem('access-token') || '',
    // 'X-Webitel-Access': 'USER_TOKEN',
    // 'X-Webitel-Access': 'ITS_TOKEN',
  },
});

// catches 401 error across all api's
instance.interceptors.response.use(undefined, (error) => {
  if (error.response && error.response.status === 401) {
    console.warn('intercepted 401');
    localStorage.removeItem('access-token');
  }
  // if error isn't 401, returns it
  eventBus.$emit('notificationError', error.response.data.detail);
  return Promise.reject(error.response.data);
});

export default instance;
