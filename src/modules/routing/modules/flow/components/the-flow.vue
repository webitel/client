<template>
  <wt-page-wrapper
    :actions-panel="isFiltersPanelShown"
    class="flow table-page"
  >
    <template #header>
      <wt-page-header
        :primary-disabled="!hasCreateAccess"
        :primary-action="() => (isCreateFlowPopup = true)"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #actions-panel>
      <flow-filters-panel />
    </template>

    <template #main>
      <create-flow-popup
        :shown="isCreateFlowPopup"
        size="sm"
        @close="isCreateFlowPopup = false"
      />
      <upload-flow-popup
        :file="jsonFile"
        @close="closeUploadPopup"
      />
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.routing.flow.allFlowSchemas') }}
          </h3>
          <wt-action-bar
            :include="[
              IconAction.REFRESH,
              IconAction.FILTERS,
              IconAction.DELETE,
            ]"
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
                @filter:update="updateFilter"
                @filter:delete="deleteFilter"
              />
            </template>
            <upload-file-icon-btn
              v-if="hasCreateAccess"
              accept=".json"
              class="icon-action"
              @change="processJSON"
            />
          </wt-action-bar>
        </header>

        <div class="table-section__table-wrapper">
          <wt-empty
            v-show="showEmpty"
            :image="imageEmpty"
            :text="textEmpty"
            :primary-action-text="primaryActionTextEmpty"
            :disabled-primary-action="!hasCreateAccess"
            @click:primary="isCreateFlowPopup = true"
          />

          <wt-loader v-show="isLoading" />

          <wt-table
            v-show="dataList.length && !isLoading"
            :data="dataList"
            :selected="selected"
            :headers="shownHeaders"
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
                :link="editLink(item)"
                target="_blank"
              >
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #editor="{ item }">
              {{
                item.editor
                  ? t('objects.routing.flow.diagram.diagram')
                  : t('objects.routing.flow.code.code')
              }}
            </template>
            <template #type="{ item }">
              {{ item.type ? t(`objects.flow.type.${item.type}`) : '' }}
            </template>
            <template #tags="{ item }">
              <div
                v-if="item.tags"
                class="flow__tags"
              >
                <wt-chip
                  v-for="(tag, key) of item.tags"
                  :key="key"
                >
                  {{ tag.name }}
                </wt-chip>
              </div>
            </template>
            <template #createdAt="{ item }">
              {{ formatDate(+item.createdAt, FormatDateMode.DATE) }}
            </template>
            <template #updatedAt="{ item }">
              {{ formatDate(+item.updatedAt, FormatDateMode.DATE) }}
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="download"
                @click="download(item)"
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

<script setup lang="ts">
import { FlowsAPI } from '@webitel/api-services/api';
import type { EngineRoutingSchema } from '@webitel/api-services/gen/models';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import { saveAsJSON } from '@webitel/ui-sdk/scripts';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { filtersOptions } from '../configs/filtersOptions';
import { FlowEditor } from '../enums/FlowEditor.enum';
import { useFlowDatalistStore } from '../stores';
import FlowFiltersPanel from './flow-filters-panel.vue';
import CreateFlowPopup from './shared/create-flow-popup.vue';
import UploadFlowPopup from './shared/upload-flow-popup.vue';

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const flowDatalistStore = useFlowDatalistStore();

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
} = storeToRefs(flowDatalistStore);

const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	columnResize,
	columnReorder,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
	updateSelected,
	hasFilter,
} = flowDatalistStore;

initialize();

const isFiltersPanelShown = ref(false);

const hasPanelFilters = computed(() =>
	filtersOptions.some((filter) =>
		hasFilter(typeof filter === 'string' ? filter : filter.name),
	),
);

const { t } = useI18n();
const router = useRouter();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const path = computed(() => [
	{
		name: t('objects.routing.routing'),
	},
	{
		name: t('objects.routing.flow.flow', 2),
		route: '/routing/flow',
	},
]);

const isCreateFlowPopup = ref(false);

const editLink = ({ id, editor }: EngineRoutingSchema) => ({
	name: `${RouteNames.FLOW}-card`,
	params: {
		id,
	},
	query: {
		editor: editor ? FlowEditor.Diagram : FlowEditor.Code,
	},
});

/** [Claude] a diagram opens the external editor, so it gets a tab of its own */
const edit = (item: EngineRoutingSchema) => {
	const link = editLink(item);
	if (item.editor) window.open(router.resolve(link).href, '_blank');
	else router.push(link);
};

const download = async ({ id, name }: EngineRoutingSchema) => {
	const flow = await FlowsAPI.get({
		itemId: id,
	});
	saveAsJSON(`${name}-schema`, flow);
};

const jsonFile = ref<File | null>(null);
const processJSON = (files: File[]) => {
	const [file] = files;
	if (file) jsonFile.value = file;
};
const closeUploadPopup = () => {
	jsonFile.value = null;
	loadDataList();
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

<style scoped>
.flow__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}
</style>
