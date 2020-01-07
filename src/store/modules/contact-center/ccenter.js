import agents from './agents/agents';
import skills from './agent-skills/agent-skills';
import teams from './teams/teams';
import buckets from './buckets/buckets';

const modules = {
    agents,
    skills,
    teams,
    buckets,
};

export default {
    namespaced: true,
    modules
};
