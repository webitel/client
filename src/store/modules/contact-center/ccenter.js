import agents from './agents/agents';
import teams from './teams/teams';
import queues from './queues/queues';
import res from './resources/resources';
import resGroups from './resource-groups/resource-groups';

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
