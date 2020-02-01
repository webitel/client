import instance from '../instance';
import router from '../../router/router';
import {getSession} from "../userinfo/userinfo";

// posts user credentials and gets tokens
// credentials: username, password
// stores tokens in localstorage
// and updates global instance access-token header
// if succeeded, calls getSession function
export const login = async (credentials) => {
    const url = '/login';

    try {
        const response = await instance.post(url, credentials);
        localStorage.setItem('access-token', response.data.authorization.access_token);
        instance.defaults.headers['X-Webitel-Access'] = localStorage.getItem('access-token');
        await getSession();
        return router.replace('/');
    } catch (error) {
        throw error;
    }
};


export const register = async (credentials) => {
    const url = '/signup';

    try {
        await instance.post(url, credentials);
        await login({username: credentials.username, password: credentials.password});
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    const url = '/logout';

    try {
        await instance.post(url, {});
        // remove tokens
        localStorage.removeItem('access-token');
        instance.defaults.headers['X-Webitel-Access'] = '';
        // and throw user to auth page
        return router.replace('/auth');
    } catch (error) {
        throw error;
    }
};

