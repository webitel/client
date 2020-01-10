import agents from './agents/agents';
import skills from './agent-skills/agent-skills';
import teams from './teams/teams';
import res from './resources/resources';
import resGroups from './resource-groups/resource-groups';
import buckets from './buckets/buckets';

const modules = {
    agents,
    skills,
    teams,
    res,
    resGroups,
    buckets,
};

export default {
    namespaced: true,
    modules
};
