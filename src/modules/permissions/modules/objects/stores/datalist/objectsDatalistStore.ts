import { ObjectClassesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { ObjectsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useObjectsDatalistStore = createTableStore(
	`${ObjectsNamespace}/datalist`,
	{
		apiModule: ObjectClassesAPI,
		headers,
	},
);
