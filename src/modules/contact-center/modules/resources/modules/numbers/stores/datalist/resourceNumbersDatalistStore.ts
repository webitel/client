import { ResourceDisplaysAPI } from '@webitel/api-services/api';
import type { EngineResourceDisplay } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { ResourceNumbersNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useResourceNumbersDatalistStore =
	createTableStore<EngineResourceDisplay>(
		`${ResourceNumbersNamespace}/datalist`,
		{
			apiModule: ResourceDisplaysAPI,
			disablePersistence: true,
			headers,
		},
	);
