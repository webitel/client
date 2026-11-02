import { ConfigLogsAPI } from '@webitel/api-services/api';
import type { LoggerLog } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { ChangelogLogsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useChangelogLogsDatalistStore = createTableStore<LoggerLog>(
	`${ChangelogLogsNamespace}/datalist`,
	{
		apiModule: ConfigLogsAPI,
		headers,
	},
);
