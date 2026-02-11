import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';

const Configuration = () => import('../components/the-configuration.vue');

const ConfigurationRoutes = [
	{
		path: '/system/configuration/:id?',
		name: RouteNames.CONFIGURATION,
		component: Configuration,
		meta: {
			WtObject: WtObject.Configuration,
			UiSection: AdminSections.Configuration,
		},
	},
];

export default ConfigurationRoutes;
