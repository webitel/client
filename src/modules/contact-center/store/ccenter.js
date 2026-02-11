import agents from '../modules/agents/store/agents';
import queues from '../modules/queues/store/queues';
import resGroups from '../modules/resource-groups/store/resource-groups';
import res from '../modules/resources/store/resources';
import teams from '../modules/teams/store/teams';

const modules = {
	agents,
	teams,
	queues,
	res,
	resGroups,
};

export default {
	namespaced: true,
	modules,
};
