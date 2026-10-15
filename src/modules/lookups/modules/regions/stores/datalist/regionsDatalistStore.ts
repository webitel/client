import { RegionsAPI } from '@webitel/api-services/api';
import type { EngineRegion } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { RegionsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useRegionsDatalistStore = createTableStore<EngineRegion>(
	`${RegionsNamespace}/datalist`,
	{
		apiModule: RegionsAPI,
		headers,
	},
);
