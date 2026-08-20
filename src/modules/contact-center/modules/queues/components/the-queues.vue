<template>
  <wt-page-wrapper
    :actions-panel="isFiltersPanelShown"
    class="the-queues table-page"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #actions-panel>
      <queues-filters-panel @hide="isFiltersPanelShown = false" />
    </template>

    <template #main>
      <attempts-reset-popup
        :shown="isAttemptsResetPopup"
        @close="isAttemptsResetPopup = false"
        @reset="resetAttempts"
      />
      <queue-popup
        :shown="isQueueSelectPopup"
        @close="isQueueSelectPopup = false"
      />
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />
      <object-list-popup
        v-show="objectListPopupData"
        :data-list="objectListPopupData"
        :route-name="objectListPopupItemRouteName"
        :title="objectListPopupTitle"
        @close="closeObjectListPopup"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.ccenter.queues.allQueues') }}
          </h3>
          <div class="table-title__actions-wrap">
            <queues-global-state-switcher :disabled="!hasUpdateAccess" />
            <wt-action-bar
              :include="[IconAction.REFRESH, IconAction.FILTERS, IconAction.DELETE]"
              :disabled:delete="!hasDeleteAccess || !selected.length"
              @click:refresh="loadDataList"
              @click:filters="isFiltersPanelShown = !isFiltersPanelShown"
              @click:delete="
                askDeleteConfirmation({
                  deleted: selected,
                  callback: () => deleteEls(selected),
                })
              "
            >
              <template #search-bar>
                <dynamic-filter-search
                  :filters-manager="filtersManager"
                  single-search-name="search"
                  @filter:add="addFilter"
                  @filter:update="updateFilter"
                  @filter:delete="deleteFilter"
                />
              </template>
              
            <template #filters="{ action, onClick }">
              <wt-badge :hidden="!hasAnyFilters">
                <wt-icon-action
                  :action="action"
                  @click="onClick"
                />
              </wt-badge>
            </template>

              <!-- https://webitel.atlassian.net/browse/WTEL-8681 -->
              <!-- <wt-icon-btn
                v-if="isResetActiveAttemptsAllow"
                v-tooltip="t('objects.ccenter.queues.attemptsReset.resetActiveAttempts')"
                icon="update-calls"
                @click="isAttemptsResetPopup = true"
              /> -->
            </wt-action-bar>
          </div>
        </header>

        <div class="table-section__table-wrapper">
          <wt-empty
            v-show="showEmpty"
            :disabled-primary-action="!hasCreateAccess"
            :image="imageEmpty"
            :primary-action-text="primaryActionTextEmpty"
            :text="textEmpty"
            @click:primary="create"
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
              <adm-item-link
                :id="item.id"
                :route-name="RouteNames.QUEUES"
              >
                {{ item.name }}
              </adm-item-link>
            </template>

            <template #type="{ item }">
              {{ queueTypeName(item.type) }}
            </template>
            <template #activeCalls="{ item }">
              {{ item.active }}
            </template>
            <template #waiting="{ item }">
              {{ item.waiting }}
            </template>
            <template #priority="{ item }">
              {{ item.priority }}
            </template>
            <template #team="{ item }">
              <adm-item-link
                v-if="item.team"
                :id="item.team.id"
                :route-name="RouteNames.TEAMS"
                target="_blank"
              >
                {{ item.team.name }}
              </adm-item-link>
            </template>
            <template #tags="{ item }">
              <div
                v-if="item.tags"
                class="the-queues__tags"
              >
                <wt-chip
                  v-for="(tag, key) of item.tags"
                  :key="key"
                >
                  {{ tag.name }}
                </wt-chip>
              </div>
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasUpdateAccess"
                :model-value="item.enabled"
                @update:model-value="changeStateItem(index, $event)"
              />
            </template>
            <template #resourceGroups="{ item }">
              <one-plus-many
                v-if="item.resourceGroups"
                :collection="item.resourceGroups"
                :route-name="RouteNames.RESOURCE_GROUPS"
                @input="openResourceGroupsPopup(item)"
              />
            </template>
            <template #resources="{ item }">
              <one-plus-many
                v-if="item.resources"
                :collection="item.resources"
                :route-name="RouteNames.RESOURCES"
                @input="openResourcesPopup(item)"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-btn
                v-tooltip="t('iconHints.members')"
                icon="queue-member"
                @click="openMembers(item)"
              />
              <wt-icon-action
                :disabled="!hasUpdateAccess"
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                :disabled="!hasDeleteAccess"
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
  </wt-page-wrapper>
