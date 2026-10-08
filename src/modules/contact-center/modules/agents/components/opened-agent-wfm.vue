<template>
  <section class="opened-agent-wfm">
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.ccenter.agents.wfm') }}
      </h3>
    </header>

    <div class="opened-card-input-grid">
      <wt-single-select
        :disabled="disableUserInput"
        :label="t('objects.ccenter.agents.workingConditions')"
        :search-method="WorkingConditionsAPI.getLookup"
        v-model:model-value="modelValue.workingCondition"
        :regle-validation="validationFields?.workingCondition"
        required
      />
      <wt-single-select
        :disabled="disableUserInput"
        :label="t('objects.ccenter.agents.pauseTemplate')"
        :search-method="PauseTemplatesAPI.getLookup"
        v-model:model-value="modelValue.pauseTemplate"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import {
	PauseTemplatesAPI,
	WorkingConditionsAPI,
} from '@webitel/api-services/api';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import type { AgentCard } from '../stores/card/agentsCardStore';

const modelValue = defineModel<AgentCard>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<AgentCard>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();
</script>
