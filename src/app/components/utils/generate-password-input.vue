<template>
  <div class="generate-password-input">
    <wt-input-text
      v-bind="$attrs"
      :disabled="disabled"
      :label="t('objects.password')"
      :label-props="{ hint: t('objects.directory.passwordInfo'), hintPosition: 'right' }"
      :placeholder="t('objects.password')"
      :required="required"
      :v="v"
      :regle-validation="regleValidation"
      :model-value="passwordRepresentation"
      @update:model-value="model = $event"
    >
      <template
        v-if="!disabled"
        #suffix
      >
        <wt-copy-action
          v-show="passwordRepresentation"
          :value="model"
        />

        <wt-icon-btn
          v-tooltip="t('iconHints.generate')"
          icon="generate"
          :class="{'generate-password-input__icon-btn' : passwordRepresentation}"
          class="generate-password-input__icon-btn--generate"
          @click="generatePassword"
        />
      </template>
    </wt-input-text>
  </div>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import type { BaseValidation } from '@vuelidate/core';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const MIN_HASH_SIZE = 59;
const GENERATED_PASSWORD_LENGTH = 12;
const GENERATED_PASSWORD_CHARSET =
	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const model = defineModel<string>({
	default: '',
});

defineProps<{
	v?: BaseValidation;
	regleValidation?: RegleSchemaFieldStatus<string>;
	required?: boolean;
	disabled?: boolean;
}>();

const { t } = useI18n();

const passwordRepresentation = computed(() =>
	model.value.length <= MIN_HASH_SIZE ? model.value : '',
);

const generatePassword = () => {
	let value = '';
	for (let i = 0; i < GENERATED_PASSWORD_LENGTH; i += 1) {
		value += GENERATED_PASSWORD_CHARSET.charAt(
			Math.floor(Math.random() * GENERATED_PASSWORD_CHARSET.length),
		);
	}
	model.value = value;
};
</script>

<style lang="scss" scoped>
.generate-password-input {
  position: relative;
  z-index: 1;
}

.generate-password-input__label-wrapper {
  display: flex;
  align-items: center;
}

.generate-password-input__icon-btn {
  margin-left: var(--spacing-xs);
}
</style>
