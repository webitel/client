import { LicenseAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { LicenseNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useLicenseDatalistStore = createTableStore(
	`${LicenseNamespace}/datalist`,
	{
		apiModule: LicenseAPI,
		headers,
	},
);
