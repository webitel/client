import { OutboundResourcesAPI } from '@webitel/api-services/api';
import type { EngineOutboundResource } from '@webitel/api-services/gen/models';
import { resourceSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { ResourcesNamespace } from '../namespace';

export const useResourcesCardStore = createCardStore<EngineOutboundResource>({
	namespace: `${ResourcesNamespace}/card`,
	apiModule: OutboundResourcesAPI,
	standardValidationSchema,
});
