import { createTableStore } from '@webitel/ui-datalist';

import { TeamSupervisorsAPI } from '../../api/teamSupervisors';
import { TeamSupervisorsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useTeamSupervisorsDatalistStore = createTableStore(
	`${TeamSupervisorsNamespace}/datalist`,
	{
		apiModule: TeamSupervisorsAPI,
		disablePersistence: true,
		headers,
	},
);
