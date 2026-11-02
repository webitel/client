<template>
  <section>
    <header class="opened-card-header"></header>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-single-select
        v-model:model-value="modelValue.source"
        :disabled="disableUserInput || !hasQueuesReadAccess"
        :label="t('objects.integrations.importCsv.source')"
        :regle-validation="validationFields?.source"
        :search-method="(params) => QueuesAPI.getLookup({ ...params, type: sourceQueueTypes })"
        :show-clear="false"
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
import { QueuesAPI } from '@webitel/api-services/api';
import type { ImportTemplateCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { QueueType, WtObject } from '@webitel/ui-sdk/enums';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<ImportTemplateCard>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<ImportTemplateCard>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasQueuesReadAccess } = useUserAccessControl(
	WtObject.Queue,
);

/** [Claude] members are imported into any queue but an inbound one, which holds no member list */
const sourceQueueTypes = Object.values(QueueType).filter(
	(type) => type !== QueueType.INBOUND_QUEUE,
);
</script>
