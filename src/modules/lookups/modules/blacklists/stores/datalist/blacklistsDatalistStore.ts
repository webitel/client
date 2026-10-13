import { BlacklistsAPI } from '@webitel/api-services/api';
import type { EngineList } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { BlacklistsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useBlacklistsDatalistStore = createTableStore<EngineList>(
	`${BlacklistsNamespace}/datalist`,
	{
		apiModule: BlacklistsAPI,
		headers,
	},
);
