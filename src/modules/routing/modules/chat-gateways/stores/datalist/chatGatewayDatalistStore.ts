import { ChatGatewaysAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { ChatGatewaysNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useChatGatewayDatalistStore = createTableStore(
	`${ChatGatewaysNamespace}/datalist`,
	{
		apiModule: ChatGatewaysAPI,
		headers,
	},
);
