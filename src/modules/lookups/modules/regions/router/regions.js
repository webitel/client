import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import RegionRouteNames from "./_internals/RegionRouteNames.enum.js";

const Regions = () => import('../components/the-regions.vue');
const OpenedRegion = () => import('../components/opened-region.vue');
const OpenedRegionGeneral = () => import('../components/opened-region-general.vue');


const RegionsRoutes = [
  {
    path: '/lookups/regions',
    name: RouteNames.REGIONS,
    component: Regions,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/lookups/regions/:id',
    name: `${RouteNames.REGIONS}-card`,
    redirect: {name: RegionRouteNames.GENERAL},
    component: OpenedRegion,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: RegionRouteNames.GENERAL,
        component: OpenedRegionGeneral,
      }
    ],
  },
];
export default RegionsRoutes;
