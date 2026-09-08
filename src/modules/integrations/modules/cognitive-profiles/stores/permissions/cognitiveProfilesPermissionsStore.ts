import { CognitiveProfilesAPI } from '@webitel/api-services/api';
import { createPermissionsStore } from '@webitel/ui-datalist/permissions-page';

import { CognitiveProfilesNamespace } from '../namespace';

export const useCognitiveProfilesPermissionsStore = createPermissionsStore(
	`${CognitiveProfilesNamespace}/permissions`,
	{
		apiModule: CognitiveProfilesAPI,
	},
);
