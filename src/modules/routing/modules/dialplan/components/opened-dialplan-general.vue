<template>
  <section class="opened-dialplan-general">
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-single-select
        v-model:model-value="modelValue.schema"
        :show-clear="false"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="t('objects.routing.schema', 1)"
        :search-method="hasFlowsReadAccess ? FlowsAPI.getLookup : undefined"
        :regle-validation="validationFields?.schema"
        required
      />
      <div class="opened-dialplan-general__destination-wrapper">
        <wt-input-text
          v-model:model-value="modelValue.pattern"
          :disabled="disableUserInput"
          :label="t('objects.routing.dialplan.pattern')"
          :regle-validation="validationFields?.pattern"
          required
        />
        <wt-switcher
          v-model:model-value="modelValue.allowTransfer"
          :disabled="disableUserInput"
          :label="t('objects.routing.dialplan.allowTransfer')"
        />
      </div>
      <wt-textarea
        v-model:model-value="modelValue.description"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { FlowsAPI } from '@webitel/api-services/api';
import type { DialplanCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { WtObject } from '@webitel/ui-sdk/enums';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<DialplanCard>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<DialplanCard>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
	WtObject.Flow,
);
</script>

<style scoped>
.opened-dialplan-general__destination-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
