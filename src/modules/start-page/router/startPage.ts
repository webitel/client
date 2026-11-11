import type { RouteRecordRaw } from 'vue-router';

import RouteNames from '../../../app/router/_internals/RouteNames.enum';
import RoutePaths from '../../../app/router/_internals/RoutePaths';

const TheStartPage = () => import('../components/the-start-page.vue');

const StartPageRoutes: RouteRecordRaw[] = [
	{
		path: RoutePaths.StartPage,
		name: RouteNames.START,
		component: TheStartPage,
	},
];

export default StartPageRoutes;
