import { ImportTemplatesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { ImportCsvNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useImportCsvDatalistStore = createTableStore(
	`${ImportCsvNamespace}/datalist`,
	{
		apiModule: ImportTemplatesAPI,
		headers,
	},
);
