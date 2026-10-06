import { ResourcesInGroupAPI } from '@webitel/api-services/api';
import type { EngineOutboundResourceInGroup } from '@webitel/api-services/gen/models';
import { resourceInGroupSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { ResourceGroupResourcesNamespace } from '../namespace';

export const useResourceGroupResourcesCardStore =
	createCardStore<EngineOutboundResourceInGroup>({
		namespace: `${ResourceGroupResourcesNamespace}/card`,
		apiModule: ResourcesInGroupAPI,
		standardValidationSchema,
	});
