import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

const TheConfiguration = () => import('../components/the-configuration.vue');

const ConfigurationRoutes = [
	{
		path: '/system/configuration/:id?',
		name: RouteNames.CONFIGURATION,
		component: TheConfiguration,
		meta: {
			WtObject: WtObject.Configuration,
			UiSection: AdminSections.Configuration,
		},
	},
];

export default ConfigurationRoutes;
