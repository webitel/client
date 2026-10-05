import { createTableStore } from '@webitel/ui-datalist';

import { AgentSubordinatesAPI } from '../../api/agentSubordinates';
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
