import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

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
    meta: {
      WtObject: WtObject.Skill,
      UiSection: AdminSections.Skills,
    },
  },
  {
    path: '/lookups/skills/:id',
    name: `${RouteNames.SKILLS}-card`,
    redirect: { name: AgentSkillsRouteNames.GENERAL },
    component: OpenedAgentSkill,
    meta: {
      WtObject: WtObject.Skill,
      UiSection: AdminSections.Skills,
    },
    children: [
      {
        path: 'general',
        name: AgentSkillsRouteNames.GENERAL,
        component: OpenedAgentSkillGeneral,
      }, {
        path: 'agents',
        name: AgentSkillsRouteNames.AGENTS,
        component: OpenedSkillAgents
      }
    ],
  },
];
export default AgentSkillsRoutes;
