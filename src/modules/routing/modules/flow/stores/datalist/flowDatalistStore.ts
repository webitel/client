import { FlowsAPI } from '@webitel/api-services/api';
import type { EngineRoutingSchema } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { FlowNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useFlowDatalistStore = createTableStore<EngineRoutingSchema>(
	`${FlowNamespace}/datalist`,
	{
		apiModule: FlowsAPI,
		headers,
	},
);
