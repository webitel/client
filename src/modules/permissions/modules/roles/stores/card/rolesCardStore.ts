import { RolesAPI } from '@webitel/api-services/api';
import {
	type RoleCard,
	roleSchema as standardValidationSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { RolesNamespace } from '../namespace';

export const useRolesCardStore = createCardStore<RoleCard>({
	namespace: `${RolesNamespace}/card`,
	apiModule: RolesAPI,
	standardValidationSchema,
});
