import { checkRouteAccess } from '../../../../../app/router/_internals/guards.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';

const Configuration = () => import('../components/the-configuration.vue');

const ConfigurationRoutes = [
  {
    path: '/system/configuration/:id?',
    name: RouteNames.CONFIGURATION,
    component: Configuration,
    beforeEnter: checkRouteAccess,
  },
]

export default ConfigurationRoutes;
