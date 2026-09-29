import { UserTokensAPI } from '@webitel/api-services/api';
import type { ApiUserAccessToken } from '@webitel/api-services/gen/models';
import { userTokenSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { UserTokensNamespace } from '../namespace';

export const useUserTokenCardStore = createCardStore<ApiUserAccessToken>({
	namespace: `${UserTokensNamespace}/card`,
	apiModule: UserTokensAPI,
	standardValidationSchema,
});
