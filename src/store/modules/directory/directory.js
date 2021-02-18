import users from './users/users';
import license from './license/license';
import devices from './devices/devices';

const modules = {
  users,
  license,
  devices,
};

export default {
  namespaced: true,
  modules,
};
