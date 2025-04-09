import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import BucketsRouteNamesEnum from "./_internals/BucketsRouteNames.enum.js";

const Buckets = () => import('../components/the-buckets.vue');
const OpenedBucket = () => import('../components/opened-bucket.vue');

const OpenedBucketGeneral = () => import('../components/opened-bucket-general.vue');


const BucketsRoutes = [
  {
    path: '/lookups/buckets',
    name: RouteNames.BUCKETS,
    component: Buckets,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/lookups/buckets/:id',
    name: `${RouteNames.BUCKETS}-card`,
    redirect: {name: BucketsRouteNamesEnum.GENERAL},
    component: OpenedBucket,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: BucketsRouteNamesEnum.GENERAL,
        component: OpenedBucketGeneral,
      }
    ],
  },
];
export default BucketsRoutes;
