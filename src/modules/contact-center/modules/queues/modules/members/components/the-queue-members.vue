<template>
  <wt-page-wrapper
    :actions-panel="isFiltersPanelShown"
    class="table-page"
  >
    <template #header>
      <wt-page-header
        :primary-action="create"
        :secondary-action="close"
      >
        <template #primary-action>
          <wt-button-select
            :disabled="disableUserInput"
            :options="saveOptions"
            @click="create"
            @click:option="({ callback }) => callback()"
          >
            {{ t('objects.add') }}
          </wt-button-select>
          <wt-button
            color="secondary"
            @click="isExportPopup = true"
          >
            {{ t('reusable.export') }}
          </wt-button>
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
      <table-filters-panel
        :filter-options="filtersOptions"
        :filters-manager="filtersManager"
        :has-read-access="userinfoStore.hasReadAccess"
        static-mode
        @filter:add="addFilter"
        @filter:update="updateFilter"
        @filter:delete="deleteFilter"
        @filter:reset-all="resetFilters"
      />
    </template>

    <template #main>
      <communications-popup
        v-if="communicationsMemberId"
        :member-id="communicationsMemberId"
        :queue-id="queueId"
        @close="communicationsMemberId = null"
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
        :callback="resetCallback"
        :date-range="selectedDateRange"
        :quantity="resetMembersQuantity"
        :scope="resetScope"
        :shown="!disableUserInput && isResetPopup"
        @close="closeReset"
      />

      <export-popup
        v-if="isExportPopup"
        :parent-id="queueId"
        :filters="currentFilters()"
        @close="isExportPopup = false"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title typo-heading-3">
            {{ t('objects.ccenter.members.allMembers') }}
          </h3>
          <div class="table-title__actions-wrap">
            <wt-action-bar
              :include="[IconAction.REFRESH, IconAction.FILTERS, IconAction.COLUMNS, IconAction.RESET_MEMBERS, IconAction.DELETE]"
              @click:refresh="loadDataList"
              @click:filters="isFiltersPanelShown = !isFiltersPanelShown"
            >
              <template #filters="{ action, onClick }">
                <wt-badge :hidden="!hasPanelFilters">
                  <wt-icon-action
                    :action="action"
                    @click="onClick"
                  />
                </wt-badge>
              </template>

              <template #search-bar>
                <dynamic-filter-search
                  :filters-manager="filtersManager"
                  single-search-name="search"
                  @filter:add="addFilter"
                  @filter:delete="deleteFilter"
                  @filter:update="updateFilter"
                />
              </template>
              <template #columns>
                <wt-table-column-select
                  :headers="headers"
                  @change="updateShownHeaders"
                />
              </template>

              <template #reset-members>
                <wt-context-menu
                  :options="resetOptions"
                  @click="$event.option.method()"
                >
                  <template #activator="{ toggle }">
                    <wt-icon-btn
                      v-tooltip="t('objects.ccenter.members.resetMembers.resetMembers')"
                      :disabled="disableUserInput"
                      icon="reset-members"
                      @click="toggle"
                    />
                  </template>
                </wt-context-menu>
              </template>

              <template #delete>
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
              </template>
            </wt-action-bar>
          </div>
        </header>

        <div class="table-section__table-wrapper">
          <wt-loader v-show="isLoading" />

          <wt-table
            v-show="!isLoading"
            :data="dataList"
            :headers="shownHeaders"
            :selected="selected"
            fixed-actions
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
              <wt-display-chip-items
                :items="communicationValues(item.communications)"
              >
                <template #activator>
                  <div
                    v-if="item.communications?.length > 1"
                    class="the-queue-members__communications-counter"
                    tabindex="0"
                    @click="communicationsMemberId = item.id"
                    @keydown.enter="communicationsMemberId = item.id"
                  >
                    <wt-chip>+{{ item.communications.length - 1 }}</wt-chip>
                  </div>
                </template>
              </wt-display-chip-items>
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
            <template #bucket="{ item }">
              {{ item.bucket?.name }}
            </template>
            <template #expireAt="{ item }">
              {{ asDate(item.expireAt) }}
            </template>
            <template #timezone="{ item }">
              {{ item.timezone?.name }}
            </template>

            <template #column-filter="scope">
              <queue-members-column-filter v-bind="scope" />
            </template>

            <template #empty>
              <wt-empty
                :image="imageEmpty"
                :primary-action-text="emptyPrimaryActionText"
                :text="textEmpty"
                @click:primary="create"
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
            v-show="dataList.length"
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
import {
	DynamicFilterSearchComponent as DynamicFilterSearch,
	TableFiltersPanelComponent as TableFiltersPanel,
} from '@webitel/ui-datalist/filters';
import { WtDisplayChipItems } from '@webitel/ui-sdk/components';
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
import { useUserinfoStore } from '../../../../../../userinfo/stores/userinfoStore';
import dummyPicDark from '../assets/adm-dummy-members-dark.svg';
import dummyPicLight from '../assets/adm-dummy-members-light.svg';
import { useParentQueue } from '../composables/useParentQueue';
import { useResetConfirmationPopup } from '../composables/useResetConfirmationPopup';
import {
	type DateRange,
	defaultCreatedAtFilter,
	resolveDefaultCreatedAtFilter,
} from '../configs/defaultFilters';
import { filterConfigs, filtersOptions } from '../configs/filtersOptions';
import { useQueueMembersDatalistStore } from '../stores/datalist/queueMembersDatalistStore';
import { ActionOptions } from '../types/ActionOptions';
import CommunicationsPopup from './communications/queue-member-communications-popup.vue';
import ExportPopup from './export-members-popup.vue';
import QueueMembersColumnFilter from './queue-members-column-filter.vue';
import ResetPopup from './reset-members-popup.vue';
import UploadPopup from './upload-members-popup.vue';

