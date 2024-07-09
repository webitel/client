import { checkRouteAccess } from '../../../../../app/router/_internals/guards.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import RolesRouteNames from './_internals/RolesRouteNames.enum.js';

import PermissionsRoles from '../components/the-roles.vue';
import OpenedPermissionsRoles from '../components/opened-role.vue';


import General from '../components/opened-role-general.vue';
import ApplicationsAccess from '../components/role-applications-access/opened-role-applications-access.vue';
import Permissions from '../components/role-permissions/opened-role-permissions.vue';


const RolesRoutes = [
  {
    path: '/permissions/roles',
    name: RouteNames.ROLES,
    component: PermissionsRoles,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/permissions/roles/:id',
    name: `${RouteNames.ROLES}-edit`,
    component: OpenedPermissionsRoles,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/permissions/roles/new',
    name: `${RouteNames.ROLES}-new`,
    component: OpenedPermissionsRoles,
    beforeEnter: checkRouteAccess,
  },
];
export default RolesRoutes;
