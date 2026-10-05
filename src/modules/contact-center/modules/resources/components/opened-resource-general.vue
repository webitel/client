<template>
  <section class="opened-resource-general">
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
      <wt-single-select
        v-model:model-value="modelValue.gateway"
        :disabled="disableUserInput || !hasGatewaysReadAccess"
        :label="t('objects.routing.gateways.gateways', 1)"
        :search-method="GatewaysAPI.getLookup"
        :regle-validation="validationFields?.gateway"
        required
      />
      <wt-input-number
        v-model:model-value="modelValue.rps"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.res.cps')"
        :regle-validation="validationFields?.rps"
        required
      />
      <wt-input-number
        v-model:model-value="modelValue.limit"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.res.limit')"
        :regle-validation="validationFields?.limit"
        required
      />
      <wt-single-select
        v-model:model-value="parameters.cidType"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.res.cidType')"
        :options="Object.values(ResourceCidType)"
        :data-key="null"
      />
      <wt-single-select
        v-model:model-value="parameters.ignoreEarlyMedia"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.res.ignoreEarlyMedia')"
        :options="Object.values(ResourceIgnoreEarlyMedia)"
        :data-key="null"
      />
      <wt-textarea
        v-model:model-value="modelValue.description"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
      <wt-multi-select
        v-model:model-value="modelValue.patterns"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.res.patterns')"
        :options="modelValue.patterns"
        :data-key="null"
        chips-view
        allow-custom-values
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import {
	ResourceCidType,
	ResourceIgnoreEarlyMedia,
} from '@webitel/api-services/enums';
import type {
	EngineOutboundResource,
	EngineOutboundResourceParameters,
} from '@webitel/api-services/gen/models';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import GatewaysAPI from '../../../../routing/modules/gateways/api/gateways';

const modelValue = defineModel<EngineOutboundResource>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<EngineOutboundResource>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasGatewaysReadAccess } = useUserAccessControl(
	WtObject.Gateway,
);

const parameters = computed<EngineOutboundResourceParameters>(() => {
	if (!modelValue.value.parameters) modelValue.value.parameters = {};
	return modelValue.value.parameters;
});
</script>
