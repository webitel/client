import { BlacklistsAPI } from '@webitel/api-services/api';
import { createPermissionsStore } from '@webitel/ui-datalist/permissions-page';

import { BlacklistsNamespace } from '../namespace';

export const useBlacklistsPermissionsStore = createPermissionsStore(
	`${BlacklistsNamespace}/permissions`,
	{
		apiModule: BlacklistsAPI,
	},
);
