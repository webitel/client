import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import ImportCsvRouteNames from './_internals/ImportCsvRouteNames.enum.js';

const ImportCsv = () => import('../components/the-import-csv.vue');
const OpenedImportCsv = () => import('../components/opened-import-csv.vue');

const General = () => import('../components/opened-import-csv-general.vue');
const Settings = () => import('../components/opened-import-csv-settings.vue');
const Permissions = () =>
	import('../../../../_shared/permissions-tab/components/permissions-tab.vue');

const ImportCsvRoutes = [
	{
		path: '/integrations/import-csv',
		name: RouteNames.IMPORT_CSV,
		component: ImportCsv,
		meta: {
			WtObject: WtObject.ImportCsv,
			UiSection: AdminSections.ImportCsv,
		},
	},
	{
		path: '/integrations/import-csv/:id',
		name: `${RouteNames.IMPORT_CSV}-card`,
		component: OpenedImportCsv,
		redirect: {
			name: ImportCsvRouteNames.GENERAL,
		},
		meta: {
			WtObject: WtObject.ImportCsv,
			UiSection: AdminSections.ImportCsv,
		},
		children: [
			{
				path: 'general',
				name: ImportCsvRouteNames.GENERAL,
				component: General,
			},
			{
				path: 'settings',
				name: ImportCsvRouteNames.SETTINGS,
				component: Settings,
			},
			{
				path: 'permissions/:permissionId?',
				name: ImportCsvRouteNames.PERMISSIONS,
				component: Permissions,
			},
		],
	},
];
export default ImportCsvRoutes;
