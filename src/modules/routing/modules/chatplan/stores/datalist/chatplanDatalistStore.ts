import { ChatplansAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { ChatplanNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useChatplanDatalistStore = createTableStore(
	`${ChatplanNamespace}/datalist`,
	{
		apiModule: ChatplansAPI,
		headers,
	},
);
