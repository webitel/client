import { ChangelogsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { ChangelogsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useChangelogsDatalistStore = createTableStore(
	`${ChangelogsNamespace}/datalist`,
	{
		apiModule: ChangelogsAPI,
		headers,
	},
);
