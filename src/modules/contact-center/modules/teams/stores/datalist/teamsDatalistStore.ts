import { TeamsAPI } from '@webitel/api-services/api';
import type { EngineAgentTeam } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { TeamsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useTeamsDatalistStore = createTableStore<EngineAgentTeam>(
	`${TeamsNamespace}/datalist`,
	{
		apiModule: TeamsAPI,
		headers,
	},
);
