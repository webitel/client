import { MediaAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { MediaNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useMediaDatalistStore = createTableStore(
	`${MediaNamespace}/datalist`,
	{
		apiModule: MediaAPI,
		headers,
	},
);
