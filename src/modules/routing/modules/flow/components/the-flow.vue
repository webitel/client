<template>
  <wt-page-wrapper class="table-page">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #actions-panel>
      <the-flow-filters :namespace="filtersNamespace" />
    </template>

    <template #main>
      <create-flow-popup
        :shown="isCreateFlowPopup"
        size="sm"
        @close="isCreateFlowPopup = false"
      />
      <upload-popup
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
            {{ $t('objects.routing.flow.allFlowSchemas') }}
          </h3>
          <div class="table-title__actions-wrap">
            <filter-search :namespace="filtersNamespace" />
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{ 'hidden': anySelected }"
                :selected-count="selectedRows.length"
                @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })"
              />
              <upload-file-icon-btn
                v-if="hasCreateAccess"
                accept=".json"
                class="icon-action"
                @change="processJSON"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :dark-mode="darkMode"
          :text="dummy.text && $t(dummy.text)"
          :show-action="dummy.showAction"
          class="dummy-wrapper"
          @create="create"
        ></wt-dummy>

        <div
          v-show="dataList.length && isLoaded"
          class="table-section__table-wrapper"
        >
          <wt-table
            :data="dataList"
            :headers="headers"
            sortable
            @sort="sort"
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
              <div v-if="item.editor">
                {{ $t('objects.routing.flow.diagram.diagram') }}
              </div>
              <div v-else>
                {{ $t('objects.routing.flow.code.code') }}
              </div>
            </template>
            <template #type="{ item }">
              {{ item.type ? $t(`objects.flow.type.${item.type}`) : '' }}
            </template>
            <template #tags="{ item }">
              <div
                v-if="item.tags"
                class="the-flow__tags"
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
                action="edit"
                :disabled="!hasUpdateAccess"
                @click="edit(item, {
                  blank: item.editor
                })"
              />
              <wt-icon-action
                action="delete"
                :disabled="!hasDeleteAccess"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
              />
            </template>
          </wt-table>
          <wt-pagination
            :next="isNext"
            :prev="page > 1"
            :size="size"
            debounce
            @change="loadList"
            @input="setSize"
            @next="nextPage"
            @prev="prevPage"
          />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import FilterSearch from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-search.vue';
import { formatDate } from '@webitel/ui-sdk/utils';

import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useDummy } from '../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { downloadAsJSON } from '../../../../../app/utils/download';
import FlowsAPI from '../api/flow';
import FlowEditor from '../enums/FlowEditor.enum';
import TheFlowFilters from '../modules/filters/components/the-flow-filters.vue';
import CreateFlowPopup from './create-flow-popup.vue';
import UploadPopup from './upload-flow-popup.vue';

const namespace = 'routing/flow';

export default {
	name: 'TheFlow',
	components: {
		CreateFlowPopup,
		UploadPopup,
		UploadFileIconBtn,
		TheFlowFilters,
		FilterSearch,
		DeleteConfirmationPopup,
	},
	mixins: [
		tableComponentMixin,
	],

	setup() {
		const {
			isVisible: isDeleteConfirmationPopup,
			deleteCount,
			deleteCallback,
			askDeleteConfirmation,
			closeDelete,
		} = useDeleteConfirmationPopup();
		const { dummy } = useDummy({
			namespace,
			showAction: true,
		});
		const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
			useUserAccessControl();

		return {
			isDeleteConfirmationPopup,
			deleteCount,
			deleteCallback,
			askDeleteConfirmation,
			closeDelete,
			dummy,
			hasCreateAccess,
			hasUpdateAccess,
			hasDeleteAccess,
		};
	},

	data: () => ({
		namespace,
		routeName: RouteNames.FLOW,
		jsonFile: null,
		isCreateFlowPopup: false,
	}),

	computed: {
		FormatDateMode() {
			return FormatDateMode;
		},
		path() {
			return [
				{
					name: this.$t('objects.routing.routing'),
				},
				{
					name: this.$t('objects.routing.flow.flow', 2),
					route: '/routing/flow',
				},
			];
		},
		filtersNamespace() {
			return `${this.namespace}/filters`;
		},
	},
	watch: {
		'$route.query': {
			async handler() {
				await this.loadList();
			},
		},
	},
	methods: {
		formatDate,
		create() {
			this.isCreateFlowPopup = true;
		},
		processJSON(files) {
			const file = files[0];
			if (file) {
				this.jsonFile = file;
			}
		},
		closeUploadPopup() {
			this.jsonFile = null;
			this.loadList();
		},
		async download({ id, name }) {
			const flow = await FlowsAPI.get({
				itemId: id,
			});
			const filename = `${name}-schema`;
			downloadAsJSON(flow, filename);
		},
		editLink({ id, editor }) {
			const routeName = this.routeName || this.tableObjectRouteName;
			return {
				name: `${routeName}-card`,
				params: {
					id,
				},
				query: {
					editor: editor ? FlowEditor.DIAGRAM : FlowEditor.CODE,
				},
			};
		},
	},
};
</script>

<style
  lang="scss"
  scoped
>
.the-flow__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}
</style>
