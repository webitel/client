import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import BlacklistRouteNamesEnum from "./_internals/BlacklistRouteNames.enum.js";

const Blacklists = () => import('../components/the-blacklists.vue');
const OpenedBlacklist = () => import('../components/opened-blacklist.vue');
const OpenedBlacklistGeneral = () => import('../components/opened-blacklist-general.vue');
const OpenedBlacklistNumbers = () => import('../modules/numbers/components/opened-blacklist-numbers.vue');
const PermissionsTab = () => import("../../../../_shared/permissions-tab/components/permissions-tab.vue");

const BlacklistsRoutes = [
  {
    path: '/lookups/blacklist',
    name: RouteNames.BLACKLIST,
    component: Blacklists,
    meta: {
      WtObject: WtObject.Blacklist,
      UiSection: AdminSections.Blacklist,
    },
  },
  {
    path: '/lookups/blacklist/:id',
    name: `${RouteNames.BLACKLIST}-card`,
    redirect: { name: BlacklistRouteNamesEnum.GENERAL },
    component: OpenedBlacklist,
    meta: {
      WtObject: WtObject.Blacklist,
      UiSection: AdminSections.Blacklist,
    },
    children: [
      {
        path: 'general',
        name: BlacklistRouteNamesEnum.GENERAL,
        component: OpenedBlacklistGeneral,
      }, {
        path: 'numbers/:numberId?',
        name: BlacklistRouteNamesEnum.NUMBERS,
        component: OpenedBlacklistNumbers,
      }, {
        path: 'permissions/:permissionId?',
        name: BlacklistRouteNamesEnum.PERMISSIONS,
        component: PermissionsTab,
      }
    ],
  },
];
export default BlacklistsRoutes;
