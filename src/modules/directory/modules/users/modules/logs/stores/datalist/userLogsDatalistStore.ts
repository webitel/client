import { UserLogsAPI } from '@webitel/api-services/api';
import type { LoggerLog } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { UserLogsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useUserLogsDatalistStore = createTableStore<LoggerLog>(
	`${UserLogsNamespace}/datalist`,
	{
		apiModule: UserLogsAPI,
		headers,
	},
);
