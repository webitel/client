import { checkRouteAccess } from '../../../../../app/router/_internals/guards.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import ImportCsvRouteNames from './_internals/ImportCsvRouteNames.enum.js';

const ImportCsv = () => import('../components/the-import-csv.vue');
const OpenedImportCsv = () => import('../components/opened-import-csv.vue');

const General = () => import('../components/opened-import-csv-general.vue');
const Settings = () => import('../components/opened-import-csv-settings.vue');
const Permissions = () => import('../../../../_shared/permissions-tab/components/permissions-tab.vue');



const ImportCsvRoutes = [
  {
    path: '/integrations/import-csv',
    name: RouteNames.IMPORT_CSV,
    component: ImportCsv,
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'uploadCSV',
        meta: { uploadCsv: true},
        name: ImportCsvRouteNames.UPLOAD_CSV,
        component: ImportCsv,
      },
    ],
  },
  {
    path: '/integrations/import-csv/:id',
    name: `${RouteNames.IMPORT_CSV}-card`,
    component: OpenedImportCsv,
    redirect: { name: ImportCsvRouteNames.GENERAL },
    beforeEnter: checkRouteAccess,
    children: [
      {
        path: 'general',
        name: ImportCsvRouteNames.GENERAL,
        component: General,
      },{
        path: 'settings',
        name: ImportCsvRouteNames.SETTINGS,
        component: Settings,
      },{
        path: 'permissions/:permissionId?',
        name: ImportCsvRouteNames.PERMISSIONS,
        component: Permissions,
      },
    ],
  },
]
export default ImportCsvRoutes;
