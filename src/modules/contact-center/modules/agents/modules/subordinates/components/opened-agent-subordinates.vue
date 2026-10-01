<template>
  <section class="table-section">
    <subordinate-popup
      :parent-id="agentId"
      @saved="loadDataList"
    />
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
        {{ t('objects.ccenter.agents.subordinates', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.REFRESH, IconAction.DELETE]"
          :disabled:add="disableUserInput || !agentId"
          :disabled:delete="disableUserInput || !selected.length"
          @click:add="open"
          @click:refresh="loadDataList"
          @click:delete="deleteEls(selected)"
        >
          <template #search-bar>
            <dynamic-filter-search
              :filters-manager="filtersManager"
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
        :grid-actions="!disableUserInput"
        :headers="shownHeaders"
        :selected="selected"
        reorderable-columns
        resizable-columns
        sortable
        @column-reorder="columnReorder"
        @column-resize="columnResize"
        @sort="updateSort"
        @update:selected="updateSelected"
      >
        <template #name="{ item }">
          <wt-item-link
            :link="{
              name: `${RouteNames.AGENTS}-card`,
              params: { id: item.id },
            }"
            target="_blank"
          >
            {{ item.name }}
          </wt-item-link>
        </template>
        <template #supervisor="{ item }">
          <one-plus-many
            :collection="item.supervisor"
            @input="openListPopup('supervisor', item)"
          />
        </template>
        <template #skills="{ item }">
          <one-plus-many
            :collection="item.skills"
            @input="openListPopup('skills', item)"
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            action="edit"
            @click="open(item.id)"
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
import type { EngineAgent } from '@webitel/api-services/gen/models';
import { useNestedTableList } from '@webitel/ui-datalist';
import { useCardListNavigation } from '@webitel/ui-datalist/card';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import ObjectListPopup from '../../../../../../../app/components/utils/object-list-popup/object-list-popup.vue';
import OnePlusMany from '../../../../../../../app/components/utils/table-cell/one-plus-many-table-cell/one-plus-many-table-cell.vue';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import { useAgentsCardStore } from '../../../stores/card/agentsCardStore';
import { useAgentSubordinatesDatalistStore } from '../stores/datalist/agentSubordinatesDatalistStore';
import SubordinatePopup from './opened-agent-subordinates-popup.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { disableUserInput } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

const agentsCardStore = useAgentsCardStore();
const { itemId: agentId } = storeToRefs(agentsCardStore);

const agentSubordinatesDatalistStore = useNestedTableList({
	useTableStore: useAgentSubordinatesDatalistStore,
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
} = storeToRefs(agentSubordinatesDatalistStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	updateSelected,
	columnResize,
	columnReorder,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
} = agentSubordinatesDatalistStore;

const { open } = useCardListNavigation({
	routeParamName: 'subordinateId',
});

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

const openListPopup = (
	queryParam: 'supervisor' | 'skills',
	item: EngineAgent,
) =>
	router.push({
		name: route.name,
		params: route.params,
		query: {
			...route.query,
			[queryParam]: String(item.id),
		},
	});

const closeListPopup = () => {
	const query = {
		...route.query,
	};
	delete query.supervisor;
	delete query.skills;
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
