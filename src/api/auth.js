import Vue from 'vue';
import instance from './instance';
import router from '../router/router';
import store from '../store/store';

// Vue is imported for logging


// gets user by token from localstorage
// stores response username in vuex
export function getSession() {
  Vue.$log.info('get session started');

  const url = '/session';

  instance.get(url)
    .then((response) => {
      store.dispatch('setUser', response.data.session.username);
    },
    (error) => {
      Vue.$log.error('get session error', error);
    });
}

// posts user credentials and gets tokens
// credentials: username, password (!NO DOMAIN NAME)
// stores tokens in localstorage
// and updates global instance access-token header
// if succeeded, calls getSession function
export function login(credentials) {
  Vue.$log.info('login started');
  const url = '/login';
  instance.post(url, credentials)
    .then((response) => {
      localStorage.setItem('access-token', response.data.authorization.access_token);
      localStorage.setItem('refresh-token', response.data.authorization.refresh_token);

      instance.defaults.headers['X-Webitel-Access'] = localStorage.getItem('access-token');
      getSession();
    },
    (error) => {
      throw error;
    });
}

// tries to refresh access token, if it expired
// if refresh is expired too, router throws user to login page
export function refreshToken(resolve, reject) {
  Vue.$log.info('refresh token started');
  // TODO: add refresh request, when endpoint is complete
  // const url = API_URL;
  // let refreshToken = localStorage.getItem('refresh-token');
  //
  // axios.post(url)
  //     .then(response => {
  //         console.log(response);
  //     }, error => {
  //         console.log(error);
  // router.push('/');
  router.replace('/login');
  //     });
}
