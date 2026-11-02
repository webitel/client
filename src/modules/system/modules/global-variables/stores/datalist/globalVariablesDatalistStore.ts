import { SchemaVariablesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { GlobalVariablesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useGlobalVariablesDatalistStore = createTableStore(
	`${GlobalVariablesNamespace}/datalist`,
	{
		apiModule: SchemaVariablesAPI,
		headers,
	},
);
