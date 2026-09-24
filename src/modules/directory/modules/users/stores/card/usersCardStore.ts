import { UsersAPI } from '@webitel/api-services/api';
import { buildUserSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';
import { computed } from 'vue';

import type { User } from '../../types/User';
import { userPasswordRules } from '../_internals/userPasswordRules';
import { UsersNamespace } from '../namespace';

export const useUsersCardStore = createCardStore<User>({
	namespace: `${UsersNamespace}/card`,
	apiModule: UsersAPI,
	standardValidationSchema: computed(() =>
		buildUserSchema(userPasswordRules.value),
	),
});
