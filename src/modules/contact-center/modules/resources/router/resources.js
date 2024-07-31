import { checkRouteAccess } from '../../../../../app/router/_internals/guards.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import ResourcesRouteNames from './_internals/ResourcesRouteNames.enum.js';

const TheResources = () => import('../components/the-resources.vue');
const OpenedResource = () => import('../components/opened-resource.vue');
const OpenedRegionGeneral = () => import('../../../../lookups/modules/regions/components/opened-region-general.vue');
const OpenedResourceFailure = () => import('../components/opened-resource-failure.vue');
const  OpenedResourceNumbers = () => import('../modules/display/components/opened-resource-numbers.vue');
const  PermissionsTab = () => import('../../../../_shared/permissions-tab/components/permissions-tab.vue');

const ResourcesRoutes = [
  {
    path: '/contact-center/resources',
    name: RouteNames.RESOURCES,
    component: TheResources,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/contact-center/resources/:id',
    name: `${RouteNames.RESOURCES}-card`,
    redirect: { name: ResourcesRouteNames.GENERAL },
    component: OpenedResource,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: ResourcesRouteNames.GENERAL,
        component: OpenedRegionGeneral,
      },{
        path: 'numbers/:numberId?',
        name: ResourcesRouteNames.NUMBERS,
        component: OpenedResourceNumbers,
      },{
        path: 'failure',
        name: ResourcesRouteNames.FAILURE,
        component: OpenedResourceFailure,
      },{
        path: 'permissions/:permissionId?',
        name: ResourcesRouteNames.PERMISSIONS,
        component: PermissionsTab,
      }
    ],
  },
];

export default ResourcesRoutes;
