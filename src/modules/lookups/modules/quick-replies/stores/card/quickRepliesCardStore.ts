import { QuickRepliesAPI } from '@webitel/api-services/api';
import type { EngineQuickReply } from '@webitel/api-services/gen/models';
import { quickReplySchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { QuickRepliesNamespace } from '../namespace';

export const useQuickRepliesCardStore = createCardStore<EngineQuickReply>({
	namespace: `${QuickRepliesNamespace}/card`,
	apiModule: QuickRepliesAPI,
	standardValidationSchema,
});
