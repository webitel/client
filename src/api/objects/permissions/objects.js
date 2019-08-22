import Vue from 'vue';
import instance from '../../instance';
import store from '../../../store/store';

export function getObjects() {
    Vue.$log.info('get Permissions Objects started');
    const url = '/objects';
    return instance.get(url)
        .then((response) => {
                Vue.$log.info('get Objects', 'response', response);
                return response.data;
            },
            (error) => {
                Vue.$log.info('get Objects', 'error', error);
                throw error;
            });
}

export function updateObject(id, permissions) {
    Vue.$log.info('update permissions Objects started');
    const url = '/objects/' + id;
    const data = {
        class: {
            obac: permissions.obac,
            rbac: permissions.rbac
        }
    };
    return instance.put(url, data)
        .then(response => {
                Vue.$log.info('put Object', 'response', response);
                return response.data;
            },
            error => {
                Vue.$log.info('put Object', 'error', error);
                throw error;
            });
}