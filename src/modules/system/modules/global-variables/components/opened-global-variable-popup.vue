<template>
  <wt-popup
    :shown="!!variableId"
    :size="ComponentSize.SM"
    overflow
    @close="close"
  >
    <template #title>
      {{ isNew
        ? t('objects.system.globalVariables.newTitle')
        : t('objects.system.globalVariables.editTitle') }}
    </template>
    <template #main>
      <div class="opened-global-variable-popup__wrapper">
        <wt-input-text
          v-model:model-value="modelValue.name"
          :disabled="!hasSaveAccess"
          :label="t('objects.key')"
          :regle-validation="validationFields?.name"
          required
        />
        <wt-input-text
          v-model:model-value="modelValue.value"
          :disabled="!hasSaveAccess"
          :label="t('vocabulary.values', 1)"
          :label-props="{ hint: t('objects.system.globalVariables.valueInfo'), hintPosition: 'right' }"
          :regle-validation="validationFields?.value"
          :required="!isSavedEncrypted"
        />
        <wt-switcher
          v-model:model-value="modelValue.encrypt"
          :disabled="!hasSaveAccess || isSavedEncrypted"
          :label="t('objects.system.globalVariables.encrypted')"
        />
      </div>
    </template>
    <template #actions>
      <wt-button
        :disabled="disabledSave"
        @click="save"
      >
        {{ t('reusable.save') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="close"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import type { SchemaVariableCard } from '@webitel/api-services/validations';
import { useNestedCardComponent } from '@webitel/ui-datalist/card';
import { useClose } from '@webitel/ui-sdk/composables';
import { ButtonColor, ComponentSize } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useGlobalVariablesCardStore } from '../stores/card/globalVariablesCardStore';

const emit = defineEmits<{
	saved: [];
}>();

const { t } = useI18n();
const route = useRoute();

const { hasCreateAccess, hasUpdateAccess } = useUserAccessControl();

const variableId = computed(() => route.params.id);

/** [Claude] a new variable needs the create access, a saved one the update access */
const hasSaveAccess = computed(() =>
	variableId.value === 'new' ? hasCreateAccess.value : hasUpdateAccess.value,
);

const {
	modelValue,
	originalItemInstance,
	isNew,
	disabledSave,
	validationFields,
	hasValidationErrors,
	save: saveItem,
} = useNestedCardComponent<SchemaVariableCard>({
	useCardStore: useGlobalVariablesCardStore,
	routeParamName: 'id',
	hasSaveAccess,
});

/** [Claude] an encrypted value is never read back: it stays as is when left empty and can't be decrypted */
const isSavedEncrypted = computed(
	() => !isNew.value && !!originalItemInstance.value?.encrypt,
);

const { close } = useClose(RouteNames.GLOBAL_VARIABLES);

const save = async () => {
	await saveItem();
	// [Claude] an invalid form is not saved, the popup stays open to show why
	if (hasValidationErrors.value) return;
	close();
	emit('saved');
};
</script>

<style scoped>
.opened-global-variable-popup__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
