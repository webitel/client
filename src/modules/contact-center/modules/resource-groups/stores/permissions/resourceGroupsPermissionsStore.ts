import { OutboundResourceGroupsAPI } from '@webitel/api-services/api';
import { createPermissionsStore } from '@webitel/ui-datalist/permissions';

import { ResourceGroupsNamespace } from '../namespace';

export const useResourceGroupsPermissionsStore = createPermissionsStore(
	`${ResourceGroupsNamespace}/permissions`,
	{
		apiModule: OutboundResourceGroupsAPI,
	},
);
