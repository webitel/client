import { DevicesAPI } from '@webitel/api-services/api';
import { normalizeDatetimeRange } from '@webitel/api-services/scripts';
import { createTableStore } from '@webitel/ui-datalist';

import { DevicesNamespace } from '../namespace';
import { historyHeaders } from './_internals/historyHeaders';

/** Device audit history popup — no URL/localStorage persistence. */
export const useDevicesHistoryDatalistStore = createTableStore(
	`${DevicesNamespace}/history/datalist`,
	{
		apiModule: {
			getList: ({ createdAt, ...params }) => {
				const range = normalizeDatetimeRange(createdAt);
				return DevicesAPI.getDeviceHistory({
					...params,
					from: range?.from,
					to: range?.to,
				});
			},
		},
		headers: historyHeaders,
		disablePersistence: true,
	},
);
