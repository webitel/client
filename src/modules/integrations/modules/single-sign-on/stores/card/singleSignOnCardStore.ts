import { OAuthAppsAPI } from '@webitel/api-services/api';
import type { ApiOAuthService } from '@webitel/api-services/gen/models';
import { OAuthSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { SingleSignOnNamespace } from '../namespace';

export const useSingleSignOnCardStore = createCardStore<ApiOAuthService>({
  namespace: `${SingleSignOnNamespace}/card`,
  apiModule: OAuthAppsAPI,
  standardValidationSchema,
});
