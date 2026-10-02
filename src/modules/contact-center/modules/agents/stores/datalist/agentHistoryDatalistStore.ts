import { AgentsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { AgentsNamespace } from '../namespace';
import { historyHeaders } from './_internals/historyHeaders';

export const useAgentHistoryDatalistStore = createTableStore(
	`${AgentsNamespace}/history/datalist`,
	{
		apiModule: {
			getList: AgentsAPI.getAgentHistory,
		},
		headers: historyHeaders,
		disablePersistence: true,
	},
);
