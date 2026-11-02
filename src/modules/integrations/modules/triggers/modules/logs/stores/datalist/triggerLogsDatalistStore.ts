import { TriggerJobsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { TriggerLogsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useTriggerLogsDatalistStore = createTableStore(
	`${TriggerLogsNamespace}/datalist`,
	{
		apiModule: TriggerJobsAPI,
		headers,
	},
);
