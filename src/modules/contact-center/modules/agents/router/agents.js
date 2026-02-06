import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import AgentsRouteNames from "./_internals/AgentsRouteNames.enum.js";

const Agents = () => import('../components/the-agents.vue');
const Agent = () => import('../components/opened-agent.vue');
const General = () => import("../components/opened-agent-general.vue");
const Skills = () => import("../modules/skills/components/opened-agent-skills.vue");
const Queues = () => import("../modules/queues/components/opened-agent-queues.vue");
const Subordinates = () => import("../modules/subordinates/components/opened-agent-subordinates.vue");
const Permissions = () => import("../../../../_shared/permissions-tab/components/permissions-tab.vue");


const AgentRoutes = [
  {
    path: '/contact-center/agents',
    name: RouteNames.AGENTS,
    component: Agents,
    meta: {
      WtObject: WtObject.Agent,
      UiSection: AdminSections.Agents,
    },
    children: [
      {
        path: 'history/:historyId?',
        name: AgentsRouteNames.HISTORY,
        component: Agents,
      },
    ],
  },
  {
    path: '/contact-center/agents/:id',
    name: `${RouteNames.AGENTS}-card`,
    redirect: { name: AgentsRouteNames.GENERAL },
    component: Agent,
    meta: {
      WtObject: WtObject.Agent,
      UiSection: AdminSections.Agents,
    },
    children: [
      {
        path: 'general',
        name: AgentsRouteNames.GENERAL,
        component: General,
      }, {
        path: 'skills/:skillId?',
        name: AgentsRouteNames.SKILLS,
        component: Skills,
      }, {
        path: 'queues',
        name: AgentsRouteNames.QUEUES,
        component: Queues,
      }, {
        path: 'subordinates/:subordinateId?',
        name: AgentsRouteNames.SUBORDINATES,
        component: Subordinates,
      }, {
        path: 'permissions/:permissionId?',
        name: AgentsRouteNames.PERMISSIONS,
        component: Permissions,
      }
    ],
  },
]

export default AgentRoutes;
