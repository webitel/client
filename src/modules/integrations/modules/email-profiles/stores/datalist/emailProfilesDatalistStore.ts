import { EmailProfilesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { EmailProfilesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useEmailProfilesDatalistStore = createTableStore(
	`${EmailProfilesNamespace}/datalist`,
	{
		apiModule: EmailProfilesAPI,
		headers,
	},
);
