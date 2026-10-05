<template>
  <section class="opened-agent-pause-cause-general">
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-input-number
        v-model:model-value="modelValue.limitMin"
        :disabled="disableUserInput"
        :label="t('objects.lookups.pauseCause.limit')"
        :regle-validation="validationFields?.limitMin"
      />
      <wt-textarea
        v-model:model-value="modelValue.description"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
      <div class="opened-agent-pause-cause-general__checkboxes">
        <wt-checkbox
          v-model:selected="modelValue.allowAdmin"
          :disabled="disableUserInput"
          :label="t('objects.lookups.pauseCause.allowAdmin')"
        />
        <wt-checkbox
          v-model:selected="modelValue.allowSupervisor"
          :disabled="disableUserInput"
          :label="t('objects.lookups.pauseCause.allowSupervisor')"
        />
        <wt-checkbox
          v-model:selected="modelValue.allowAgent"
          :disabled="disableUserInput"
          :label="t('objects.lookups.pauseCause.allowAgent')"
        />
      </div>
      <wt-multi-select
        v-model:model-value="modelValue.teams"
        :disabled="disableUserInput"
        :label="t('objects.team')"
        :search-method="TeamsAPI.getLookup"
        chips-view
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { RegleSchemaFieldStatus } from '@regle/schemas';
import { TeamsAPI } from '@webitel/api-services/api';
import type { EngineAgentPauseCause } from '@webitel/api-services/gen/models';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<EngineAgentPauseCause>({
	required: true,
});

defineProps<{
	validationFields?: {
		[K in keyof EngineAgentPauseCause]?: RegleSchemaFieldStatus<
			EngineAgentPauseCause[K]
		>;
	};
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
</script>

<style scoped>
.opened-agent-pause-cause-general__checkboxes {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
