<template>
  <wt-popup
    class="queue-member-communications-popup"
    @close="emit('close')"
  >
    <template #title>
      {{ t('objects.ccenter.members.communications') }}
    </template>
    <template #main>
      <section class="queue-member-communications-popup__wrapper table-section">
        <div
          class="table-section__table-wrapper queue-member-communications-popup__table-wrapper"
        >
          <wt-loader v-if="!dataList.length && isLoading" />
          <wt-empty
            v-else-if="showEmpty"
            :image="imageEmpty"
            :text="textEmpty"
          />
          <wt-table
            v-else
            :data="dataList"
            :grid-actions="false"
            :headers="shownHeaders"
            :lazy="true"
            :on-loading="loadNextPage"
            :selectable="false"
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
        </div>
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
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
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

const queueMemberCommunicationsDatalistStore =
	useQueueMemberCommunicationsDatalistStore();
const { dataList, error, isLoading, next, shownHeaders } = storeToRefs(
	queueMemberCommunicationsDatalistStore,
);
const {
	initialize,
	appendToDataList,
	updateSort,
	hasFilter,
	addFilter,
	updateFilter,
	$reset,
} = queueMemberCommunicationsDatalistStore;

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	error,
	isLoading,
});

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

onUnmounted($reset);
</script>

<style lang="scss" scoped>
.queue-member-communications-popup__table-wrapper {
  flex: 0 0 440px;
}
</style>
