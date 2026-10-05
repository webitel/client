import { QueueHooksAPI } from '@webitel/api-services/api';
import type { EngineQueueHook } from '@webitel/api-services/gen/models';
import { queueHookSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { QueueHooksNamespace } from '../namespace';

export const useQueueHooksCardStore = createCardStore<EngineQueueHook>({
	namespace: `${QueueHooksNamespace}/card`,
	apiModule: QueueHooksAPI,
	standardValidationSchema,
});
