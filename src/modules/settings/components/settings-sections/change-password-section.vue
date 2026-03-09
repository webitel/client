<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.changePassword') }}
    </template>
    <template>

      <change-password-autocomplete />

      <user-password-input
        :model-value="newPassword"
        :label="t('auth.password')"
        @update:model-value="newPassword = $event"
      />
      <wt-password
        v-model:model-value="confirmNewPassword"
        :label="t('auth.confirmPassword')"
        :v="v$.confirmNewPassword"
      />
      <wt-button
        :disabled="v$.$invalid"
        :loading="isPasswordPatching"
        @click.prevent="changePassword"
      >
        {{ t('objects.save') }}
      </wt-button>
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';
import { computed, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

import UserPasswordInput from '../../../../app/components/utils/user-password-input.vue';
import { changePassword as requestChangePassword } from '../../api/settings';
import ChangePasswordAutocomplete from './utils/change-password-autocomplete.vue';
import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';
import { useUserinfoStore } from '../../../userinfo/stores/userinfoStore';

const $eventBus = inject('$eventBus');
const { t } = useI18n();

const userStore = useUserinfoStore();
const { userInfo } = storeToRefs(userStore);

const userId = computed(() => userInfo.value?.userId);

const isPasswordPatching = ref(false);
const newPassword = ref('');
const confirmNewPassword = ref('');

const v$ = useVuelidate(
	computed(() => ({
		newPassword: {
			required,
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

async function changePassword() {
	try {
		isPasswordPatching.value = true;
		const changes = {
			password: newPassword.value,
		};
		await requestChangePassword({
			id: userId.value,
			changes,
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
}
</script>

<style scoped>
.wt-button {
  margin-left: auto;
}
</style>
