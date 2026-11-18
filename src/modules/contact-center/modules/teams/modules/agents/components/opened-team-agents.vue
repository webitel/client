<template>
  <section class="table-section">
    <agent-popup
      :parent-id="teamId"
      @saved="loadDataList"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.agents.agents', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.REFRESH]"
          :disabled:add="!hasAgentsUpdateAccess || !teamId"
          @click:add="open"
          @click:refresh="loadDataList"
        >
          <template #search-bar>
            <dynamic-filter-search
              :filters-manager="filtersManager"
              :is-filters-restoring="isFiltersRestoring"
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
        reorderable-columns
        resizable-columns
        sortable
        @column-reorder="columnReorder"
        @column-resize="columnResize"
        @sort="updateSort"
      >
        <template #name="{ item }">
          <wt-item-link
            :link="{
              name: `${RouteNames.Agents}-card`,
              params: { id: item.id },
            }"
            target="_blank"
          >
            {{ item.name }}
          </wt-item-link>
        </template>
        <template #state="{ item }">
          <wt-indicator
            :color="statusIndicatorColor[snakeToCamel(item.status)]"
            :text="statusIndicatorText[snakeToCamel(item.status)]"
          />
        </template>
        <template #supervisor="{ item }">
          <wt-display-chip-items :items="item.supervisor ?? []" />
        </template>
        <template #skills="{ item }">
          <wt-display-chip-items :items="item.skills ?? []" />
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
import { useNestedTableList } from '@webitel/ui-datalist';
import { useCardListNavigation } from '@webitel/ui-datalist/card';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction, WtObject } from '@webitel/ui-sdk/enums';
import { snakeToCamel } from '@webitel/ui-sdk/scripts';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { RouteNames } from '../../../../../../../app/router/_internals/RouteNames.enum';
import { useAgentStatusIndicator } from '../../../../agents/composables/useAgentStatusIndicator';
import { useTeamsCardStore } from '../../../stores/card/teamsCardStore';
import { useTeamAgentsDatalistStore } from '../stores/datalist/teamAgentsDatalistStore';
import AgentPopup from './opened-team-agents-popup.vue';

const { t } = useI18n();

const { hasUpdateAccess: hasAgentsUpdateAccess } = useUserAccessControl(
	WtObject.Agent,
);
const { statusIndicatorColor, statusIndicatorText } = useAgentStatusIndicator();

const teamsCardStore = useTeamsCardStore();
const { itemId: teamId } = storeToRefs(teamsCardStore);

const teamAgentsDatalistStore = useNestedTableList({
	useTableStore: useTeamAgentsDatalistStore,
});
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	shownHeaders,
	filtersManager,
	isFiltersRestoring,
} = storeToRefs(teamAgentsDatalistStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	columnResize,
	columnReorder,
	addFilter,
	updateFilter,
	deleteFilter,
} = teamAgentsDatalistStore;

const { open } = useCardListNavigation({
	routeParamName: 'agentId',
});

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
