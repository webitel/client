import { TriggersAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { TriggersNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useTriggersDatalistStore = createTableStore(
	`${TriggersNamespace}/datalist`,
	{
		apiModule: TriggersAPI,
		headers,
	},
);
