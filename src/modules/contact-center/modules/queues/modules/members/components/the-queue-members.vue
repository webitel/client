<template>
  <wt-page-wrapper
    :actions-panel="isFiltersPanelShown"
    class="table-page"
  >
    <template #header>
      <wt-page-header
        :hide-primary="disableUserInput"
        :primary-action="create"
        :secondary-action="close"
      >
        <template #primary-action>
          <wt-button-select
            :options="saveOptions"
            @click="create"
            @click:option="({ callback }) => callback()"
          >
            {{ t('objects.add') }}
          </wt-button-select>
          <input
            ref="fileInput"
            accept=".csv"
            class="upload-file-input"
            type="file"
            @change="inputFileHandler"
          >
        </template>
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #actions-panel>
      <the-queue-members-filters @hide="isFiltersPanelShown = false" />
    </template>

    <template #main>
      <destinations-popup
        v-if="destinationsOnPopup"
        :communications="destinationsOnPopup"
        @close="destinationsOnPopup = null"
      />

      <upload-popup
        :file="csvFile"
        :parent-id="queueId"
        @close="closeCsvPopup"
      />

      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />

      <reset-popup
        v-if="isResetPopup"
        :callback="resetMembers"
        :date-range="selectedDateRange"
        :quantity="resetMembersQuantity"
        :shown="!disableUserInput && isResetPopup"
        @close="isResetPopup = false"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title typo-heading-3">
            {{ t('objects.ccenter.members.allMembers') }}
          </h3>
          <div class="table-title__actions-wrap">
            <wt-action-bar
              :include="[IconAction.REFRESH, IconAction.FILTERS, IconAction.COLUMNS]"
              @click:filters="isFiltersPanelShown = !isFiltersPanelShown"
              @click:refresh="loadDataList"
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

            <template #filters="{ action, onClick }">
              <wt-badge :hidden="!filtersManager.hasFilters">
                <wt-icon-action
                  :action="action"
                  @click="onClick"
                />
              </wt-badge>
            </template>
              <template #columns>
                <wt-table-column-select
                  :headers="headers"
                  @change="updateShownHeaders"
                />
              </template>

              <wt-icon-btn
                v-tooltip="t('objects.ccenter.members.resetMembers.resetMembers')"
                :disabled="disableUserInput"
                icon="member-reset"
                icon-prefix="adm"
                @click="openResetPopup"
              />

              <wt-context-menu
                :options="deleteOptions"
                @click="$event.option.method()"
              >
                <template #activator="{ toggle }">
                  <wt-icon-action
                    :disabled="disableUserInput"
                    action="delete"
                    @click="toggle"
                  />
                </template>
              </wt-context-menu>
            </wt-action-bar>
          </div>
        </header>

        <div class="table-section__table-wrapper">
          <wt-empty
            v-show="showEmpty"
            :disabled-primary-action="disableUserInput"
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
              <wt-item-link :link="memberLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #createdAt="{ item }">
              {{ asDate(item.createdAt) }}
            </template>
            <template #offeringAt="{ item }">
              <div v-if="item.minOfferingAt">
                {{ asDate(item.minOfferingAt) }}
              </div>
            </template>
            <template #priority="{ item }">
              {{ item.priority }}
            </template>
            <template #endCause="{ item }">
              <div v-if="item.stopCause">
                {{ endCauseText(item.stopCause) }}
              </div>
            </template>
            <template #destination="{ item }">
              <div
                v-if="item.communications?.length"
                class="members__destinations-wrapper"
              >
                <span>{{ item.communications[0].destination }}</span>
                <wt-chip
                  v-if="item.communications.length > 1"
                  class="members__destinations-num"
                  @click="destinationsOnPopup = item.communications"
                >+{{ item.communications.length - 1 }}</wt-chip>
              </div>
            </template>
            <template #attempts="{ item }">
              {{ item.attempts || 0 }}
            </template>
            <template #agent="{ item }">
              <adm-item-link
                v-if="item.agent"
                :id="item.agent.id"
                :route-name="RouteNames.AGENTS"
                target="_blank"
              >
                {{ item.agent.name }}
              </adm-item-link>
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
import type {
	EngineMemberCommunication,
	EngineMemberInQueue,
} from '@webitel/api-services/gen/models';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import {
	computed,
	getCurrentInstance,
	onMounted,
	ref,
	useTemplateRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import dummyPicDark from '../assets/adm-dummy-members-dark.svg';
import dummyPicLight from '../assets/adm-dummy-members-light.svg';
import { useParentQueue } from '../composables/useParentQueue';
import { defaultMemberPriorityFilter } from '../configs/filtersOptions';
import { useQueueMembersDatalistStore } from '../stores';
import DestinationsPopup from './communications/opened-queue-member-destinations-popup.vue';
import ResetPopup from './reset-members-popup.vue';
import TheQueueMembersFilters from './the-queue-members-filters.vue';
import UploadPopup from './upload-members-popup.vue';

const { t, te } = useI18n();
const router = useRouter();

const { parentQueue, queueId, isInboundQueue } = useParentQueue();

const { disableUserInput: disableUserInputOnNoAccess } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

/** an inbound queue's members come from the flow, so they cannot be edited */
const disableUserInput = computed(
	() => disableUserInputOnNoAccess.value || isInboundQueue.value,
);

const tableStore = useQueueMembersDatalistStore();
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	selected,
	headers,
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
	updateShownHeaders,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
	hasFilter,
} = tableStore;

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const isFiltersPanelShown = ref(false);
const isResetPopup = ref(false);
const resetMembersQuantity = ref(0);
const csvFile = ref<File | null>(null);
const destinationsOnPopup = ref<EngineMemberCommunication[] | null>(null);
const fileInput = useTemplateRef<HTMLInputElement>('fileInput');

