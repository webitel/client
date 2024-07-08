import { checkRouteAccess } from '../../../../../app/router/_internals/guards.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import TeamsRouteNames from './_internals/TeamsRouteNames.enum.js';

import Teams from '../components/the-teams.vue';
import OpenedTeam from '../components/opened-team.vue';
const OpenedTeamGeneral = () => import('../components/opened-team-general.vue');
const OpenedTeamParameters = () => import('../components/opened-team-parameters.vue');
const OpenedTeamSupervisors = () => import('../modules/supervisors/components/opened-team-supervisors.vue');
const OpenedTeamAgents = () => import('../modules/agents/components/opened-team-agents.vue');
const OpenedTeamHooks = () => import('../modules/hooks/components/opened-team-hooks.vue');
const OpenedTeamFlows = () => import('../modules/flow/components/opened-team-flows.vue');
const PermissionsTab = () => import('../../../../_shared/permissions-tab/components/permissions-tab.vue');

const TeamsRoutes = [
  {
    path: '/contact-center/teams',
    name: RouteNames.TEAMS,
    component: Teams,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/contact-center/teams/:id',
    name: `${RouteNames.TEAMS}-card`,
    component: OpenedTeam,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: TeamsRouteNames.GENERAL,
        component: OpenedTeamGeneral,
      },{
        path: 'parameters',
        name: TeamsRouteNames.PARAMETERS,
        component: OpenedTeamParameters,
      },{
        path: 'supervisors/:supervisorId?',
        name: TeamsRouteNames.SUPERVISORS,
        component: OpenedTeamSupervisors,
      },{
        path: 'agents/:agentId?',
        name: TeamsRouteNames.AGENTS,
        component: OpenedTeamAgents,
      },{
        path: 'hooks/:hookId?',
        name: TeamsRouteNames.HOOKS,
        component: OpenedTeamHooks,
      },{
        path: 'flow-schemas/:flowId?',
        name: TeamsRouteNames.FLOWS,
        component: OpenedTeamFlows,
      },{
        path: 'permissions/:permissionId?',
        name: TeamsRouteNames.PERMISSIONS,
        component: PermissionsTab,
      }
    ],
  },
];

export default TeamsRoutes;
