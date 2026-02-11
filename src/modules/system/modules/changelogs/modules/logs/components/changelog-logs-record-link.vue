<template>
  <adm-item-link
    v-if="recordRouteName"
    :id="item.record.id"
    :route-name="recordRouteName"
  >
    {{ item.record.id }}
  </adm-item-link>
  <div v-else>
    {{ item.record.id }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { LoggerAvailableSystemObjects } from 'webitel-sdk';

import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';

const props = defineProps({
	item: {
		type: Object,
		required: true,
	},
});

const recordRouteName = computed(() => {
	switch (props.item.object.name) {
		case LoggerAvailableSystemObjects.Schema:
			return RouteNames.FLOW;
		case LoggerAvailableSystemObjects.CcQueue:
			return RouteNames.QUEUES;
		default:
			return null;
	}
});
</script>

<style lang="scss" scoped>

</style>
