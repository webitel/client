<template>
  <section class="opened-resource-failure">
    <header class="opened-card-header">
      <h3 class="opened-card-header__title">
        {{ t('objects.ccenter.res.failure') }}
      </h3>
    </header>
    <div class="opened-card-input-grid">
      <wt-input-number
        v-model:model-value="modelValue.maxSuccessivelyErrors"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.res.maxErrors')"
        :regle-validation="validationFields?.maxSuccessivelyErrors"
        required
      />
      <wt-multi-select
        v-model:model-value="modelValue.errorIds"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.res.errorCodes')"
        :options="Object.values(ResourceErrorId)"
        :data-key="null"
        chips-view
        allow-custom-values
      />
      <wt-input-number
        v-model:model-value="modelValue.failureDialDelay"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.res.failureDialDelay')"
        :regle-validation="validationFields?.failureDialDelay"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { EngineOutboundResource } from '@webitel/api-services/gen/models';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { ResourceErrorId } from '../enums/ResourceErrorId.enum';

const modelValue = defineModel<EngineOutboundResource>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<EngineOutboundResource>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();
</script>
