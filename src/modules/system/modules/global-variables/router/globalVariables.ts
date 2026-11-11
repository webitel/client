import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';
import type { RouteRecordRaw } from 'vue-router';

import { RouteNames } from '../../../../../app/router/_internals/RouteNames.enum';

const GlobalVariables = () => import('../components/the-global-variables.vue');

const GlobalVariablesRoutes: RouteRecordRaw[] = [
	{
		path: '/system/global-variables/:id?',
		name: RouteNames.GlobalVariables,
		component: GlobalVariables,
		meta: {
			WtObject: WtObject.GlobalVariable,
			UiSection: AdminSections.GlobalVariables,
		},
	},
];
export default GlobalVariablesRoutes;
