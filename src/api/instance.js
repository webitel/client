import axios from 'axios';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import { objCamelToSnake, objSnakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';

const DO_NOT_CONVERT_KEYS = ['schema', 'variables'];

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

instance.interceptors.request.use(
    (request) => {
        if (request.method === 'post'
            || request.method === 'put'
            || request.method === 'patch') {
            if (typeof request.data === 'string') {
              // eslint-disable-next-line no-param-reassign
                request.data = JSON
                  .stringify(objCamelToSnake(JSON.parse(request.data), DO_NOT_CONVERT_KEYS));
            } else {
              // eslint-disable-next-line no-param-reassign
                request.data = objCamelToSnake(request.data, DO_NOT_CONVERT_KEYS);
            }
        }
        if (request.method === 'get') {
          const searchRegex = /(\?|\&)(q|name)\=([^&]+)/gs;
          const searches = request.url.match(searchRegex) || [];
          searches.forEach((search) => {
            if (search.slice(-1) !== '*') {
              // eslint-disable-next-line no-param-reassign
              request.url = request.url.replace(search, `${search}*`);
            }
          });
        }
        return request;
    },
);

instance.interceptors.response.use(
    (response) => objSnakeToCamel(response.data, DO_NOT_CONVERT_KEYS),
    (error) => { // catches 401 error across all api's
        if (error.response && error.response.status === 401) {
            console.warn('intercepted 401');
            localStorage.removeItem('access-token');
        }
        // if error isn't 401, returns it
        eventBus.$emit('notification', { type: 'error', text: error.response.data.detail });
        return Promise.reject(error.response.data);
    },
);

export default instance;
