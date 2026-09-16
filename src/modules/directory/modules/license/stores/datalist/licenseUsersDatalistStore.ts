import { LicenseUsersAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { LicenseNamespace } from '../namespace';
import { licenseUsersHeaders } from './_internals/licenseUsersHeaders';

/** Users-on-license popup — no URL/localStorage persistence. */
export const useLicenseUsersDatalistStore = createTableStore(
	`${LicenseNamespace}/licenseUsers/datalist`,
	{
		apiModule: LicenseUsersAPI,
		headers: licenseUsersHeaders,
		disablePersistence: true,
	},
);
