import { QueueLogsAPI } from '@webitel/api-services/api';
import type { EngineAttemptHistory } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { QueueLogsNamespace } from '../namespace';
import { headers } from './_internals/headers';

/**
 * Read-only. Unlike the card's other tabs this one keeps persistence: it is a
 * report, a filtered view of it is worth sharing as a url, and no sibling tab
 * writes those keys.
 */
export const useQueueLogsDatalistStore = createTableStore<EngineAttemptHistory>(
	`${QueueLogsNamespace}/datalist`,
	{
		apiModule: QueueLogsAPI,
		headers,
	},
);
