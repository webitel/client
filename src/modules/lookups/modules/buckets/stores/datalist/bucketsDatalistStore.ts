import { BucketsAPI } from '@webitel/api-services/api';
import type { EngineBucket } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { BucketsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useBucketsDatalistStore = createTableStore<EngineBucket>(
	`${BucketsNamespace}/datalist`,
	{
		apiModule: BucketsAPI,
		headers,
	},
);
