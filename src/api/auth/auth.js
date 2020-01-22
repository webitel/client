import Vue from 'vue';
import instance from '../instance';
import router from '../../router/router';
import store from '../../store/store';


// gets user by token from localstorage
// stores response username in vuex
export const getSession = async () => {
    const tokenCheck = localStorage.getItem('access-token');
    if (typeof tokenCheck === 'string') { // if there is no token, localStorage returns object
        Vue.$log.info('get session started');
        const url = '/session';
        try {
            const response = await instance.get(url);
            Vue.$log.info('get session response', response);
            store.dispatch('setUser', response.data.session.username);
            store.dispatch('setDomainId', response.data.session.dc);
        } catch (error) {
            throw error;
        }
    }
}

// posts user credentials and gets tokens
// credentials: username, password
// stores tokens in localstorage
// and updates global instance access-token header
// if succeeded, calls getSession function
export const  login = async (credentials) => {
    Vue.$log.info('login started');
    const url = 'users/login';

    try {
        const response = await instance.post(url, credentials);
        // return response.data;
        localStorage.setItem('access-token', response.data.authorization.access_token);
        localStorage.setItem('refresh-token', response.data.authorization.refresh_token);

        instance.defaults.headers['X-Webitel-Access'] = localStorage.getItem('access-token');
        getSession().then();
        // router.replace('/');
    } catch (error) {
        throw error;
    }
}

// tries to refresh access token, if have expired
// if refresh have expired too, router throws user to auth page
export const refreshToken = async () => {
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

    try {
        const response = await instance.post(url, data, config);
        Vue.$log.info('refresh response', response);

        // save new tokens
        localStorage.setItem('access-token', response.data.access_token);
        localStorage.setItem('refresh-token', response.data.refresh_token);
        instance.defaults.headers['X-Webitel-Access'] = localStorage.getItem('access-token');
        // and try to get session again
        getSession().then();
    } catch (error) {
        // remove tokens
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        instance.defaults.headers['X-Webitel-Access'] = '';
        // and throw user to auth page
        router.replace('/login');
        throw error;
    }
}

export const logout = async () => {
    Vue.$log.info('logout started');
    const url = '/logout';

    try {
        const response = await instance.post(url, {});
        Vue.$log.info('logout response', response);
        // remove tokens
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        instance.defaults.headers['X-Webitel-Access'] = '';
        // and throw user to auth page
        router.replace('/login');
    } catch (error) {
        throw error;
    }
};

