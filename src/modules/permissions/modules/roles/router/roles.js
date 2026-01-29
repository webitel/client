import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import RolesRouteNames from './_internals/RolesRouteNames.enum.js';

const PermissionsRoles = () => import('../components/the-roles.vue');
const OpenedPermissionsRoles = () => import('../components/opened-role.vue');


const General = () => import('../components/opened-role-general.vue');
const ApplicationsAccess = () => import('../components/role-applications-access/opened-role-applications-access.vue');
const Permissions = () => import('../components/role-permissions/opened-role-permissions.vue');


const RolesRoutes = [
  {
    path: '/permissions/roles',
    name: RouteNames.ROLES,
    component: PermissionsRoles,
    meta: {
      WtObject: WtObject.Role,
      UiSection: AdminSections.Roles,
    },
  },
  {
    path: '/permissions/roles/:id',
    name: `${RouteNames.ROLES}-card`,
    redirect: { name: RolesRouteNames.GENERAL },
    component: OpenedPermissionsRoles,
    meta: {
      WtObject: WtObject.Role,
      UiSection: AdminSections.Roles,
    },
    children: [
      {
        path: 'general',
        name: RolesRouteNames.GENERAL,
        component: General,
      }, {
        path: 'applications-access/:applicationName?',
        name: RolesRouteNames.APPLICATIONS_ACCESS,
        component: ApplicationsAccess,
      }, {
        path: 'role-permissions/:permissionIndex?',
        name: RolesRouteNames.ROLE_PERMISSIONS,
        component: Permissions,
      }
    ]
  },
];
export default RolesRoutes;
