import agents from './agents/agents';
import skills from './agent-skills/agent-skills';
import teams from './teams/teams';
import queues from './queues/queues';
import res from './resources/resources';
import resGroups from './resource-groups/resource-groups';
import buckets from './buckets/buckets';
import callLog from './queues/queue-callLogs';

const modules = {
    agents,
    skills,
    teams,
    queues,
    res,
    resGroups,
    buckets,
    callLog,
};

export default {
    namespaced: true,
    modules
};
