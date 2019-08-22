import Vue from 'vue';
import instance from '../../instance';
import router from '../../../router/router';
import store from '../../../store/store';


export function getRoles() {
  Vue.$log.info('get Roles started');
  const url = '/rolef/6';
  return instance.get(url)
    .then((response) => {
      Vue.$log.info('get Roles', 'response', response);
      store.dispatch('setRoles', response.data.roles);
      return response.data.roles;
    },
    (error) => {
      Vue.$log.info('get Roles', 'error', error);
      throw error;
    });
}
