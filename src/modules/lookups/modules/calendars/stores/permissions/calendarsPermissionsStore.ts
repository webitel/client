import { CalendarsAPI } from '@webitel/api-services/api';
import { createPermissionsStore } from '@webitel/ui-datalist/permissions-page';

import { CalendarsNamespace } from '../namespace';

export const useCalendarsPermissionsStore = createPermissionsStore(
	`${CalendarsNamespace}/permissions`,
	{
		apiModule: CalendarsAPI,
	},
);
