import { QueueResGroupsAPI } from '@webitel/api-services/api';
import type { EngineQueueResourceGroup } from '@webitel/api-services/gen/models';
import { queueResGroupSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { QueueResGroupsNamespace } from '../namespace';

export const useQueueResGroupsCardStore =
	createCardStore<EngineQueueResourceGroup>({
		namespace: `${QueueResGroupsNamespace}/card`,
		apiModule: QueueResGroupsAPI,
		standardValidationSchema,
	});
