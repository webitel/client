import agents from './agents/agents';
import teams from './teams/teams';
import queues from './queues/queues';
import res from './resources/resources';
import resGroups from './resource-groups/resource-groups';
import callLog from './queues/queue-callLogs';

const modules = {
  agents,
  teams,
  queues,
  res,
  resGroups,
  callLog,
};

export default {
  namespaced: true,
  modules,
};
