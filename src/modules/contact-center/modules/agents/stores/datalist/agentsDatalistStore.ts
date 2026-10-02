import { AgentsAPI } from '@webitel/api-services/api';
import type { EngineAgent } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { AgentsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useAgentsDatalistStore = createTableStore<EngineAgent>(
	`${AgentsNamespace}/datalist`,
	{
		apiModule: AgentsAPI,
		headers,
	},
);
