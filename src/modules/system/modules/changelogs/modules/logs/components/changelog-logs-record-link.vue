<template>
  <wt-item-link
    v-if="recordRouteName"
    :link="{
      name: `${recordRouteName}-card`,
      params: { id: item.record?.id },
    }"
  >
    {{ item.record?.id }}
  </wt-item-link>
  <div v-else>
    {{ item.record?.id }}
  </div>
</template>

<script setup lang="ts">
import {
	LoggerAvailableSystemObjects,
	type LoggerLog,
} from '@webitel/api-services/gen/models';
import { computed } from 'vue';

import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';

const props = defineProps<{
	item: LoggerLog;
}>();

/** [Claude] the objects whose records have a card to open */
const recordRouteNames: Partial<Record<string, string>> = {
	[LoggerAvailableSystemObjects.Schema]: RouteNames.FLOW,
	[LoggerAvailableSystemObjects.CcQueue]: RouteNames.QUEUES,
};

const recordRouteName = computed(
	() => recordRouteNames[props.item.object?.name ?? ''],
);
</script>
