<template>
  <section class="table-section">
    <resource-popup @saved="loadDataList" />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.res.res', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.REFRESH, IconAction.DELETE]"
          :disabled:add="disableUserInput"
          :disabled:delete="disableUserInput || !selected.length"
          @click:add="add"
          @click:refresh="loadDataList"
          @click:delete="deleteEls(selected)"
        />
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
        :grid-actions="!disableUserInput"
        :headers="shownHeaders"
        :selected="selected"
        sortable
        @sort="updateSort"
        @update:selected="updateSelected"
      >
        <template #name="{ item }">
          <adm-item-link
            v-if="item.resourceGroup"
            :id="item.resourceGroup.id"
            :route-name="RouteNames.RESOURCE_GROUPS"
            target="_blank"
          >
            {{ item.resourceGroup.name }}
          </adm-item-link>
        </template>
        <template #communication="{ item }">
          <div v-if="item.communication">
            {{ item.communication.name }}
          </div>
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            action="edit"
            @click="edit(item)"
          />
          <wt-icon-action
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
import type { EngineQueueResourceGroup } from '@webitel/api-services/gen/models';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import { useEnsureQueueSaved } from '../../../composables/useEnsureQueueSaved';
import { useQueueResGroupsDatalistStore } from '../stores/datalist/queueResGroupsDatalistStore';
import ResourcePopup from './opened-queue-resources-popup.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { disableUserInput } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

const parentId = computed(() => route.params.id as string);
const isNewQueue = computed(() => !parentId.value || parentId.value === 'new');

const tableStore = useQueueResGroupsDatalistStore();
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
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	updateSelected,
	deleteEls,
} = tableStore;

if (!isNewQueue.value)
	initialize({
		parentId: parentId.value,
	});

watch(parentId, (id, previous) => {
	if (id && id !== 'new' && previous === 'new')
		initialize({
			parentId: id,
		});
});

const ensureQueueSaved = useEnsureQueueSaved();

const openPopup = (resourceId: string) =>
	router.push({
		name: route.name,
		params: {
			...route.params,
			resourceId,
		},
		query: route.query,
	});

const add = async () => {
	if (isNewQueue.value) {
		const savedId = await ensureQueueSaved();
		if (!savedId) return;
	}
	return openPopup('new');
};

const edit = (item: EngineQueueResourceGroup) => openPopup(String(item.id));

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
