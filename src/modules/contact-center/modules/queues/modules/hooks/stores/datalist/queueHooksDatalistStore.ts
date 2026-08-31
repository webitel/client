import { QueueHooksAPI } from '@webitel/api-services/api';
import type { EngineQueueHook } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { QueueHooksNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useQueueHooksDatalistStore = createTableStore<EngineQueueHook>(
	`${QueueHooksNamespace}/datalist`,
	{
		apiModule: QueueHooksAPI,
		disablePersistence: true,
		headers,
	},
);
