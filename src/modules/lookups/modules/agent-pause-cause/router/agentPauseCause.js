import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import AgentPauseCauseRouteNames from "./_internals/AgentPauseCauseRouteNames.enum.js";

const AgentPauseCause = () => import('../components/the-agent-pause-cause.vue');
const OpenedAgentPauseCause = () => import('../components/opened-agent-pause-cause.vue');

const OpenedAgentPauseCauseGeneral = () => import('../components/opened-agent-pause-cause-general.vue');

const AgentPauseCauseRoutes = [
  {
    path: '/lookups/pause-cause',
    name: RouteNames.PAUSE_CAUSE,
    component: AgentPauseCause,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/lookups/pause-cause/:id',
    name: `${RouteNames.PAUSE_CAUSE}-edit`,
    redirect: {name: AgentPauseCauseRouteNames.GENERAL},
    component: OpenedAgentPauseCause,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: AgentPauseCauseRouteNames.GENERAL,
        component: OpenedAgentPauseCauseGeneral,
      }
    ],
  },
];
export default AgentPauseCauseRoutes;
