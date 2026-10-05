import { BucketsAPI } from '@webitel/api-services/api';
import type { EngineBucket } from '@webitel/api-services/gen/models';
import { bucketSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { BucketsNamespace } from '../namespace';

export const useBucketsCardStore = createCardStore<EngineBucket>({
	namespace: `${BucketsNamespace}/card`,
	apiModule: BucketsAPI,
	standardValidationSchema,
});
