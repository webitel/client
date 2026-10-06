import { OutboundResourceGroupsAPI } from '@webitel/api-services/api';
import type { EngineOutboundResourceGroup } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { ResourceGroupsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useResourceGroupsDatalistStore =
	createTableStore<EngineOutboundResourceGroup>(
		`${ResourceGroupsNamespace}/datalist`,
		{
			apiModule: OutboundResourceGroupsAPI,
			headers,
		},
	);
