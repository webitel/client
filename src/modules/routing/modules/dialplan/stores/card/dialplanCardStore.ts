import { DialplansAPI } from '@webitel/api-services/api';
import {
	type DialplanCard,
	dialplanSchema as standardValidationSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { DialplanNamespace } from '../namespace';

export const useDialplanCardStore = createCardStore<DialplanCard>({
	namespace: `${DialplanNamespace}/card`,
	apiModule: DialplansAPI,
	standardValidationSchema,
});
