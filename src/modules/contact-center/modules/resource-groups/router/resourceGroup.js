import { checkRouteAccess } from '../../../../../app/router/_internals/guards.js'
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import OpenedResourceGroup from '../components/opened-resource-group.vue';
import ResourceGroups from '../components/the-resource-groups.vue';
import ResourcesGroupsRouteNames from './_internals/ResourcesGroupsRouteNames.enum.js';

const General = () => import('../components/opened-resource-group-general.vue');
const Timerange = () => import('../components/opened-resource-group-timerange.vue');
const Resources = () => import('../modules/resources/components/opened-resource-group-resources.vue');
const PermissionsTab = () => import('../../../../_shared/permissions-tab/components/permissions-tab.vue');

const ResourceGroupRoutes = [
  {
    path: '/contact-center/resource-groups',
    name: RouteNames.RESOURCE_GROUPS,
    component: ResourceGroups,
    beforeEnter: checkRouteAccess,
  },
  {
    path: '/contact-center/resource-groups/:id',
    name: `${RouteNames.RESOURCE_GROUPS}-card`,
    redirect: { name: ResourcesGroupsRouteNames.GENERAL },
    component: OpenedResourceGroup,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: ResourcesGroupsRouteNames.GENERAL,
        component: General,
      },{
        path: 'resources/:resourceId?',
        name: ResourcesGroupsRouteNames.RESOURCES,
        component: Resources,
      },{
        path: 'time-range',
        name: ResourcesGroupsRouteNames.TIME_RANGE,
        component: Timerange,
      },{
        path: 'permissions/:permissionId?',
        name: ResourcesGroupsRouteNames.PERMISSIONS,
        component: PermissionsTab,
      }
    ],
  },
]
export default ResourceGroupRoutes;
