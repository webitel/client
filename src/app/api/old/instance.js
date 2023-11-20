import updateTokenInterceptor
  from '@webitel/ui-sdk/src/api/interceptors/request/updateToken.interceptor';
import handleUnauthorizedInterceptor
  from '@webitel/ui-sdk/src/api/interceptors/response/handleUnauthorized.interceptor';
import axios from 'axios';
import defaultInterceptorsSetup from './interceptors/defaultInterceptorsSetup';

// config with specific properties which doesn't fit to axios config
export const config = {
  errors: {
    silent: false,
  },
};

// global API configuration
// 'X-Webitel-Access' ~ 'X-Access-Token'
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-Webitel-Access': localStorage.getItem('access-token') || '',
    // 'X-Webitel-Access': 'USER_TOKEN',
    // 'X-Webitel-Access': 'ITS_TOKEN',
  },
});

defaultInterceptorsSetup({ instance, config });

instance.interceptors.request.use(...updateTokenInterceptor);
instance.interceptors.response.use(...handleUnauthorizedInterceptor);

export default instance;
