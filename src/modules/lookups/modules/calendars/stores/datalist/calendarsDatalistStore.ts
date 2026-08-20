import { CalendarsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { CalendarsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useCalendarsDatalistStore = createTableStore(
	`${CalendarsNamespace}/datalist`,
	{
		apiModule: CalendarsAPI,
		headers,
	},
);
