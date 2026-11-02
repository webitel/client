import { AgentsAPI } from '@webitel/api-services/api';
import { createPermissionsStore } from '@webitel/ui-datalist/permissions';

import { AgentsNamespace } from '../namespace';

export const useAgentsPermissionsStore = createPermissionsStore(
	`${AgentsNamespace}/permissions`,
	{
		apiModule: AgentsAPI,
	},
);
