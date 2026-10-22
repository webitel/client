import { OutboundResourcesAPI } from '@webitel/api-services/api';
import { createPermissionsStore } from '@webitel/ui-datalist/permissions';

import { ResourcesNamespace } from '../namespace';

export const useResourcesPermissionsStore = createPermissionsStore(
	`${ResourcesNamespace}/permissions`,
	{
		apiModule: OutboundResourcesAPI,
	},
);
