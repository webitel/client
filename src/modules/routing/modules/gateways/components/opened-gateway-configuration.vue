<template>
  <section class="opened-gateway-configuration">
    <header class="table-title opened-gateway-configuration__header">
      <wt-action-bar
        :include="[IconAction.ADD]"
        :disabled:add="disableUserInput"
        @click:add="add"
      />
    </header>

    <wt-table
      :data="modelValue.ipacl"
      :headers="headers"
      :grid-actions="!disableUserInput"
      :selectable="false"
    >
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
      <template #actions="{ index }">
        <wt-icon-action
          :action="IconAction.DELETE"
          :disabled="disableUserInput"
          @click="remove(index)"
        />
      </template>
    </wt-table>
  </section>
</template>

<script setup lang="ts">
import { GatewayIpAclProtocol } from '@webitel/api-services/enums';
import type { GatewayCard } from '@webitel/api-services/validations';
import type { CardValidationFields } from '@webitel/ui-datalist/card';
import { IconAction } from '@webitel/ui-sdk/enums';
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

const add = () => {
	modelValue.value.ipacl?.push({
		ip: '',
		proto: GatewayIpAclProtocol.Any,
		port: null,
	});
};

const remove = (index: number) => {
	modelValue.value.ipacl?.splice(index, 1);
};
</script>

<style scoped>
/* [Claude] the bar is the header's only child, so space-between would leave it on the left */
.opened-gateway-configuration__header {
  justify-content: flex-end;
}
</style>
