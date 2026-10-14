<template>
  <section class="opened-quick-reply-general">
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-multi-select
        v-model:model-value="modelValue.teams"
        :disabled="disableUserInput"
        :label="t('objects.team')"
        :search-method="TeamsAPI.getLookup"
      />
      <wt-textarea
        v-model:model-value="modelValue.text"
        :disabled="disableUserInput"
        :label="t('vocabulary.text')"
        :regle-validation="validationFields?.text"
        required
      />
      <wt-multi-select
        v-model:model-value="modelValue.queues"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.queues', 1)"
        :search-method="QueuesAPI.getLookup"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import { QueuesAPI, TeamsAPI } from '@webitel/api-services/api';
import type { EngineQuickReply } from '@webitel/api-services/gen/models';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<EngineQuickReply>({
	required: true,
});

defineProps<{
	validationFields?: {
		[K in keyof EngineQuickReply]?: RegleSchemaFieldStatus<EngineQuickReply[K]>;
	};
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
</script>
