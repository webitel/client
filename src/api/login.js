import axios from 'axios';

const API_URL = '';

export function login({credentials, resolve, reject}) {
    let url = API_URL+'/login';
    return axios.post(url, credentials, config)
        .then(response => {
                console.log(response);
                resolve(response);
            },
                error => {
                console.log(error);
                reject(error.data);
        });
};