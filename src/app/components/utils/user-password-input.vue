<template>
  <generate-password-input
    :v="v$.model"
    :value="model"
    class="user-password-input"
    v-bind="attrs"
    @input="model = $event"
  />
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import { computed, ref, useAttrs, watch } from 'vue';
import { useRoute } from 'vue-router';

import ConfigurationAPI from '../../../modules/system/modules/configuration/api/configuration.js';
import GeneratePasswordInput from './generate-password-input.vue';

const model = defineModel({
	type: String,
	default: '',
});

const attrs = useAttrs();

const route = useRoute();

const vRegex = ref(false);
const vErrorText = ref(false);

// bad check: implicit dependency :(
const isNew = computed(() => {
	// settings page allows empty value, because it's password edit
	return route.fullPath.includes('new');
});

const v$ = useVuelidate(
	computed(() => {
		const regexpInstance = new RegExp(vRegex.value);
		const vRegexRule = (v) => (vRegex.value ? regexpInstance.test(v) : true);

		const regex = helpers.withParams(
			{
				regex: vRegex.value,
			},
			vErrorText.value
				? helpers.withMessage(vErrorText.value, vRegexRule)
				: vRegexRule,
		);

		if (isNew.value) {
			return {
				model: {
					required,
					regex,
				},
			};
		}

		return {
			model: model.value
				? {
						regex,
					}
				: {},
		};
	}),
	{
		model,
	},
);

const loadV = async () => {
	const configurations = await ConfigurationAPI.getList({
		name: [
			EngineSystemSettingName.PasswordRegExp,
			EngineSystemSettingName.PasswordValidationText,
		],
	});

	const regex = configurations.items.find(
		({ name }) => name === EngineSystemSettingName.PasswordRegExp,
	)?.value;

	if (!regex) return;

	const errorText = configurations.items.find(
		({ name }) => name === EngineSystemSettingName.PasswordValidationText,
	)?.value;

	vRegex.value = regex;
	vErrorText.value = errorText;
};

loadV();

//$autoDirty: true not used in useVuelidate because of this bug:
//https://webitel.atlassian.net/browse/WTEL-4821
//as for me bug produced by this code model: model.value ? { regex } : {},
watch(model, () => {
	v$.value.$touch();
});
</script>

<style lang="scss" scoped>
.user-password-input {

}
</style>
