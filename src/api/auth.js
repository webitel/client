import instance from './instance';
import router from '../router/router';
import store from '../store/store';


// gets user by token from localstorage
// stores response username in vuex
export function getSession() {
  console.log('get session');
  const url = '/session';
  const accessToken = localStorage.getItem('access-token');
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  instance.get(url, config)
    .then((response) => {
      // console.log(response.data);
      store.dispatch('setUser', response.data.session.username);
    },
    (error) => {
      console.log(error);
    });
}

// posts user credentials and gets tokens
// credentials: username, password (!NO DOMAIN NAME)
// stores tokens in localstorage
// if succeeded, calls getSession function
export function login(credentials) {
  console.log('login');
  const url = '/login';
  // console.log(credentials, url);
  instance.post(url, credentials)
    .then((response) => {
      console.log(response);
      localStorage.setItem('access-token', response.data.authorization.access_token);
      localStorage.setItem('refresh-token', response.data.authorization.refresh_token);
      getSession();
    },
    (error) => {
      // console.log(error);
      throw error;
    });
}

// tries to refresh access token, if it expired
// if refresh is expired too, router throws user to login page
export function refreshToken(resolve, reject) {
  console.log('refresh token');
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
