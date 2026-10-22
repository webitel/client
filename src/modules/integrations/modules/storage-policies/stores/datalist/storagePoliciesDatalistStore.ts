import { StoragePoliciesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { StoragePoliciesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useStoragePoliciesDatalistStore = createTableStore(
	`${StoragePoliciesNamespace}/datalist`,
	{
		apiModule: StoragePoliciesAPI,
		headers,
	},
);
