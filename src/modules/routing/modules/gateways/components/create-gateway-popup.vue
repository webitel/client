<template>
  <wt-selection-popup
    v-bind="$attrs"
    :options="options"
    :selected="selected"
    :title="t('objects.routing.gateways.newGateway')"
    @change="selected = $event"
    @close="emit('close')"
    @add="create"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { GatewayType } from '../enums/GatewayType.enum';

interface GatewayTypeOption {
	value: GatewayType;
	title: string;
}

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();
const router = useRouter();

const options = computed<GatewayTypeOption[]>(() => [
	{
		value: GatewayType.Register,
		title: t('objects.routing.gateways.SIPregistrations'),
	},
	{
		value: GatewayType.Trunking,
		title: t('objects.routing.gateways.SIPtrunking'),
	},
]);

const selected = ref<GatewayTypeOption>(options.value[0]);

const create = () =>
	router.push({
		name: `${RouteNames.GATEWAYS}-card`,
		params: {
			id: 'new',
		},
		query: {
			type: selected.value.value,
		},
	});
</script>
