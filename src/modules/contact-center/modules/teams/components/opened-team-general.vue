<template>
  <section>
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <div class="opened-card-input-grid opened-card-input-grid--1-col">
        <wt-input-text
          v-model:model-value="modelValue.name"
          :disabled="disableUserInput"
          :label="t('objects.name')"
          :regle-validation="validationFields?.name"
          required
        />
        <wt-multi-select
          v-model:model-value="modelValue.admin"
          :disabled="disableUserInput || !hasAdminsReadAccess"
          :label="t('objects.ccenter.agents.admins', 1)"
          :search-method="AgentsAPI.getList"
        />
        <wt-single-select
          v-if="hasLicenseOnWfm"
          v-model:model-value="modelValue.forecastCalculation"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.teams.forecastCalculation')"
          :search-method="ForecastCalculationsAPI.getLookup"
        />
      </div>
      <div class="opened-card-input-grid opened-card-input-grid--1-col">
        <wt-single-select
          v-model:model-value="modelValue.strategy"
          :show-clear="false"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.teams.strategy')"
          :options="strategyOptions"
          :regle-validation="validationFields?.strategy"
          required
          data-key="value"
          option-value="value"
        />
        <wt-textarea
          v-model:model-value="modelValue.description"
          :disabled="disableUserInput"
          :label="t('objects.description')"
        />
        <wt-switcher
          v-model:model-value="modelValue.screenControl"
          :disabled="disableUserInput"
          :label="t('objects.ccenter.agents.agentScreenControl')"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { AgentsAPI, ForecastCalculationsAPI } from '@webitel/api-services/api';
import type { EngineAgentTeam } from '@webitel/api-services/gen/models';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { WtObject } from '@webitel/ui-sdk/enums';
import { WebitelLicense } from '@webitel/ui-sdk/modules/Userinfo';
import { kebabToCamel } from '@webitel/ui-sdk/scripts';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { useUserinfoStore } from '../../../../userinfo/stores/userinfoStore';
import { TeamStrategy } from '../enums/TeamStrategy.enum';

const modelValue = defineModel<EngineAgentTeam>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<EngineAgentTeam>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasAdminsReadAccess } = useUserAccessControl(
	WtObject.Agent,
);

const { hasLicense } = useUserinfoStore();
const hasLicenseOnWfm = computed(() => hasLicense(WebitelLicense.WFM));

const strategyOptions = computed(() =>
	Object.values(TeamStrategy).map((strategy) => ({
		name: t(`objects.ccenter.teams.strategies.${kebabToCamel(strategy)}`),
		value: strategy,
	})),
);
</script>
