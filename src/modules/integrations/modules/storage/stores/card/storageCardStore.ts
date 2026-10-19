import { BackendProfilesAPI } from '@webitel/api-services/api';
import type { StorageBackendProfile } from '@webitel/api-services/gen/models';
import { backendProfileSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { StorageNamespace } from '../namespace';

export const useStorageCardStore = createCardStore<StorageBackendProfile>({
	namespace: `${StorageNamespace}/card`,
	apiModule: BackendProfilesAPI,
	standardValidationSchema,
});
