import { QueueAgentsAPI } from '@webitel/api-services/api';
import type { EngineAgent } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { QueueAgentsNamespace } from '../namespace';
import { headers } from './_internals/headers';

/**
 * Read-only: membership is edited from the agent side, so there is no card
 * store and no popup. `createTableStore` only requires `getList`.
 */
export const useQueueAgentsDatalistStore = createTableStore<EngineAgent>(
	`${QueueAgentsNamespace}/datalist`,
	{
		apiModule: QueueAgentsAPI,
		// every tab on the queue card shares one url — see the hooks store
		disablePersistence: true,
		headers,
	},
);
