import { UserTokensAPI } from '@webitel/api-services/api';
import type { ApiUserAccessToken } from '@webitel/api-services/gen/models';
import { userTokenSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { UserTokensNamespace } from '../namespace';

/**
 * [Claude] Token card = token itself + expiryDays, which is a create-only
 * query param (server derives expiresAt from it).
 */
export type UserTokenCard = ApiUserAccessToken & {
	expiryDays?: number | null;
};

export const useUserTokenCardStore = createCardStore<UserTokenCard>({
	namespace: `${UserTokensNamespace}/card`,
	apiModule: UserTokensAPI,
	standardValidationSchema,
});
