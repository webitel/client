import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import FlowRouteNames from './_internals/FlowRouteNames.enum';

const Flow = () => import('../components/the-flow.vue');
const OpenedFlow = () => import('../components/opened-flow.vue');
const OpenedFlowCode = () => import('../components/code/opened-flow-code.vue');

const FlowRoutes = [
	{
		path: '/routing/flow',
		name: RouteNames.FLOW,
		component: Flow,
		meta: {
			WtObject: WtObject.Flow,
			UiSection: AdminSections.Flow,
		},
	},
	{
		path: '/routing/flow/:id',
		name: `${RouteNames.FLOW}-card`,
		redirect: {
			name: FlowRouteNames.GENERAL,
		},
		component: OpenedFlow,
		meta: {
			WtObject: WtObject.Flow,
			UiSection: AdminSections.Flow,
		},
		children: [
			{
				path: 'general',
				name: FlowRouteNames.GENERAL,
				component: OpenedFlowCode,
			},
		],
	},
];
export default FlowRoutes;
