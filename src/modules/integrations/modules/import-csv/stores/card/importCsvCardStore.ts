import { ImportTemplatesAPI } from '@webitel/api-services/api';
import {
	type ImportTemplateCard,
	importTemplateSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { ImportCsvNamespace } from '../namespace';

export const useImportCsvCardStore = createCardStore<ImportTemplateCard>({
	namespace: `${ImportCsvNamespace}/card`,
	apiModule: ImportTemplatesAPI,
	standardValidationSchema: importTemplateSchema,
});
