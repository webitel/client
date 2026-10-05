import { QueueBucketsAPI } from '@webitel/api-services/api';
import type { EngineQueueBucket } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { QueueBucketsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useQueueBucketsDatalistStore = createTableStore<EngineQueueBucket>(
	`${QueueBucketsNamespace}/datalist`,
	{
		apiModule: QueueBucketsAPI,
		// every tab on the queue card shares one url — see the hooks store
		disablePersistence: true,
		headers,
	},
);
