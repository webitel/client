import { QueuesAPI } from '@webitel/api-services/api';
import { createPermissionsStore } from '@webitel/ui-datalist/permissions-page';

import { QueuesNamespace } from '../namespace';

export const useQueuesPermissionsStore = createPermissionsStore(
	`${QueuesNamespace}/permissions`,
	{
		apiModule: QueuesAPI,
	},
);
