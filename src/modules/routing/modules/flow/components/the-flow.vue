<template>
  <wt-page-wrapper>
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #actions-panel>
      <the-flow-filters
        :namespace="filtersNamespace"
      />
    </template>

    <template #main>
      <create-flow-popup
        v-if="isCreateFlowPopup"
        @close="isCreateFlowPopup = false"
      />
      <upload-popup
        v-if="isUploadPopup"
        :file="jsonFile"
        @close="closeUploadPopup"
      />
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.routing.flow.allFlowSchemas') }}
          </h3>
          <div class="content-header__actions-wrap">
            <filter-search
              :namespace="filtersNamespace"
            />
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
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
          @create="create"
          class="dummy-wrapper"
        ></wt-dummy>

        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="hasTableActions"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              <wt-item-link :link="editLink(item)">
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
              {{ new Date(+item.createdAt).toLocaleDateString() }}
            </template>

            <template #updatedAt="{ item }">
              {{ new Date(+item.updatedAt).toLocaleDateString() }}
            </template>

            <template #actions="{ item }">
              <wt-icon-action
                action="download"
                @click="download(item)"
              />
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
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
import FilterSearch from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-search.vue';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { downloadAsJSON } from '../../../../../app/utils/download';
import FlowsAPI from '../api/flow';
import FlowEditor from '../enums/FlowEditor.enum';
import TheFlowFilters from '../modules/filters/components/the-flow-filters.vue';
import CreateFlowPopup from './create-flow-popup.vue';
import UploadPopup from './upload-flow-popup.vue';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useDummy } from '../../../../../app/composables/useDummy';

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
  mixins: [tableComponentMixin],

  data: () => ({
    namespace,
    routeName: RouteNames.FLOW,
    isUploadPopup: false,
    jsonFile: null,
    isCreateFlowPopup: false,
  }),

  setup() {
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,
      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();
    const { dummy } = useDummy({ namespace, showAction: true });

    return {
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,
      askDeleteConfirmation,
      closeDelete,
      dummy,
    };
  },

  computed: {
    path() {
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$tc('objects.routing.flow.flow', 2), route: '/routing/flow' },
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
    create() {
      this.isCreateFlowPopup = true;
    },
    processJSON(files) {
      const file = files[0];
      if (file) {
        this.jsonFile = file;
        this.openUploadPopup();
      }
    },
    openUploadPopup() {
      this.isUploadPopup = true;
    },
    closeUploadPopup() {
      this.loadList();
      this.isUploadPopup = false;
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
        name: `${routeName}-edit`,
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

<style lang="scss" scoped>
  .the-flow__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }
</style>
