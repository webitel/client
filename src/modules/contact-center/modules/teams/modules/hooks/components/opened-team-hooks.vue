<template>
  <section class="table-section">
    <hook-popup
      :parent-id="teamId"
      @saved="loadDataList"
    />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.queues.hooks.hooks', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.REFRESH, IconAction.DELETE]"
          :disabled:add="!hasUpdateAccess || !teamId"
          :disabled:delete="!hasUpdateAccess || !selected.length"
          @click:add="open"
          @click:refresh="loadDataList"
          @click:delete="
            askDeleteConfirmation({
              deleted: selected,
              callback: () => deleteEls(selected),
            })
          "
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
        <template #event="{ item }">
          {{ getEventText(item.event) }}
        </template>
        <template #schema="{ item }">
          <adm-item-link
            v-if="item.schema"
            :id="item.schema.id"
            :route-name="RouteNames.FLOW"
            target="_blank"
          >
            {{ item.schema.name }}
          </adm-item-link>
        </template>
        <template #state="{ item, index }">
          <wt-switcher
            :disabled="!hasUpdateAccess"
            :model-value="item.enabled"
            @update:model-value="
              patchItemProperty({ index, path: 'enabled', value: $event })
            "
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            :disabled="!hasUpdateAccess"
            action="edit"
            @click="open(item.id)"
          />
          <wt-icon-action
            :disabled="!hasUpdateAccess"
            action="delete"
            @click="
              askDeleteConfirmation({
                deleted: [item],
                callback: () => deleteEls([item]),
              })
            "
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
import { IconAction } from '@webitel/ui-sdk/enums';
import { snakeToCamel } from '@webitel/ui-sdk/scripts';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import { useTeamsCardStore } from '../../../stores/card/teamsCardStore';
import { useTeamHooksDatalistStore } from '../stores/datalist/teamHooksDatalistStore';
import HookPopup from './opened-team-hooks-popup.vue';

const { t } = useI18n();

const { hasUpdateAccess } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

const teamsCardStore = useTeamsCardStore();
const { itemId: teamId } = storeToRefs(teamsCardStore);

const teamHooksDatalistStore = useNestedTableList({
	useTableStore: useTeamHooksDatalistStore,
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
} = storeToRefs(teamHooksDatalistStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	columnResize,
	columnReorder,
	updateSelected,
	deleteEls,
	patchItemProperty,
} = teamHooksDatalistStore;

const { open } = useCardListNavigation({
	routeParamName: 'hookId',
});

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const getEventText = (event?: string) =>
	event
		? t(`objects.ccenter.teams.hooks.eventTypes.${snakeToCamel(event)}`)
		: '';

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
