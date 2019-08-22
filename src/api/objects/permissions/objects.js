import Vue from 'vue';
import instance from '../../instance';
import store from '../../../store/store';

export function getObjects() {
    Vue.$log.info('get Permissions Objects started');
    const url = '/objects';
    return instance.get(url)
        .then((response) => {
                Vue.$log.info('get Objects', 'response', response);
                // store.dispatch('setRoles', response.data.roles);
                return response.data;
            },
            (error) => {
                Vue.$log.info('get Objects', 'error', error);
                throw error;
            });
}
