import { ImportTemplatesAPI } from '@webitel/api-services/api';
import { createPermissionsStore } from '@webitel/ui-datalist/permissions-page';

import { ImportCsvNamespace } from '../namespace';

export const useImportCsvPermissionsStore = createPermissionsStore(
	`${ImportCsvNamespace}/permissions`,
	{
		apiModule: ImportTemplatesAPI,
	},
);
