import { QueueBucketsAPI } from '@webitel/api-services/api';
import type { EngineQueueBucket } from '@webitel/api-services/gen/models';
import { queueBucketSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { QueueBucketsNamespace } from '../namespace';

export const useQueueBucketsCardStore = createCardStore<EngineQueueBucket>({
	namespace: `${QueueBucketsNamespace}/card`,
	apiModule: QueueBucketsAPI,
	standardValidationSchema,
});
