import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";

const Media = () => import('../components/the-media.vue');


const MediaRoutes = [
  {
    path: '/lookups/media/:mediaId?',
    name: RouteNames.MEDIA,
    component: Media,
    meta: {
      WtObject: WtObject.Media,
      UiSection: AdminSections.Media,
    },
  },
];
export default MediaRoutes;
