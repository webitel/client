import { UsersAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { UsersNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useUsersDatalistStore = createTableStore(
	`${UsersNamespace}/datalist`,
	{
		apiModule: UsersAPI,
		headers,
	},
);
