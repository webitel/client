import { QueuesAPI } from '@webitel/api-services/api';
import { queueSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';
import type { Queue } from '../../types/Queue';

import { QueuesNamespace } from '../namespace';

export const useQueuesCardStore = createCardStore<Queue>({
	namespace: `${QueuesNamespace}/card`,
	apiModule: QueuesAPI,
	standardValidationSchema,
});
