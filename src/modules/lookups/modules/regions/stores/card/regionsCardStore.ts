import { RegionsAPI } from '@webitel/api-services/api';
import type { EngineRegion } from '@webitel/api-services/gen/models';
import { regionSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { RegionsNamespace } from '../namespace';

export const useRegionsCardStore = createCardStore<EngineRegion>({
	namespace: `${RegionsNamespace}/card`,
	apiModule: RegionsAPI,
	standardValidationSchema,
});