const { t, te } = useI18n();
const userinfoStore = useUserinfoStore();
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

const {
	isVisible: isResetPopup,
	resetQuantity: resetMembersQuantity,
	resetCallback,
	resetScope,
	askResetConfirmation,
	closeReset,
} = useResetConfirmationPopup();

const isFiltersPanelShown = ref(false);
const isExportPopup = ref(false);
const csvFile = ref<File | null>(null);
const communicationsMemberId = ref<string | null>(null);
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

const communicationValues = (communications?: EngineMemberCommunication[]) =>
	(communications ?? []).map(({ destination }) => ({
		name: destination,
	}));

const asDate = (value?: number | string) =>
	formatDate(value, FormatDateMode.DATETIME);

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
		| Partial<DateRange>
		| undefined;
	const asShortDate = (value?: number) =>
		value ? formatDate(+value, FormatDateMode.DATETIME_SHORT) : undefined;

	return {
		from: asShortDate(createdAt?.from),
		to: asShortDate(createdAt?.to),
	};
});

const currentFilters = () => filtersManager.value.getAllValues();

let defaultCreatedAt = defaultCreatedAtFilter();

const resetFilters = () => {
	filtersManager.value.reset({
		exclude: [
			'search',
			defaultCreatedAt.name,
		],
	});
	filtersManager.value.updateFilter(defaultCreatedAt);
};

const hasPanelFilters = computed(() =>
	Object.keys(filterConfigs).some((name) => hasFilter(name)),
);

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

const openResetPopup = async (
	filters: Record<string, unknown>,
	scope: ActionOptions,
) => {
	const quantity = await QueueMembersAPI.getQuantity({
		parentId: queueId.value,
		filters,
	});
	askResetConfirmation({
		quantity,
		scope,
		callback: withReload(() =>
			QueueMembersAPI.resetMembers({
				parentId: queueId.value,
				filters,
			}),
		),
	});
};

const resetOptions = computed(() => [
	{
		text: t('iconHints.resetAll'),
		method: () => openResetPopup({}, ActionOptions.All),
	},
	{
		text: t('iconHints.resetFiltered'),
		method: () => openResetPopup(currentFilters(), ActionOptions.Filtered),
	},
	...(selected.value.length
		? [
				{
					text: t('iconHints.resetSelected', {
						count: selected.value.length,
					}),
					method: () =>
						openResetPopup(
							{
								ids: selected.value.map(({ id }) => id),
							},
							ActionOptions.Selected,
						),
				},
			]
		: []),
]);

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

const userChosenFilters = computed(() =>
	filtersManager.value.getAllValues({
		exclude: [
			defaultCreatedAt.name,
		],
	}),
);

const {
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

const emptyPrimaryActionText = computed(() =>
	disableUserInput.value ? '' : primaryActionTextEmpty.value,
);

/**
 * Seeded here rather than in the filters panel: that component only mounts
 * while the panel is open, and the default has to be in place for the very
 * first request. Applied again after `initialize` for the one case the restore
 * path clobbers it — a snapshot persisted before this default existed.
 */
const seedDefaultFilters = () => {
	if (!hasFilter(defaultCreatedAt.name)) addFilter(defaultCreatedAt);
};

// restoring persisted filters builds their configs, which reach for i18n
const instance = getCurrentInstance();
onMounted(() =>
	instance?.appContext.app.runWithContext(async () => {
		defaultCreatedAt = await resolveDefaultCreatedAtFilter();
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

.the-queue-members__communications-counter {
  cursor: pointer;
}

.upload-file-input {
  position: absolute;
  visibility: hidden;
  width: 100%;
}
</style>
