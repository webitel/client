import { createTableStore } from '@webitel/ui-datalist';

import { LicenseAPI } from '../../api/license';
import { LicenseNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useLicenseDatalistStore = createTableStore(
	`${LicenseNamespace}/datalist`,
	{
		apiModule: LicenseAPI,
		headers,
	},
);
