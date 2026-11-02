import { DevicesAPI } from '@webitel/api-services/api';
import { createPermissionsStore } from '@webitel/ui-datalist/permissions';

import { DevicesNamespace } from '../namespace';

export const useDevicesPermissionsStore = createPermissionsStore(
	`${DevicesNamespace}/permissions`,
	{
		apiModule: DevicesAPI,
	},
);
