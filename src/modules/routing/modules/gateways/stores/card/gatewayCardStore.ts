import { GatewaysAPI } from '@webitel/api-services/api';
import {
	type GatewayCard,
	gatewaySchema as standardValidationSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { GatewaysNamespace } from '../namespace';

export const useGatewayCardStore = createCardStore<GatewayCard>({
	namespace: `${GatewaysNamespace}/card`,
	apiModule: GatewaysAPI,
	standardValidationSchema,
});
