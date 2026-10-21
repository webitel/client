import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import SingleSignOnRouteNames from './_internals/SingleSignOnRouteNames.enum';

const TheSingleSignOn = () => import('../components/the-single-sign-on.vue');
const OpenedSingleSignOn = () =>
	import('../components/opened-single-sign-on.vue');
const General = () => import('../components/opened-single-sign-on-general.vue');
const Mapping = () => import('../components/opened-single-sign-on-mapping.vue');

import { PermissionsTab } from '@webitel/ui-datalist/permissions';

const SingleSignOnRoutes = [
	{
		path: '/integrations/single-sign-on',
		name: RouteNames.SINGLE_SIGN_ON,
		component: TheSingleSignOn,
		meta: {
			WtObject: WtObject.SingleSignOn,
			UiSection: AdminSections.SingleSignOn,
		},
	},
	{
		path: '/integrations/single-sign-on/:id',
		name: `${RouteNames.SINGLE_SIGN_ON}-card`,
		redirect: {
			name: SingleSignOnRouteNames.GENERAL,
		},
		component: OpenedSingleSignOn,
		meta: {
			WtObject: WtObject.SingleSignOn,
			UiSection: AdminSections.SingleSignOn,
		},
		children: [
			{
				path: 'general',
				name: SingleSignOnRouteNames.GENERAL,
				component: General,
			},
			{
				path: 'mapping',
				name: SingleSignOnRouteNames.MAPPING,
				component: Mapping,
			},
			{
				path: 'permissions/:permissionId?',
				name: SingleSignOnRouteNames.PERMISSIONS,
				component: PermissionsTab,
			},
		],
	},
];

export default SingleSignOnRoutes;
