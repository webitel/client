import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import RegionRouteNames from './_internals/RegionRouteNames.enum';

const Regions = () => import('../components/the-regions.vue');
const OpenedRegion = () => import('../components/opened-region.vue');
const OpenedRegionGeneral = () =>
	import('../components/opened-region-general.vue');

const RegionsRoutes = [
	{
		path: '/lookups/regions',
		name: RouteNames.REGIONS,
		component: Regions,
		meta: {
			WtObject: WtObject.Region,
			UiSection: AdminSections.Regions,
		},
	},
	{
		path: '/lookups/regions/:id',
		name: `${RouteNames.REGIONS}-card`,
		redirect: {
			name: RegionRouteNames.GENERAL,
		},
		component: OpenedRegion,
		meta: {
			WtObject: WtObject.Region,
			UiSection: AdminSections.Regions,
		},
		children: [
			{
				path: 'general',
				name: RegionRouteNames.GENERAL,
				component: OpenedRegionGeneral,
			},
		],
	},
];

export default RegionsRoutes;
