import { ConfigurationsAPI } from '@webitel/api-services/api';
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import type { UserPasswordRules } from '@webitel/api-services/validations';
import { ref } from 'vue';

export const userPasswordRules = ref<UserPasswordRules>({});

export const loadUserPasswordRules = async () => {
	const { items } = await ConfigurationsAPI.getList({
		name: [
			EngineSystemSettingName.PasswordRegExp,
			EngineSystemSettingName.PasswordValidationText,
		],
	});

	const findValue = (name: EngineSystemSettingName) =>
		items.find((item) => item.name === name)?.value;

	userPasswordRules.value = {
		passwordRegExp: findValue(EngineSystemSettingName.PasswordRegExp),
		passwordValidationText: findValue(
			EngineSystemSettingName.PasswordValidationText,
		),
	};
};
