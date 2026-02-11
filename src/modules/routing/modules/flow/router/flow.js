import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import FlowRouteNames from './_internals/FlowRouteNames.enum.js';

const Flow = () => import('../components/the-flow.vue');
const OpenedFlow = () => import('../components/opened-flow.vue');
const OpenedFlowDiagram = () =>
	import('../modules/diagram/components/opened-flow-diagram.vue');

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
				component: OpenedFlowDiagram,
			},
		],
	},
];
export default FlowRoutes;
