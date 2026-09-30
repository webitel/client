import { AgentSubordinatesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { AgentSubordinatesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useAgentSubordinatesDatalistStore = createTableStore(
	`${AgentSubordinatesNamespace}/datalist`,
	{
		apiModule: AgentSubordinatesAPI,
		disablePersistence: true,
		headers,
	},
);
