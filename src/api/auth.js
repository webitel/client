import Vue from 'vue';
import instance from './instance';
import router from '../router/router';
import store from '../store/store';

// Vue is imported for logging


// gets user by token from localstorage
// stores response username in vuex
export function getSession() {
    const tokenCheck = localStorage.getItem('access-token');
    if (typeof tokenCheck === "string") {
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
}

// posts user credentials and gets tokens
// credentials: username, password (!NO DOMAIN NAME)
// stores tokens in localstorage
// and updates global instance access-token header
// if succeeded, calls getSession function
export function login(credentials) {
    Vue.$log.info('login started');
    const url = '/login';
    return instance.post(url, credentials)
        .then((response) => {
                localStorage.setItem('access-token', response.data.authorization.access_token);
                localStorage.setItem('refresh-token', response.data.authorization.refresh_token);

                instance.defaults.headers['X-Webitel-Access'] = localStorage.getItem('access-token');
                getSession();
                router.replace('/');
            },
            (error) => {
                throw error;
            });
}

// tries to refresh access token, if it expired
// if refresh is expired too, router throws user to login page
export function refreshToken() {
    Vue.$log.info('refresh token started');

    const url = '/auth/oauth2/token';
    const data = {
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem('refresh-token'),
    };
    const config = {
        headers: {
            Authorization: 'Basic Z28ud2ViaXRlbC5kc2E6aVRzQWxpVmU=',
        },
    };

    instance.post(url, data, config)
        .then((response) => {
            Vue.$log.info('refresh response', response);

            // save new tokens
            localStorage.setItem('access-token', response.data.access_token);
            localStorage.setItem('refresh-token', response.data.refresh_token);
            instance.defaults.headers['X-Webitel-Access'] = localStorage.getItem('access-token');
            // and try to get session again
            getSession();
        }, (error) => {
            Vue.$log.error('refresh error', error);
            router.replace('/login');
        });
}

export function logout() {
    Vue.$log.info('logout started');
    const url = '/logout';
    return instance.post(url, {}).then(
        response => {
            Vue.$log.info('logout response', response);
            // remove tokens
            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
            instance.defaults.headers['X-Webitel-Access'] = '';
            // and throw user to login page
            router.replace('/login');
        },
        error => {
            Vue.$log.info('logout error', error);
            throw error;
        }
    );
}
