import { QueueHooksAPI } from '@webitel/api-services/api';
import type { EngineQueueHook } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { QueueHooksNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useQueueHooksDatalistStore = createTableStore<EngineQueueHook>(
	`${QueueHooksNamespace}/datalist`,
	{
		apiModule: QueueHooksAPI,
		/**
		 * Route persistence writes un-namespaced `filters`/`page`/`size`/`sort`
		 * keys, and every tab on the queue card shares one url.
		 */
		disablePersistence: true,
		headers,
	},
);