</template>

<script lang="ts" setup>
import { QueueMembersAPI } from '@webitel/api-services/api';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import ObjectListPopup from '../../../../../app/components/utils/object-list-popup/object-list-popup.vue';
import OnePlusMany from '../../../../../app/components/utils/table-cell/one-plus-many-table-cell/one-plus-many-table-cell.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import { useQueuesDatalistStore } from '../stores/datalist/queuesDatalistStore';
import { useQueuesGlobalStateStore } from '../stores/globalState/queuesGlobalStateStore';
import type { Queue } from '../types/Queue';
import AttemptsResetPopup from './attempts-reset-popup.vue';
import QueuePopup from './create-queue-popup.vue';
import QueuesFiltersPanel from './queues-filters-panel.vue';
import QueuesGlobalStateSwitcher from './queues-global-state-switcher.vue';

const { t } = useI18n();
const router = useRouter();

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const tableStore = useQueuesDatalistStore();
const { fetchGlobalState } = useQueuesGlobalStateStore();

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
	patchItemProperty,
	addFilter,
	updateFilter,
	deleteFilter,
} = tableStore;

initialize();

const isFiltersPanelShown = ref(false);
const isQueueSelectPopup = ref(false);
const isAttemptsResetPopup = ref(false);

/**
 * What `object-list-popup` accepts. The generated resource models are
 * interfaces without an index signature, so TS will not widen them to this
 * shape on its own — hence the casts at each assignment below.
 */
type ObjectListItem = {
	id?: string | number;
	name?: string;
	[key: string]: unknown;
};

const objectListPopupData = ref<ObjectListItem[] | null>(null);
const objectListPopupTitle = ref('');
const objectListPopupItemRouteName = ref<string | null>(null);

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const path = computed(() => [
	{
		name: t('objects.ccenter.ccenter'),
	},
	{
		name: t('objects.ccenter.queues.queues', 2),
		route: '/contact-center/queues',
	},
]);

const hasAnyFilters = computed(
	() => filtersManager.value.getAllKeys().length > 0,
);

const queueTypeName = (type: number) => {
	const properties = QueueTypeProperties[type];
	return properties ? t(properties.locale) : '';
};

const create = () => {
	isQueueSelectPopup.value = true;
};

const edit = (item: Queue) =>
	router.push({
		name: `${RouteNames.QUEUES}-card`,
		params: {
			id: item.id,
		},
	});

const openMembers = (item: Queue) =>
	router.push({
		name: RouteNames.MEMBERS,
		params: {
			queueId: item.id,
		},
	});

const openResourcesPopup = (item: Queue) => {
	objectListPopupData.value = item.resources as ObjectListItem[];
	objectListPopupTitle.value = t('objects.ccenter.queues.resources', 2);
	objectListPopupItemRouteName.value = RouteNames.RESOURCES;
};

const openResourceGroupsPopup = (item: Queue) => {
	objectListPopupData.value = item.resourceGroups as ObjectListItem[];
	objectListPopupTitle.value = t('objects.ccenter.queues.resourceGroups', 2);
	objectListPopupItemRouteName.value = RouteNames.RESOURCE_GROUPS;
};

const closeObjectListPopup = () => {
	objectListPopupData.value = null;
	objectListPopupTitle.value = '';
};

const changeStateItem = async (index: number, value: boolean) => {
	await patchItemProperty({
		index,
		path: 'enabled',
		value,
	});
	// the global switcher reflects the whole filtered set, so it moves too
	await fetchGlobalState();
};

const resetAttempts = async (resetAttemptsForm: unknown) => {
	await QueueMembersAPI.resetActiveAttempts(resetAttemptsForm);
	isAttemptsResetPopup.value = false;
};

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
	primaryActionText: primaryActionTextEmpty,
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
>
.the-queues__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}
</style>
