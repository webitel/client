import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import WorkingConditionsRouteNamesEnum
  from './_internals/WorkingConditionsRouteNames.enum.js';

const WorkingConditions = () => import('../components/the-working-conditions.vue');
const OpenedWorkingCondition = () => import('../components/opened-working-condition.vue');

const OpenedWorkingConditionGeneral = () => import('../components/opened-working-condition-general.vue');


const WorkingConditionsRoutes = [
  {
    path: '/lookups/working-conditions',
    name: RouteNames.WORKING_CONDITIONS,
    component: WorkingConditions,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/lookups/working-conditions/:id',
    name: `${RouteNames.WORKING_CONDITIONS}-card`,
    redirect: {name: WorkingConditionsRouteNamesEnum.GENERAL},
    component: OpenedWorkingCondition,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: WorkingConditionsRouteNamesEnum.GENERAL,
        component: OpenedWorkingConditionGeneral,
      }
    ],
  },
];
export default WorkingConditionsRoutes;
