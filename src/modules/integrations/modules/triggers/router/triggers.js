import { checkRouteAccess } from '../../../../../app/router/_internals/guards.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import TriggersRouteNames from './_internals/TriggersRouteNames.enum.js';

const Triggers = () => import('../components/the-triggers.vue');
const OpenedTrigger = () => import('../components/opened-trigger.vue');

const Logs = () => import('../modules/logs/components/opened-trigger-logs.vue');
const General = () => import('../components/opened-trigger-general.vue');
const Variables = () => import('../components/opened-trigger-variables.vue');


const TriggersRoutes = [
  {
    path: '/integrations/triggers',
    name: RouteNames.TRIGGERS,
    component: Triggers,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/integrations/triggers/:id',
    name: `${RouteNames.TRIGGERS}-card`,
    redirect: {name: TriggersRouteNames.GENERAL},
    component: OpenedTrigger,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: TriggersRouteNames.GENERAL,
        component: General,
      },{
        path: 'variables',
        name: TriggersRouteNames.VARIABLES,
        component: Variables,
      },{
        path: 'running-history',
        name: TriggersRouteNames.RUNNING_HISTORY,
        component: Logs,
      },
    ],
  },
];
export default TriggersRoutes;
