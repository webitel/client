import { DialplansAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { DialplanNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useDialplanDatalistStore = createTableStore(
	`${DialplanNamespace}/datalist`,
	{
		apiModule: DialplansAPI,
		headers,
	},
);
