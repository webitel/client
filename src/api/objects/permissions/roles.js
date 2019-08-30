import Vue from 'vue';
import instance from '../../instance';

const BASE_URL = '/roles';

export function getRoles() {
    Vue.$log.info('get Roles',  'started');
    return instance.get(BASE_URL)
        .then((response) => {
                Vue.$log.info('get Roles', 'response', response);

                return response.data.results;
            },
            (error) => {
                Vue.$log.info('get Roles', 'error', error);
                throw error;
            });
}

export function getRole(id) {
    Vue.$log.info('get Role (1)',  'started');
    const url = BASE_URL + '/' + id;
    return instance.get(url)
        .then((response) => {
                Vue.$log.info('get Role (1)', 'response', response);

                return response.data;
            },
            (error) => {
                Vue.$log.info('get Role (1)', 'error', error);
                throw error;
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

export function updateRole(id, roleToSend) {
    Vue.$log.info('update role started');
    const updatedRole = {
        role: roleToSend
    };
    const url = BASE_URL + '/' + id;
    return instance.put(url, updatedRole)
        .then(response => {
                Vue.$log.info('put Roles', 'response', response);

            },
            error => {
                Vue.$log.info('put Roles', 'error', error);
                throw error;
            });
}

export function deleteRole(id) {
    Vue.$log.info('delete role started');
    const url = BASE_URL + '/' + id;
    return instance.delete(url)
        .then(response => {
                Vue.$log.info('delete Roles', 'response', response);

            },
            error => {
                Vue.$log.info('delete Roles', 'error', error);
                throw error;
            });
}

