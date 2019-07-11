import axios from "axios";
import {refreshToken} from "./auth";

export const instance = axios.create({
    baseURL: 'http://10.10.10.8:1907'
});

instance.interceptors.response.use(undefined, error => {
    if (error.response && error.response.status === 401) {
        console.log('intercepted 401');
        refreshToken();
    } else {
        return Promise.reject(error.response.data);
    }
});