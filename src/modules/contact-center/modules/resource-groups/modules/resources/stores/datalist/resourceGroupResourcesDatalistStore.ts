import { ResourcesInGroupAPI } from '@webitel/api-services/api';
import type { EngineOutboundResourceInGroup } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { ResourceGroupResourcesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useResourceGroupResourcesDatalistStore =
	createTableStore<EngineOutboundResourceInGroup>(
		`${ResourceGroupResourcesNamespace}/datalist`,
		{
			apiModule: ResourcesInGroupAPI,
			disablePersistence: true,
			headers,
		},
	);
