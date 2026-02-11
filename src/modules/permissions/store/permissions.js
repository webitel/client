import objects from '../modules/objects/store/objects';
import roles from '../modules/roles/store/roles';

const modules = {
	roles,
	objects,
};

export default {
	namespaced: true,
	modules,
};
