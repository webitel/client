import { FlowsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { FlowNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useFlowDatalistStore = createTableStore(
	`${FlowNamespace}/datalist`,
	{
		apiModule: FlowsAPI,
		headers,
	},
);
