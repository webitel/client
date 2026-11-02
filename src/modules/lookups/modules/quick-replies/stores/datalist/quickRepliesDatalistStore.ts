import { QuickRepliesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { QuickRepliesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useQuickRepliesDatalistStore = createTableStore(
	`${QuickRepliesNamespace}/datalist`,
	{
		apiModule: QuickRepliesAPI,
		headers,
	},
);
