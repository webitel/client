import { AgentsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { AgentQueuesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useAgentQueuesDatalistStore = createTableStore(
	`${AgentQueuesNamespace}/datalist`,
	{
		apiModule: {
			getList: AgentsAPI.getAgentQueues,
		},
		disablePersistence: true,
		headers,
	},
);
