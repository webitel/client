import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import CommunicationsRouteNamesEnum from './_internals/CommunicationsRouteNames.enum.js';

const CommunicationTypes = () =>
	import('../components/the-communication-types.vue');
const OpenedCommunicationType = () =>
	import('../components/opened-communication-type.vue');
const OpenedCommunicationTypeGeneral = () =>
	import('../components/opened-communication-type-general.vue');

const CommunicationsRoutes = [
	{
		path: '/lookups/communications',
		name: RouteNames.COMMUNICATIONS,
		component: CommunicationTypes,
		meta: {
			WtObject: WtObject.Communication,
			UiSection: AdminSections.Communications,
		},
	},
	{
		path: '/lookups/communications/:id',
		name: `${RouteNames.COMMUNICATIONS}-card`,
		redirect: {
			name: CommunicationsRouteNamesEnum.GENERAL,
		},
		component: OpenedCommunicationType,
		meta: {
			WtObject: WtObject.Communication,
			UiSection: AdminSections.Communications,
		},
		children: [
			{
				path: 'general',
				name: CommunicationsRouteNamesEnum.GENERAL,
				component: OpenedCommunicationTypeGeneral,
			},
		],
	},
];
export default CommunicationsRoutes;
