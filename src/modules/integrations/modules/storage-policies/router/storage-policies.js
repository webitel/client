import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import StoragePoliciesRouteNames from './_internals/StoragePoliciesRouteNames.enum.js';

const StoragePolicies = () => import('../components/the-storage-policies.vue');
const OpenedStoragePolicy = () => import('../components/opened-storage-policy.vue');
const General = () => import('../components/opened-storage-policy-general.vue');

const StoragePoliciesRoutes = [
  {
    path: '/integrations/storage-policies',
    name: RouteNames.STORAGE_POLICIES,
    component: StoragePolicies,
    meta: {
      WtObject: WtObject.FilePolicy,
      UiSection: AdminSections.StoragePolicies,
    },
  },
  {
    path: '/integrations/storage-policies/:id',
    name: `${RouteNames.STORAGE_POLICIES}-card`,
    redirect: { name: StoragePoliciesRouteNames.GENERAL },
    component: OpenedStoragePolicy,
    meta: {
      WtObject: WtObject.FilePolicy,
      UiSection: AdminSections.StoragePolicies,
    },
    children: [
      {
        path: 'general',
        name: StoragePoliciesRouteNames.GENERAL,
        component: General,
      },
    ],
  },
];

export default StoragePoliciesRoutes;
