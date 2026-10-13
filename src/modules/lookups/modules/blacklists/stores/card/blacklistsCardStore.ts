import { BlacklistsAPI } from '@webitel/api-services/api';
import type { EngineList } from '@webitel/api-services/gen/models';
import { blacklistSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { BlacklistsNamespace } from '../namespace';

export const useBlacklistsCardStore = createCardStore<EngineList>({
	namespace: `${BlacklistsNamespace}/card`,
	apiModule: BlacklistsAPI,
	standardValidationSchema,
});
