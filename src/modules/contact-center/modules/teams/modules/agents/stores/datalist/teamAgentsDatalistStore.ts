import { createTableStore } from '@webitel/ui-datalist';

import { TeamAgentsAPI } from '../../api/teamAgents';
import { TeamAgentsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useTeamAgentsDatalistStore = createTableStore(
	`${TeamAgentsNamespace}/datalist`,
	{
		apiModule: TeamAgentsAPI,
		disablePersistence: true,
		headers,
	},
);
