import { useVuelidate } from '@vuelidate/core';
import { helpers, required, sameAs } from '@vuelidate/validators';
import { ConfigurationsAPI, UsersAPI } from '@webitel/api-services/api';
import { useEventBus } from '@webitel/ui-sdk/composables';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

import { useUserinfoStore } from '../../../../userinfo/stores/userinfoStore';

export const useChangePassword = () => {
	const $eventBus = useEventBus();

	const userinfoStore = useUserinfoStore();
	const { userInfo } = storeToRefs(userinfoStore);

	const isPasswordPatching = ref(false);
	const newPassword = ref('');
	const confirmNewPassword = ref('');

	// [Claude] password rules from the system configuration; empty regexp means no rule
	const passwordRegExp = ref('');
	const passwordValidationText = ref('');

	const passwordRegexRule = computed(() => {
		const regexp = new RegExp(passwordRegExp.value);
		const isValid = (value: string) =>
			passwordRegExp.value ? regexp.test(value) : true;
		// [Claude] vuelidate reuses a cached result until $params change, so the regexp goes into params
		return helpers.withParams(
			{
				regex: passwordRegExp.value,
			},
			passwordValidationText.value
				? helpers.withMessage(passwordValidationText.value, isValid)
				: isValid,
		);
	});

	const v$ = useVuelidate(
		computed(() => ({
			newPassword: {
				required,
				regex: passwordRegexRule.value,
			},
			confirmNewPassword: {
				sameAs: sameAs(newPassword),
			},
		})),
		{
			newPassword,
			confirmNewPassword,
		},
		{
			$autoDirty: true,
		},
	);

	const loadPasswordRules = async () => {
		const rules = await ConfigurationsAPI.getPasswordRules();
		passwordRegExp.value = rules.passwordRegExp || '';
		passwordValidationText.value = rules.passwordValidationText || '';
	};

	onMounted(loadPasswordRules);

	const changePassword = async () => {
		try {
			isPasswordPatching.value = true;
			await UsersAPI.patch({
				id: userInfo.value?.userId,
				changes: {
					password: newPassword.value,
				},
			});
			newPassword.value = '';
			confirmNewPassword.value = '';
			v$.value.$reset();
			$eventBus.$emit('notification', {
				type: 'success',
				text: 'Password is successfully updated!',
			});
		} finally {
			isPasswordPatching.value = false;
		}
	};

	return {
		newPassword,
		confirmNewPassword,
		isPasswordPatching,
		v$,
		changePassword,
	};
};
