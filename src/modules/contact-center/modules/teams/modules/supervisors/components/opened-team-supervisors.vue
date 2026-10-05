<template>
  <section class="table-section">
    <supervisor-popup
      :parent-id="teamId"
      @saved="loadDataList"
    />
    <supervisor-subordinates-popup
      :shown="!!subordinatesSupervisorId"
      :supervisor-id="subordinatesSupervisorId"
      :team-id="teamId"
      @close="closeSubordinates"
    />
    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.agents.supervisors', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.REFRESH]"
          :disabled:add="!hasSupervisorsUpdateAccess || !teamId"
          @click:add="open"
          @click:refresh="loadDataList"
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
              name: `${RouteNames.AGENTS}-card`,
              params: { id: item.id },
            }"
            target="_blank"
          >
            {{ item.name }}
          </wt-item-link>
        </template>

        <template #actions="{ item }">
          <wt-icon-btn
            v-tooltip="t('objects.ccenter.agents.subordinates', 2)"
            icon="queue-member"
            @click="openSubordinates(item.id)"
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
import { useNestedTableList } from '@webitel/ui-datalist';
import { useCardListNavigation } from '@webitel/ui-datalist/card';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction, WtObject } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import { useTeamsCardStore } from '../../../stores/card/teamsCardStore';
import { useTeamSupervisorsDatalistStore } from '../stores/datalist/teamSupervisorsDatalistStore';
import SupervisorSubordinatesPopup from './opened-team-supervisor-subordinates-popup.vue';
import SupervisorPopup from './opened-team-supervisors-popup.vue';

const { t } = useI18n();

const { hasUpdateAccess: hasSupervisorsUpdateAccess } = useUserAccessControl(
	WtObject.Agent,
);

const teamsCardStore = useTeamsCardStore();
const { itemId: teamId } = storeToRefs(teamsCardStore);

const teamSupervisorsDatalistStore = useNestedTableList({
	useTableStore: useTeamSupervisorsDatalistStore,
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
} = storeToRefs(teamSupervisorsDatalistStore);
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
} = teamSupervisorsDatalistStore;

const { open } = useCardListNavigation({
	routeParamName: 'supervisorId',
});

const subordinatesSupervisorId = ref<string | null>(null);

const openSubordinates = (id: string) => {
	subordinatesSupervisorId.value = id;
};

const closeSubordinates = () => {
	subordinatesSupervisorId.value = null;
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
