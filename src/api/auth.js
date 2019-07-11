import axios from 'axios';

const API_URL = 'http://10.10.10.8:1907';

export function login(credentials, resolve, reject) {
    let url = API_URL + '/login';
    console.log(credentials, url);
    axios.post(url, credentials)
        .then(response => {
                console.log(response);
                resolve(response);
            },
            error => {
                console.log(error);
                reject(error);
            });
}