<template>
  <section>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-input-number
        v-model:model-value="modelValue.maxSize"
        :disabled="disableUserInput"
        :label="t('objects.integrations.storage.maxSize')"
        :min="0"
        :regle-validation="validationFields?.maxSize"
      />
      <wt-input-number
        v-model:model-value="modelValue.expireDays"
        :disabled="disableUserInput"
        :label="t('objects.integrations.storage.expireDays')"
        :min="0"
        :regle-validation="validationFields?.expireDays"
      />
      <wt-input-number
        v-model:model-value="modelValue.priority"
        :disabled="disableUserInput"
        :label="t('objects.integrations.storage.priority')"
        :min="0"
        :regle-validation="validationFields?.priority"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { StorageBackendProfile } from '@webitel/api-services/gen/models';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<StorageBackendProfile>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<StorageBackendProfile>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
</script>
