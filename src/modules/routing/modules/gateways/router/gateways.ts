import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import GatewaysRouteNames from './_internals/GatewaysRouteNames.enum';

const Gateways = () => import('../components/the-gateways.vue');
const OpenedGateway = () => import('../components/opened-gateway.vue');
const OpenedGatewayGeneral = () =>
	import('../components/opened-gateway-general.vue');
const OpenedGatewayConfiguration = () =>
	import('../components/opened-gateway-configuration.vue');

const GatewaysRoutes = [
	{
		path: '/routing/gateways',
		name: RouteNames.GATEWAYS,
		component: Gateways,
		meta: {
			WtObject: WtObject.Gateway,
			UiSection: AdminSections.Gateways,
		},
	},
	{
		path: '/routing/gateways/:id',
		name: `${RouteNames.GATEWAYS}-card`,
		redirect: {
			name: GatewaysRouteNames.GENERAL,
		},
		component: OpenedGateway,
		meta: {
			WtObject: WtObject.Gateway,
			UiSection: AdminSections.Gateways,
		},
		children: [
			{
				path: 'general',
				name: GatewaysRouteNames.GENERAL,
				component: OpenedGatewayGeneral,
			},
			{
				path: 'configuration',
				name: GatewaysRouteNames.CONFIGURATION,
				component: OpenedGatewayConfiguration,
			},
		],
	},
];
export default GatewaysRoutes;
