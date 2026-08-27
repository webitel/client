import { QueueResGroupsAPI } from '@webitel/api-services/api';
import type { EngineQueueResourceGroup } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { QueueResGroupsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useQueueResGroupsDatalistStore =
	createTableStore<EngineQueueResourceGroup>(
		`${QueueResGroupsNamespace}/datalist`,
		{
			apiModule: QueueResGroupsAPI,
			disablePersistence: true,
			headers,
		},
	);
