import agents from '../modules/agents/store/agents';
import teams from '../modules/teams/store/teams';
import queues from '../modules/queues/store/queues';
import res from '../modules/resources/store/resources';
import resGroups from '../modules/resource-groups/store/resource-groups';

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
