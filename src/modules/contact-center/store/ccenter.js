import resGroups from '../modules/resource-groups/store/resource-groups';
import res from '../modules/resources/store/resources';

const modules = {
	res,
	resGroups,
};

export default {
	namespaced: true,
	modules,
};
