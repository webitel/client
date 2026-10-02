<template>
  <wt-popup @close="emit('close')">
    <template #title>
      {{ t('objects.ccenter.members.communications') }}
    </template>
    <template #main>
      <section class="communications-popup">
        <wt-loader v-if="!dataList.length && isLoading" />
        <wt-table
          v-else
          :data="dataList"
          :grid-actions="false"
          :headers="shownHeaders"
          :lazy="true"
          :on-loading="loadNextPage"
          :selectable="false"
          class="popup-table"
          sortable
          @sort="updateSort"
        >
          <template #destination="{ item }">
            {{ item.destination }}
          </template>
          <template #type="{ item }">
            <div v-if="item.type">
              {{ item.type.name }}
            </div>
          </template>
          <template #priority="{ item }">
            {{ item.priority }}
          </template>
        </wt-table>
      </section>
    </template>
    <template #actions>
      <wt-button
        color="secondary"
        @click="emit('close')"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

import { useQueueMemberCommunicationsDatalistStore } from '../../stores/datalist/queueMemberCommunicationsDatalistStore';

const { queueId, memberId } = defineProps<{
	queueId: string | number;
	memberId: string;
}>();

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();

const store = useQueueMemberCommunicationsDatalistStore();
const { dataList, isLoading, next, shownHeaders } = storeToRefs(store);
const {
	initialize,
	appendToDataList,
	updateSort,
	hasFilter,
	addFilter,
	updateFilter,
	$reset,
} = store;

const loadNextPage = () => {
	if (!next.value || isLoading.value) return;
	return appendToDataList();
};

const queueFilter = {
	name: 'queueId',
	value: queueId,
};
if (hasFilter(queueFilter.name)) updateFilter(queueFilter);
else addFilter(queueFilter);

initialize({
	parentId: memberId,
});

// the store outlives the popup; the next member must not see these rows
onUnmounted($reset);
</script>

<style lang="scss" scoped>
/** `lazy` scroller has `contain: strict`, so it needs a fixed height */
.communications-popup {
  height: 35vh;
}
</style>
