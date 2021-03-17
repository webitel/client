import users from '../modules/users/store/users';
import license from '../modules/license/store/license';
import devices from '../modules/devices/store/devices';

const modules = {
  users,
  license,
  devices,
};

export default {
  namespaced: true,
  modules,
};
