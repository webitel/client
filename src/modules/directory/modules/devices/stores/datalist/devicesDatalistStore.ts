import { DevicesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { DevicesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useDevicesDatalistStore = createTableStore(
	`${DevicesNamespace}/datalist`,
	{
		apiModule: DevicesAPI,
		headers,
	},
);
