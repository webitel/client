import resGroups from '../modules/resource-groups/store/resource-groups';
import res from '../modules/resources/store/resources';
import teams from '../modules/teams/store/teams';

const modules = {
	teams,
	res,
	resGroups,
};

export default {
	namespaced: true,
	modules,
};
