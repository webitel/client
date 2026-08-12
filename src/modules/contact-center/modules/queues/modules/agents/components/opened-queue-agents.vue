<template>
  <section class="table-section">
    <object-list-popup
      :data-list="shownSupervisors"
      :shown="!!supervisorsRowId"
      :title="t('objects.ccenter.agents.supervisors', 2)"
      @close="closeListPopup"
    />
    <object-list-popup
      :data-list="shownSkills"
      :shown="!!skillsRowId"
      :title="t('objects.lookups.skills.skills', 2)"
      @close="closeListPopup"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.agents.agents', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar :include="[IconAction.REFRESH]" @click:refresh="loadDataList">
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
        :grid-actions="false"
        :headers="shownHeaders"
        :selectable="false"
        sortable
        @sort="updateSort"
      >
        <template #name="{ item }">
          <adm-item-link
            :id="item.id"
            :route-name="RouteNames.AGENTS"
            target="_blank"
          >
            {{ item.name }}
          </adm-item-link>
        </template>
        <template #supervisor="{ item }">
          <one-plus-many
            :collection="item.supervisor"
            @input="openSupervisors(item)"
          />
        </template>
        <template #state="{ item }">
          <wt-indicator
            :color="statusIndicatorColor[snakeToCamel(item.status)]"
            :text="statusIndicatorText[snakeToCamel(item.status)]"
          />
        </template>
        <template #skills="{ item }">
          <one-plus-many
            :collection="item.skills"
            @input="openSkills(item)"
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
import type { EngineAgent } from '@webitel/api-services/gen/models';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import { snakeToCamel } from '@webitel/ui-sdk/scripts';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import ObjectListPopup from '../../../../../../../app/components/utils/object-list-popup/object-list-popup.vue';
import OnePlusMany from '../../../../../../../app/components/utils/table-cell/one-plus-many-table-cell/one-plus-many-table-cell.vue';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import { useAgentStatusIndicator } from '../../../../../composables/useAgentStatusIndicator';
import { useQueueAgentsDatalistStore } from '../stores';

// the card page still passes `namespace` and a vuelidate instance to every tab
defineOptions({
	inheritAttrs: false,
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { statusIndicatorColor, statusIndicatorText } = useAgentStatusIndicator();

const parentId = computed(() => route.params.id as string);
const isNewQueue = computed(() => !parentId.value || parentId.value === 'new');

const tableStore = useQueueAgentsDatalistStore();
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	shownHeaders,
	filtersManager,
} = storeToRefs(tableStore);
const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	addFilter,
	updateFilter,
	deleteFilter,
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

/**
 * Both list popups are deep-linkable through a query param naming the row.
 * The row already carries the collection, so there is nothing to fetch — this
 * replaces a store getter that only ever looked the row up by id.
 */
const supervisorsRowId = computed(
	() => route.query.supervisor as string | undefined,
);
const skillsRowId = computed(() => route.query.skills as string | undefined);

const rowById = (id?: string) =>
	dataList.value.find((item) => String(item.id) === String(id));

const shownSupervisors = computed(
	() => rowById(supervisorsRowId.value)?.supervisor ?? [],
);
const shownSkills = computed(() => rowById(skillsRowId.value)?.skills ?? []);

const openSupervisors = (item: EngineAgent) =>
	router.push({
		name: route.name,
		params: route.params,
		query: {
			...route.query,
			supervisor: String(item.id),
		},
	});

const openSkills = (item: EngineAgent) =>
	router.push({
		name: route.name,
		params: route.params,
		query: {
			...route.query,
			skills: String(item.id),
		},
	});

const closeListPopup = () => {
	const query = {
		...route.query,
	};
	delete query.supervisor;
	delete query.skills;
	// strip the params rather than go(-1), which left the page on a cold open
	return router.push({
		name: route.name,
		params: route.params,
		query,
	});
};

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
