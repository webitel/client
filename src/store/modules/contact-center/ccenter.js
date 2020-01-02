import agents from './agents';
import skills from './agent-skills';
import teams from './teams';

const modules = {
    agents,
    skills,
    teams,
};

export default {
    namespaced: true,
    modules
};
