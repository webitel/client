import { QueuesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';
import type { Queue } from '../../types/Queue';

import { QueuesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useQueuesDatalistStore = createTableStore<Queue>(
	`${QueuesNamespace}/datalist`,
	{
		apiModule: QueuesAPI,
		headers,
	},
);
