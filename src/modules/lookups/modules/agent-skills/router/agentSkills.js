import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import AgentSkillsRouteNames from "./_internals/AgentSkillsRouteNames.enum.js";

const AgentSkills = () => import('../components/the-agent-skills.vue');
const OpenedAgentSkill = () => import('../components/opened-agent-skill.vue');

const OpenedAgentSkillGeneral = () => import('../components/opened-agent-skill-general.vue');
const OpenedSkillAgents = () => import('../modules/agents/components/opened-skill-agents.vue');

const AgentSkillsRoutes = [
  {
    path: '/lookups/skills',
    name: RouteNames.SKILLS,
    component: AgentSkills,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/lookups/skills/:id',
    name: `${RouteNames.SKILLS}-card`,
    redirect: {name: AgentSkillsRouteNames.GENERAL},
    component: OpenedAgentSkill,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: AgentSkillsRouteNames.GENERAL,
        component: OpenedAgentSkillGeneral,
      },{
        path: 'agents',
        name: AgentSkillsRouteNames.AGENTS,
        component: OpenedSkillAgents
      }
    ],
  },
];
export default AgentSkillsRoutes;
