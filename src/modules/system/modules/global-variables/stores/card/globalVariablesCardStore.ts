import { SchemaVariablesAPI } from '@webitel/api-services/api';
import {
	type SchemaVariableCard,
	schemaVariableSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { GlobalVariablesNamespace } from '../namespace';

export const useGlobalVariablesCardStore = createCardStore<SchemaVariableCard>({
	namespace: `${GlobalVariablesNamespace}/card`,
	apiModule: SchemaVariablesAPI,
	standardValidationSchema: schemaVariableSchema,
});
