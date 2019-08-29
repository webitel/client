import Vue from 'vue';
import instance from '../../instance';

const BASE_URL = '/roles';

export function getRoles(id = '') {
    Vue.$log.info('get Roles started');
    if (id) id = '/' + id;
    const url = BASE_URL + id;
    return instance.get(url)
        .then((response) => {
                Vue.$log.info('get Roles', 'response', response);

                return response.data.results;
            },
            (error) => {
                Vue.$log.info('get Roles', 'error', error);
            });
}

export function addRole(roleToSend) {
    Vue.$log.info('add role started');

    const newRole = {
        role: roleToSend
    };

    return instance.post(BASE_URL, newRole)
        .then(response => {
                Vue.$log.info('post Roles', 'response', response);

            },
            error => {
                Vue.$log.info('post Roles', 'error', error);
                throw error;
            });
}