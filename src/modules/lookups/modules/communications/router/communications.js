import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import CommunicationsRouteNamesEnum from "./_internals/CommunicationsRouteNames.enum.js";

const CommunicationTypes = () => import('../components/the-communication-types.vue');
const OpenedCommunicationType = () => import('../components/opened-communication-type.vue');
const OpenedCommunicationTypeGeneral = () => import('../components/opened-communication-type-general.vue');


const CommunicationsRoutes = [
  {
    path: '/lookups/communications',
    name: RouteNames.COMMUNICATIONS,
    component: CommunicationTypes,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/lookups/communications/:id',
    name: `${RouteNames.COMMUNICATIONS}-card`,
    redirect: {name: CommunicationsRouteNamesEnum.GENERAL},
    component: OpenedCommunicationType,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: CommunicationsRouteNamesEnum.GENERAL,
        component: OpenedCommunicationTypeGeneral,
      }
    ],
  },
];
export default CommunicationsRoutes;
