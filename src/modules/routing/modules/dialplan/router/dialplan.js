import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import DialplanRouteNames from "./_internals/DialplanRouteNames.enum.js";

const Dialplan = () => import('../components/the-dialplan.vue');
const OpenedDialplan = () => import('../components/opened-dialplan.vue');
const OpenedDialplanGeneral = () => import('../components/opened-dialplan-general.vue');


const DialplanRoutes = [
  {
    path: '/routing/dialplan',
    name: RouteNames.DIALPLAN,
    component: Dialplan,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/routing/dialplan/:id',
    name: `${RouteNames.DIALPLAN}-card`,
    redirect: { name: DialplanRouteNames.GENERAL },
    component: OpenedDialplan,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: DialplanRouteNames.GENERAL,
        component: OpenedDialplanGeneral,
      }
    ],
  },
];
export default DialplanRoutes;
