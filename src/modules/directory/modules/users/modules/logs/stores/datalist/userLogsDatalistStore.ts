import { UserLogsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { UserLogsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useUserLogsDatalistStore = createTableStore(
	`${UserLogsNamespace}/datalist`,
	{
		apiModule: UserLogsAPI,
		headers,
	},
);
