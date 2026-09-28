import { ConfigurationsAPI, UsersAPI } from '@webitel/api-services/api';
import {
	buildUserSchema,
	type UserCard,
	type UserPasswordRules,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';
import { computed, ref } from 'vue';

import { UsersNamespace } from '../namespace';

const userPasswordRules = ref<UserPasswordRules>({});

export const loadUserPasswordRules = async () => {
	userPasswordRules.value = await ConfigurationsAPI.getPasswordRules();
};

export const useUsersCardStore = createCardStore<UserCard>({
	namespace: `${UsersNamespace}/card`,
	apiModule: UsersAPI,
	standardValidationSchema: computed(() =>
		buildUserSchema(userPasswordRules.value),
	),
});
