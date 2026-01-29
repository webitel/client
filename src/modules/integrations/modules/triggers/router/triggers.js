import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

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
    meta: {
      WtObject: WtObject.Trigger,
      UiSection: AdminSections.Triggers,
    },
  },
  {
    path: '/integrations/triggers/:id',
    name: `${RouteNames.TRIGGERS}-card`,
    redirect: { name: TriggersRouteNames.GENERAL },
    component: OpenedTrigger,
    meta: {
      WtObject: WtObject.Trigger,
      UiSection: AdminSections.Triggers,
    },
    children: [
      {
        path: 'general',
        name: TriggersRouteNames.GENERAL,
        component: General,
      }, {
        path: 'variables',
        name: TriggersRouteNames.VARIABLES,
        component: Variables,
      }, {
        path: 'running-history',
        name: TriggersRouteNames.RUNNING_HISTORY,
        component: Logs,
      },
    ],
  },
];
export default TriggersRoutes;
