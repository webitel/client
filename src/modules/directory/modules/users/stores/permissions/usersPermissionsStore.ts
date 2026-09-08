import { UsersAPI } from '@webitel/api-services/api';
import { createPermissionsStore } from '@webitel/ui-datalist/permissions-page';

import { UsersNamespace } from '../namespace';

export const useUsersPermissionsStore = createPermissionsStore(
	`${UsersNamespace}/permissions`,
	{
		apiModule: UsersAPI,
	},
);
