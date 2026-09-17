import { DevicesAPI } from '@webitel/api-services/api';
import type { ApiDevice } from '@webitel/api-services/gen/models';
import { deviceSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { DevicesNamespace } from '../namespace';

export const useDevicesCardStore = createCardStore<ApiDevice>({
	namespace: `${DevicesNamespace}/card`,
	apiModule: DevicesAPI,
	standardValidationSchema,
});
