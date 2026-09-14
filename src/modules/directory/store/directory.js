import license from '../modules/license/store/license';
import users from '../modules/users/store/users';

const modules = {
	users,
	license,
};

export default {
	namespaced: true,
	modules,
};
