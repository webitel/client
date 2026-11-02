<template>
  <section class="opened-gateway-general">
    <div class="opened-card-input-grid">
      <wt-input-text
        v-model:model-value="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
      />
      <template v-if="modelValue.register">
        <wt-input-text
          v-model:model-value="modelValue.account"
          :disabled="disableUserInput"
          :label="t('objects.routing.gateways.account')"
          :regle-validation="validationFields?.account"
          required
        />
        <wt-input-text
          v-model:model-value="modelValue.username"
          :disabled="disableUserInput"
          :label="t('objects.routing.gateways.authID')"
        />
        <password-input
          v-model="modelValue.password"
          :disabled="disableUserInput"
          :regle-validation="validationFields?.password"
          required
        />
      </template>
      <wt-input-text
        v-model:model-value="modelValue.proxy"
        :disabled="disableUserInput"
        :label="proxyLabel"
        :regle-validation="validationFields?.proxy"
        required
      />
      <wt-single-select
        v-model:model-value="modelValue.schema"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="t('objects.routing.schema')"
        :search-method="hasFlowsReadAccess ? FlowsAPI.getLookup : undefined"
      />
      <wt-input-text
        v-if="!modelValue.register"
        v-model:model-value="modelValue.host"
        :disabled="disableUserInput"
        :label="t('objects.routing.gateways.host')"
        :regle-validation="validationFields?.host"
        required
      />
      <wt-textarea
        v-model:model-value="modelValue.usage"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
      <wt-input-number
        v-if="modelValue.register"
        v-model:model-value="modelValue.expires"
        :disabled="disableUserInput"
        :label="t('objects.routing.gateways.expire')"
        :regle-validation="validationFields?.expires"
        required
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { FlowsAPI } from '@webitel/api-services/api';
import type { GatewayCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import PasswordInput from '../../../../../app/components/utils/generate-password-input.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<GatewayCard>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<GatewayCard>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
	WtObject.Flow,
);

const proxyLabel = computed(() =>
	modelValue.value.register
		? t('objects.routing.gateways.outboundProxy')
		: t('objects.routing.gateways.proxy'),
);
</script>
