import { PermissionsTab } from '@webitel/ui-datalist/permissions';
import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';
import type { RouteRecordRaw } from 'vue-router';

import { RouteNames } from '../../../../../app/router/_internals/RouteNames.enum';
import ImportCsvRouteNames from './_internals/ImportCsvRouteNames.enum';

const ImportCsv = () => import('../components/the-import-csv.vue');
const OpenedImportCsv = () => import('../components/opened-import-csv.vue');

const General = () => import('../components/opened-import-csv-general.vue');
const Settings = () => import('../components/opened-import-csv-settings.vue');

const ImportCsvRoutes: RouteRecordRaw[] = [
	{
		path: '/integrations/import-csv',
		name: RouteNames.ImportCsv,
		component: ImportCsv,
		meta: {
			WtObject: WtObject.ImportCsv,
			UiSection: AdminSections.ImportCsv,
		},
	},
	{
		path: '/integrations/import-csv/:id',
		name: `${RouteNames.ImportCsv}-card`,
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
				component: PermissionsTab,
			},
		],
	},
];
export default ImportCsvRoutes;
