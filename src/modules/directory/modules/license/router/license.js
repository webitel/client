import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import LicencesRouteNames from './_internals/LicencesRouteNames.enum.js';

const License = () => import('../components/the-license.vue');
const AllLicenses = () => import('../components/all-licenses/all-licenses.vue');
const LicensesByUser = () => import('../modules/users/components/licenses-by-user.vue');

const LicenseRoutes = [
  {
    path: '/directory/license',
    name: RouteNames.LICENSE,
    component: License,
    redirect: { name: `${LicencesRouteNames.ALL}-card` },
    meta: {
      WtObject: WtObject.License,
      UiSection: AdminSections.License,
    },
    children: [
      {
        path: 'all/:id?',
        name: `${LicencesRouteNames.ALL}-card`,
        component: AllLicenses,
      }, {
        path: 'by-user',
        name: LicencesRouteNames.BY_USER,
        component: LicensesByUser,
      }
    ],
  },
];

export default LicenseRoutes;
