import { ResourceDisplaysAPI } from '@webitel/api-services/api';
import type { EngineResourceDisplay } from '@webitel/api-services/gen/models';
import { resourceDisplaySchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { ResourceNumbersNamespace } from '../namespace';

export const useResourceNumbersCardStore =
	createCardStore<EngineResourceDisplay>({
		namespace: `${ResourceNumbersNamespace}/card`,
		apiModule: ResourceDisplaysAPI,
		standardValidationSchema,
	});
