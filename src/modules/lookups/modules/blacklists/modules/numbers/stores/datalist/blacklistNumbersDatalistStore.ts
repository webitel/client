import { BlacklistNumbersAPI } from '@webitel/api-services/api';
import type { EngineListCommunication } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { BlacklistNumbersNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useBlacklistNumbersDatalistStore =
	createTableStore<EngineListCommunication>(
		`${BlacklistNumbersNamespace}/datalist`,
		{
			apiModule: BlacklistNumbersAPI,
			disablePersistence: true,
			headers,
		},
	);
