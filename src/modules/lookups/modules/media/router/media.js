import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";

const Media = () => import('../components/the-media.vue');


const MediaRoutes = [
  {
    path: '/lookups/media/:mediaId?',
    name: RouteNames.MEDIA,
    component: Media,
    beforeEnter: checkRouteAccess,
  },
];
export default MediaRoutes;
