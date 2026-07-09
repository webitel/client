import { OAuthAppsAPI } from '@webitel/api-services/api';
import {
	createPermissionsStore,
} from '@webitel/ui-datalist/permissions';

import { SingleSignOnNamespace } from '../namespace';

export const useSingleSignOnPermissionsStore = createPermissionsStore(
	`${SingleSignOnNamespace}/permissions`,
	{
		apiModule: OAuthAppsAPI,
	},
);
