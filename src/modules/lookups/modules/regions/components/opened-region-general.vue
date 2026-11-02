<template>
  <section class="opened-region-general">
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-single-select
        v-model:model-value="modelValue.timezone"
        :show-clear="false"
        :disabled="disableUserInput"
        :label="t('objects.lookups.timezone.timezone', 1)"
        :search-method="CalendarsAPI.getTimezonesLookup"
        :regle-validation="validationFields?.timezone"
        required
      />
      <wt-textarea
        v-model:model-value="modelValue.description"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { CalendarsAPI } from '@webitel/api-services/api';
import type { EngineRegion } from '@webitel/api-services/gen/models';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<EngineRegion>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<EngineRegion>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();
</script>
