import { UserTokensAPI } from '@webitel/api-services/api';
import type { ApiUserAccessToken } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { UserTokensNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useUserTokensDatalistStore = createTableStore<ApiUserAccessToken>(
	`${UserTokensNamespace}/datalist`,
	{
		apiModule: UserTokensAPI,
		headers,
	},
);
