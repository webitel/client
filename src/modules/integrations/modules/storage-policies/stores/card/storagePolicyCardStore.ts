import { StoragePoliciesAPI } from '@webitel/api-services/api';
import {
	type StoragePolicyCard,
	storagePolicySchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { StoragePoliciesNamespace } from '../namespace';

export const useStoragePolicyCardStore = createCardStore<StoragePolicyCard>({
	namespace: `${StoragePoliciesNamespace}/card`,
	apiModule: StoragePoliciesAPI,
	standardValidationSchema: storagePolicySchema,
});
