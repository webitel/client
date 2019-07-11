import {instance} from './config';
import router from '../router/router';
import store from '../store/store';


export function login(credentials, resolve, reject) {
    console.log('login');
    const url = '/login';
    // console.log(credentials, url);
    instance.post(url, credentials)
        .then(response => {
                console.log(response);
                localStorage.setItem('access-token', response.data.authorization.access_token);
                localStorage.setItem('refresh-token', response.data.authorization.refresh_token);

                // console.log(credentials);
                // store.dispatch('setCredentials',
                //     {
                //         access_token: response.data.authorization.access_token,
                //         refresh_token: response.data.authorization.refresh_token
                //     });
                resolve(response);
            },
            error => {
                // console.log(error);
                reject(error);
            });
}

export function getSession() {
    console.log('get session');
    const url = '/session';
    let accessToken = localStorage.getItem('access-token');
    const config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };

    instance.get(url, config)
        .then(response => {
                // console.log(response.data);
                store.dispatch('setUser', response.data.session.username);
            },
            error => {
                console.log(error);
            });
}

export function refreshToken(resolve, reject) {
    console.log('refresh token');
    // const url = API_URL;
    // let refreshToken = localStorage.getItem('refresh-token');
    //
    // axios.post(url)
    //     .then(response => {
    //         console.log(response);
    //     }, error => {
    //         console.log(error);
    // router.push('/');
    router.replace('/');
    //     });
}