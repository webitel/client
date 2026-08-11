import { BucketsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { BucketsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useBucketsDatalistStore = createTableStore(
	`${BucketsNamespace}/datalist`,
	{
		apiModule: BucketsAPI,
		headers,
	},
);
