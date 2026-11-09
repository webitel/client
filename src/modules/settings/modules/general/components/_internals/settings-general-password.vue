<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.changePassword') }}
    </template>
    <template>

      <settings-general-password-autocomplete />

      <wt-password
        v-model:model-value="newPassword"
        :v="v$.newPassword"
        :actions="[PasswordAction.Copy, PasswordAction.Generate]"
      />
      <wt-password
        v-model:model-value="confirmNewPassword"
        :label="t('auth.confirmPassword')"
        :v="v$.confirmNewPassword"
      />
      <wt-button
        :disabled="v$.$invalid"
        class="settings-general-password__save"
        :loading="isPasswordPatching"
        @click.prevent="changePassword"
      >
        {{ t('objects.save') }}
      </wt-button>
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { PasswordAction } from '@webitel/ui-sdk/enums';
import { useI18n } from 'vue-i18n';
import SettingsSectionWrapper from '../../../../components/_internals/settings-section-wrapper.vue';
import { useChangePassword } from '../../composables/useChangePassword';
import SettingsGeneralPasswordAutocomplete from './settings-general-password-autocomplete.vue';

const { t } = useI18n();

const {
	newPassword,
	confirmNewPassword,
	isPasswordPatching,
	v$,
	changePassword,
} = useChangePassword();
</script>

<style scoped>
.settings-general-password__save {
  margin-left: auto;
}
</style>
