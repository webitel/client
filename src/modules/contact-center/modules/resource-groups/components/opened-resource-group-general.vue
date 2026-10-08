<template>
  <section class="opened-resource-group-general">
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
        v-model:model-value="modelValue.communication"
        :show-clear="false"
        :disabled="disableUserInput || !hasCommunicationsReadAccess"
        :label="t('objects.lookups.communications.communications', 1)"
        :search-method="CommunicationsAPI.getLookup"
        :regle-validation="validationFields?.communication"
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
import { CommunicationsAPI } from '@webitel/api-services/api';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { WtObject } from '@webitel/ui-sdk/enums';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import type { ResourceGroupCard } from '../stores/card/resourceGroupsCardStore';

const modelValue = defineModel<ResourceGroupCard>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<ResourceGroupCard>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasCommunicationsReadAccess } = useUserAccessControl(
	WtObject.Communication,
);
</script>
