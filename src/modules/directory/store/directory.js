import devices from '../modules/devices/store/devices';
import license from '../modules/license/store/license';
import users from '../modules/users/store/users';

const modules = {
	users,
	license,
	devices,
};

export default {
	namespaced: true,
	modules,
};
