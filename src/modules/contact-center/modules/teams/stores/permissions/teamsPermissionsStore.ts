import { TeamsAPI } from '@webitel/api-services/api';
import { createPermissionsStore } from '@webitel/ui-datalist/permissions';

import { TeamsNamespace } from '../namespace';

export const useTeamsPermissionsStore = createPermissionsStore(
	`${TeamsNamespace}/permissions`,
	{
		apiModule: TeamsAPI,
	},
);
