import { AdminSections, WtObject } from '@webitel/ui-sdk/enums';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import OpenedChangelog from '../components/opened-changelog.vue';
import OpenedChangelogGeneral from '../components/opened-changelog-general.vue';
import Changelogs from '../components/the-changelogs.vue';
import OpenedChangelogLogs from '../modules/logs/components/opened-changelog-logs.vue';
import ChangelogsRouteNames from './_internals/ChangelogsRouteNames.enum.js';

const ChangeLogsRoutes = [
	{
		path: '/system/changelogs',
		name: RouteNames.CHANGELOGS,
		component: Changelogs,
		meta: {
			WtObject: WtObject.ChangeLog,
			UiSection: AdminSections.Changelogs,
		},
	},
	{
		path: '/system/changelogs/:id',
		name: `${RouteNames.CHANGELOGS}-card`,
		redirect: {
			name: ChangelogsRouteNames.GENERAL,
		},
		component: OpenedChangelog,
		meta: {
			WtObject: WtObject.ChangeLog,
			UiSection: AdminSections.Changelogs,
		},
		children: [
			{
				path: 'general',
				name: ChangelogsRouteNames.GENERAL,
				component: OpenedChangelogGeneral,
			},
			{
				path: 'logs',
				name: ChangelogsRouteNames.LOGS,
				component: OpenedChangelogLogs,
			},
		],
	},
];

export default ChangeLogsRoutes;
