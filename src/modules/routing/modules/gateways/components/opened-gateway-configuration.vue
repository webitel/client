<template>
  <wt-editable-list
    v-model:model-value="modelValue.ipacl"
    :create-row="createIpAcl"
    :disabled="disableUserInput"
    :headers="headers"
  >
    <template #title>
      <h3 class="table-title__title">
        {{ t('objects.routing.gateways.trunkingACLTitle') }}
      </h3>
    </template>
    <template #proto="{ item }">
      <wt-single-select
        v-model:model-value="item.proto"
        :show-clear="false"
        :disabled="disableUserInput"
        :options="protocolOptions"
        :data-key="null"
      />
    </template>
    <template #ip="{ item, index }">
      <wt-input-text
        v-model:model-value="item.ip"
        :disabled="disableUserInput"
        :regle-validation="validationFields?.ipacl?.$each?.[index]?.$fields?.ip"
        required
      />
    </template>
    <template #port="{ item }">
      <wt-input-number
        v-model:model-value="item.port"
        :disabled="disableUserInput"
      />
    </template>
  </wt-editable-list>
</template>

<script setup lang="ts">
import { GatewayIpAclProtocol } from '@webitel/api-services/enums';
import type { GatewayCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

const modelValue = defineModel<GatewayCard>({
	required: true,
});

defineProps<{
	validationFields?: CardValidationFields<GatewayCard>;
}>();

const { t } = useI18n();
const { disableUserInput } = useUserAccessControl();

const protocolOptions = Object.values(GatewayIpAclProtocol);

const headers = computed(() => [
	{
		value: 'proto',
		text: t('objects.routing.protocol'),
	},
	{
		value: 'ip',
		text: t('objects.routing.ip'),
	},
	{
		value: 'port',
		text: t('objects.routing.port'),
	},
]);

const createIpAcl = (): NonNullable<GatewayCard['ipacl']>[number] => ({
	ip: '',
	proto: GatewayIpAclProtocol.Any,
	port: null,
});
</script>
