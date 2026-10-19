import { BackendProfilesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { StorageNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useStorageDatalistStore = createTableStore(
	`${StorageNamespace}/datalist`,
	{
		apiModule: BackendProfilesAPI,
		headers,
	},
);