const path = computed(() => {
	const baseUrl = `/contact-center/queues/${parentQueue.value?.id}`;
	return [
		{
			name: t('objects.ccenter.ccenter'),
		},
		{
			name: parentQueue.value?.name,
			route: baseUrl,
		},
		{
			name: t('objects.ccenter.members.members', 2),
			route: `${baseUrl}/members`,
		},
	];
});

const asDate = (value?: number | string) =>
	value ? formatDate(+value, FormatDateMode.DATETIME) : '';

const endCauseText = (stopCause: string) => {
	const localeKey = stopCause.replace(/_([a-z])/g, (_, char: string) =>
		char.toUpperCase(),
	);
	const key = `objects.stopCause.${localeKey}`;
	return te(key) ? t(key) : stopCause;
};

/** the reset popup tells the user which window it is about to clear */
const selectedDateRange = computed(() => {
	const createdAt = filtersManager.value.getFilter('createdAt')?.value as
		| {
				from?: number;
				to?: number;
		  }
		| undefined;
	const asShortDate = (value?: number) =>
		value ? formatDate(+value, FormatDateMode.DATETIME_SHORT) : undefined;

	return {
		from: asShortDate(createdAt?.from),
		to: asShortDate(createdAt?.to),
	};
});

const currentFilters = () => filtersManager.value.getAllValues();

/** every bulk mutation leaves the list stale, so all of them reload it */
const withReload =
	<A extends unknown[]>(action: (...args: A) => Promise<unknown>) =>
	async (...args: A) => {
		try {
			return await action(...args);
		} finally {
			await loadDataList();
		}
	};

const resetMembers = withReload(() =>
	QueueMembersAPI.resetMembers({
		parentId: queueId.value,
		filters: currentFilters(),
	}),
);

const openResetPopup = async () => {
	resetMembersQuantity.value = await QueueMembersAPI.getQuantity({
		parentId: queueId.value,
		filters: currentFilters(),
	});
	isResetPopup.value = true;
};

