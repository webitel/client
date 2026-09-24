<template>
  <section class="opened-user-variables">
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.directory.users.variables') }}
      </h3>
      <wt-icon-action
        v-if="!disableUserInput"
        action="add"
        @click="addVariable"
      />
    </header>
    <div class="opened-card-input-grid">
      <div class="opened-user-variables__list">
        <div
          v-for="(variable, index) in variables"
          :key="index"
          class="opened-user-variables__pair"
        >
          <wt-input-text
            v-model:model-value="variable.key"
            :disabled="disableUserInput"
            :placeholder="t('objects.directory.users.varKey')"
            :regle-validation="validationFields?.variables?.$each?.[index]?.$fields?.key"
          />
          <wt-input-text
            v-model:model-value="variable.value"
            :disabled="disableUserInput"
            :placeholder="t('objects.directory.users.varVal')"
            :regle-validation="validationFields?.variables?.$each?.[index]?.$fields?.value"
          />
          <wt-icon-action
            v-if="!disableUserInput"
            action="delete"
            class="opened-user-variables__delete-button"
            @click="deleteVariable(index)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { VariablePair } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import type { User } from '../types/User';

const modelValue = defineModel<User>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<User>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const variables = computed<VariablePair[]>(() => {
	if (!modelValue.value.variables) modelValue.value.variables = [];
	return modelValue.value.variables;
});

const addVariable = () => {
	variables.value.push({
		key: '',
		value: '',
	});
};

const deleteVariable = (index: number) => {
	variables.value.splice(index, 1);
};
</script>

<style scoped>
.opened-user-variables__pair {
  display: grid;
  align-items: center;
  margin-bottom: 20px;
  grid-template-columns: 1fr 1fr 24px;
  grid-gap: 20px;
}

.opened-user-variables__delete-button {
  margin-bottom: 20px;
}
</style>
