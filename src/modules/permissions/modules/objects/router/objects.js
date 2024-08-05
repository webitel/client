import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import {checkRouteAccess} from "../../../../../app/router/_internals/guards.js";
import ObjectsRouteNames from "./_internals/ObjectsRouteNames.enum.js";

const TheObjectsPermissions = () => import("../components/the-objects-permissions.vue");
const OpenedObjectPermissions = () => import("../components/opened-object-permissions.vue");

const Obac = () => import('../modules/obac/components/opened-object-permissions-obac.vue');
const Rbac = () => import('../modules/rbac/components/opened-object-permissions-rbac.vue');

const ObjectsRoutes = [
  {
    path: '/permissions/objects',
    name: RouteNames.OBJECTS,
    component: TheObjectsPermissions,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/permissions/objects/:id',
    name: `${RouteNames.OBJECTS}-card`,
    redirect: {name: ObjectsRouteNames.OBAC},
    component: OpenedObjectPermissions,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'obac/:permissionId?',
        name: ObjectsRouteNames.OBAC,
        component: Obac
      },{
        path: 'rbac/:permissionId?',
        name: ObjectsRouteNames.RBAC,
        component: Rbac,
      }
    ],
  },
];

export default ObjectsRoutes;