const deleteAll = withReload(() =>
	QueueMembersAPI.deleteBulk({
		parentId: queueId.value,
		filters: {},
	}),
);

const deleteFiltered = withReload(() =>
	QueueMembersAPI.deleteBulk({
		parentId: queueId.value,
		filters: currentFilters(),
	}),
);

/**
 * One request for the whole selection. `deleteEls` would fire one per row,
 * which is what the row-level delete icon wants but not this.
 */
const deleteSelected = withReload(() =>
	QueueMembersAPI.deleteBulk({
		parentId: queueId.value,
		id: selected.value.map(({ id }) => id),
	}),
);

const deleteOptions = computed(() => {
	const options = [
		{
			text: t('iconHints.deleteAll'),
			method: deleteAll,
		},
		{
			text: t('iconHints.deleteFiltered'),
			method: deleteFiltered,
		},
	];
	if (selected.value.length) {
		options.push({
			text: t('iconHints.deleteSelected', {
				count: selected.value.length,
			}),
			method: deleteSelected,
		});
	}
	return options;
});

const triggerFileInput = () => fileInput.value?.click();

const saveOptions = computed(() => [
	{
		text: t('objects.integrations.importCsv.importCsv', 2),
		callback: triggerFileInput,
	},
]);

const inputFileHandler = (event: Event) => {
	const input = event.target as HTMLInputElement;
	const file = input.files?.[0];
	if (file) csvFile.value = file;
	input.value = '';
};

const closeCsvPopup = () => {
	csvFile.value = null;
	return loadDataList();
};

const memberLink = (item: EngineMemberInQueue) => ({
	name: `${RouteNames.MEMBERS}-card`,
	params: {
		queueId: queueId.value,
		id: item.id,
	},
});

const create = () =>
	router.push({
		name: `${RouteNames.MEMBERS}-card`,
		params: {
			queueId: queueId.value,
			id: 'new',
		},
	});

const edit = (item: EngineMemberInQueue) => router.push(memberLink(item));

const close = () =>
	router.push({
		name: RouteNames.QUEUES,
	});

/**
 * The seeded `priority` default is not a filter the user chose, so an empty
 * queue keeps the "no members yet" state instead of flipping to
 * "nothing matches your criteria".
 */
const userChosenFilters = computed(() => {
	const { name } = defaultMemberPriorityFilter();
	const { [name]: _seeded, ...rest } = filtersManager.value.getAllValues();

	return rest;
});

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
	primaryActionText: primaryActionTextEmpty,
} = useTableEmpty(
	{
		dataList,
		error,
		filters: userChosenFilters,
		isLoading,
	},
	{
		image: {
			empty: {
				dark: dummyPicDark,
				light: dummyPicLight,
			},
		},
		text: {
			empty: t('objects.ccenter.members.emptyWorkspace'),
		},
	},
);

/**
 * Seeded here rather than in the filters panel: that component only mounts
 * while the panel is open, and the default has to be in place for the very
 * first request. Applied again after `initialize` for the one case the restore
 * path clobbers it — a snapshot persisted before this default existed.
 */
const seedDefaultFilters = () => {
	const priority = defaultMemberPriorityFilter();

	if (!hasFilter(priority.name)) addFilter(priority);
};

// restoring persisted filters builds their configs, which reach for i18n
const instance = getCurrentInstance();
onMounted(() =>
	instance?.appContext.app.runWithContext(async () => {
		seedDefaultFilters();
		await initialize({
			parentId: queueId.value,
		});
		seedDefaultFilters();
	}),
);
</script>

<style
  lang="scss"
  scoped
>
@use '@webitel/ui-sdk/src/css/main' as *;

.members__destinations-wrapper {
  display: flex;
  gap: var(--spacing-xs);
}

.members__destinations-num {
  cursor: pointer;
}

.upload-file-input {
  position: absolute;
  visibility: hidden;
  width: 100%;
}
</style>
