import { AgentPauseCausesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { AgentPauseCauseNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useAgentPauseCauseDatalistStore = createTableStore(
	`${AgentPauseCauseNamespace}/datalist`,
	{
		apiModule: AgentPauseCausesAPI,
		headers,
	},
);
