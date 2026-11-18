import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';
import type { RouteRecordRaw } from 'vue-router';

import { RouteNames } from '../../../../../app/router/_internals/RouteNames.enum';
import CommunicationsRouteNamesEnum from './_internals/CommunicationsRouteNames.enum';

const CommunicationTypes = () =>
	import('../components/the-communication-types.vue');
const OpenedCommunicationType = () =>
	import('../components/opened-communication-type.vue');
const OpenedCommunicationTypeGeneral = () =>
	import('../components/opened-communication-type-general.vue');

const CommunicationsRoutes: RouteRecordRaw[] = [
	{
		path: '/lookups/communications',
		name: RouteNames.Communications,
		component: CommunicationTypes,
		meta: {
			WtObject: WtObject.Communication,
			UiSection: AdminSections.Communications,
		},
	},
	{
		path: '/lookups/communications/:id',
		name: `${RouteNames.Communications}-card`,
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
