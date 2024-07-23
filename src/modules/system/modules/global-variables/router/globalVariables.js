import { checkRouteAccess } from '../../../../../app/router/_internals/guards.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';

const GlobalVariables =() => import('../components/the-global-variables.vue');

const GlobalVariablesRoutes = [
  {
    path: '/system/global-variables/:id?',
    name: RouteNames.GLOBAL_VARIABLES,
    component: GlobalVariables,
    beforeEnter: checkRouteAccess,
  },
];
export default GlobalVariablesRoutes
