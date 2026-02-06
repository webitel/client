import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import AgentPauseCauseRouteNames from "./_internals/AgentPauseCauseRouteNames.enum.js";

const AgentPauseCause = () => import('../components/the-agent-pause-cause.vue');
const OpenedAgentPauseCause = () => import('../components/opened-agent-pause-cause.vue');

const OpenedAgentPauseCauseGeneral = () => import('../components/opened-agent-pause-cause-general.vue');

const AgentPauseCauseRoutes = [
  {
    path: '/lookups/pause-cause',
    name: RouteNames.PAUSE_CAUSE,
    component: AgentPauseCause,
    meta: {
      WtObject: WtObject.PauseCause,
      UiSection: AdminSections.PauseCause,
    },
  },
  {
    path: '/lookups/pause-cause/:id',
    name: `${RouteNames.PAUSE_CAUSE}-edit`,
    redirect: { name: AgentPauseCauseRouteNames.GENERAL },
    component: OpenedAgentPauseCause,
    meta: {
      WtObject: WtObject.PauseCause,
      UiSection: AdminSections.PauseCause,
    },
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
