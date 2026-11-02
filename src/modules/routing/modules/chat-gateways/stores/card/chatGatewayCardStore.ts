import { ChatGatewaysAPI } from '@webitel/api-services/api';
import {
	type ChatGatewayCard,
	chatGatewaySchema as standardValidationSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { ChatGatewaysNamespace } from '../namespace';

export const useChatGatewayCardStore = createCardStore<ChatGatewayCard>({
	namespace: `${ChatGatewaysNamespace}/card`,
	apiModule: ChatGatewaysAPI,
	standardValidationSchema,
});
