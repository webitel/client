import { GatewaysAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { GatewaysNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useGatewayDatalistStore = createTableStore(
	`${GatewaysNamespace}/datalist`,
	{
		apiModule: GatewaysAPI,
		headers,
	},
);
