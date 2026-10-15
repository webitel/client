import { ChatplansAPI } from '@webitel/api-services/api';
import {
	type ChatplanCard,
	chatplanSchema as standardValidationSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { ChatplanNamespace } from '../namespace';

export const useChatplanCardStore = createCardStore<ChatplanCard>({
	namespace: `${ChatplanNamespace}/card`,
	apiModule: ChatplansAPI,
	standardValidationSchema,
});
