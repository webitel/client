import { DevicesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { DevicesNamespace } from '../namespace';
import { historyHeaders } from './_internals/historyHeaders';

/** Device audit history popup — no URL/localStorage persistence. */
export const useDevicesHistoryDatalistStore = createTableStore(
	`${DevicesNamespace}/history/datalist`,
	{
		apiModule: {
			getList: DevicesAPI.getDeviceHistory,
		},
		headers: historyHeaders,
		disablePersistence: true,
	},
);
