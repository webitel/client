import { TeamFlowsAPI } from '@webitel/api-services/api';
import type { EngineTeamTrigger } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { TeamFlowsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useTeamFlowsDatalistStore = createTableStore<EngineTeamTrigger>(
	`${TeamFlowsNamespace}/datalist`,
	{
		apiModule: TeamFlowsAPI,
		disablePersistence: true,
		headers,
	},
);
