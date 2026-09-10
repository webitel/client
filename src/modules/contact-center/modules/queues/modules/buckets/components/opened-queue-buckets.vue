<template>
  <section class="table-section">
    <bucket-popup
      :key="parentId"
      @saved="loadDataList"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.lookups.buckets.buckets', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.REFRESH, IconAction.DELETE]"
          :disabled:add="disableUserInput"
          :disabled:delete="disableUserInput || !selected.length"
          @click:add="add"
          @click:refresh="loadDataList"
          @click:delete="deleteEls(selected)"
        >
          <template #search-bar>
            <dynamic-filter-search
              :filters-manager="filtersManager"
              single-search-name="search"
              @filter:add="addFilter"
              @filter:delete="deleteFilter"
              @filter:update="updateFilter"
            />
          </template>
        </wt-action-bar>
      </div>
    </header>

    <div class="table-section__table-wrapper">
      <wt-empty
        v-show="showEmpty"
        :image="imageEmpty"
        :text="textEmpty"
      />

      <wt-loader v-show="isLoading" />

      <wt-table
        v-show="dataList.length && !isLoading"
        :data="dataList"
        :headers="shownHeaders"
        :selected="selected"
        sortable
        @sort="updateSort"
        @update:selected="updateSelected"
      >
        <template #name="{ item }">
          {{ item.bucket?.name }}
        </template>
        <template #priority="{ item }">
          {{ item.priority }}
        </template>
        <template #state="{ item, index }">
          <!-- the column reads as "enabled"; the stored field is `disabled` -->
          <wt-switcher
            :disabled="disableUserInput"
            :model-value="!item.disabled"
            @update:model-value="
              patchItemProperty({ index, path: 'disabled', value: !$event })
            "
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            :disabled="disableUserInput"
            action="edit"
            @click="edit(item)"
          />
          <wt-icon-action
            :disabled="disableUserInput"
            action="delete"
            @click="deleteEls([item])"
          />
        </template>
      </wt-table>
      <wt-pagination
        :next="next"
        :prev="page > 1"
        :size="size"
        debounce
        @change="updateSize"
        @next="updatePage(page + 1)"
        @prev="updatePage(page - 1)"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { EngineQueueBucket } from '@webitel/api-services/gen/models';
import { useNestedTableList } from '@webitel/ui-datalist';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useEnsureQueueSaved } from '../../../composables/useEnsureQueueSaved';
import { useQueueBucketsDatalistStore } from '../stores/datalist/queueBucketsDatalistStore';
import BucketPopup from './opened-queue-buckets-popup.vue';

// the card page still passes `namespace` and a vuelidate instance to every tab

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { disableUserInput } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

const parentId = computed(() => route.params.id as string);
const isNewQueue = computed(() => !parentId.value || parentId.value === 'new');

const tableStore = useNestedTableList({
	useTableStore: useQueueBucketsDatalistStore,
});
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	selected,
	shownHeaders,
	filtersManager,
} = storeToRefs(tableStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	updateSelected,
	deleteEls,
	patchItemProperty,
	addFilter,
	updateFilter,
	deleteFilter,
} = tableStore;

const ensureQueueSaved = useEnsureQueueSaved();

const openPopup = (bucketId: string, id: string = parentId.value) =>
	router.push({
		name: route.name,
		params: {
			...route.params,
			id,
			bucketId,
		},
		query: route.query,
	});

const add = async () => {
	if (!isNewQueue.value) return openPopup('new');

	const savedId = await ensureQueueSaved();
	if (!savedId) return;

	// the queue's id landed in the route only now, so pass it explicitly
	return openPopup('new', String(savedId));
};

const edit = (item: EngineQueueBucket) => openPopup(String(item.id));

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>

<style
  lang="scss"
  scoped
></style>
