import { checkRouteAccess } from "../../../../../app/router/_internals/guards.js";
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import QuickRepliesRouteNamesEnum from "./_internals/QuickRepliesRouteNames.enum.js";

const QuickReplies = () => import('../components/the-quick-replies.vue');
const OpenedQuickReply = () => import('../components/opened-quick-reply.vue');

const OpenedQuickReplyGeneral = () => import('../components/opened-quick-reply-general.vue');


const QuickRepliesRoutes = [
  {
    path: '/lookups/quick-replies',
    name: RouteNames.QUICK_REPLIES,
    component: QuickReplies,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/lookups/quick-replies/:id',
    name: `${RouteNames.QUICK_REPLIES}-card`,
    redirect: {name: QuickRepliesRouteNamesEnum.GENERAL},
    component: OpenedQuickReply,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: QuickRepliesRouteNamesEnum.GENERAL,
        component: OpenedQuickReplyGeneral,
      }
    ],
  },
];
export default QuickRepliesRoutes;
