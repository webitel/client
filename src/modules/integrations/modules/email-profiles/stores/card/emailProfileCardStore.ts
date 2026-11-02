import { EmailProfilesAPI } from '@webitel/api-services/api';
import type { EngineEmailProfile } from '@webitel/api-services/gen/models';
import { emailProfileSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { EmailProfilesNamespace } from '../namespace';

export const useEmailProfileCardStore = createCardStore<EngineEmailProfile>({
	namespace: `${EmailProfilesNamespace}/card`,
	apiModule: EmailProfilesAPI,
	standardValidationSchema,
});
