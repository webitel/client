import { OutboundResourcesAPI } from '@webitel/api-services/api';
import type { EngineOutboundResource } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { ResourcesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useResourcesDatalistStore =
	createTableStore<EngineOutboundResource>(`${ResourcesNamespace}/datalist`, {
		apiModule: OutboundResourcesAPI,
		headers,
	});
