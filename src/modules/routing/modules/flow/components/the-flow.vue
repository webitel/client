<template>
  <wt-page-wrapper>
    <template v-slot:header>
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
    </template>

    <template v-slot:actions-panel>
      <the-flow-filters
        :namespace="filtersNamespace"
      ></the-flow-filters>
    </template>

    <template v-slot:main>
      <create-flow-popup
        v-if="isCreateFlowPopup"
        @close="isCreateFlowPopup = false"
      ></create-flow-popup>
      <upload-popup
        v-if="isUploadPopup"
        :file="jsonFile"
        @close="closeUploadPopup"
      ></upload-popup>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.routing.flow.allFlowSchemas') }}</h3>
          <div class="content-header__actions-wrap">
            <filter-search
              :namespace="filtersNamespace"
            ></filter-search>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="callDelete(selectedRows)"
              ></delete-all-action>
              <upload-file-icon-btn
                v-if="hasCreateAccess"
                class="icon-action"
                accept=".json"
                @change="processJSON"
              ></upload-file-icon-btn>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              <item-link :link="editLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template slot="editor" slot-scope="{ item }">
              <div v-if="item.editor">
                {{ $t('objects.routing.flow.diagram.diagram') }}
              </div>
              <div v-else>
                {{ $t('objects.routing.flow.code.code') }}
              </div>
            </template>
            <template v-slot:type="{ item }">
              {{ item.type ? $t(`objects.flow.type.${item.type}`) : '' }}
            </template>
            <template v-slot:tags="{ item }">
              <div class="the-flow__tags" v-if="item.tags">
                <wt-chip
                  v-for="(tag, key) of item.tags"
                  :key="key"
                >{{ tag.name }}
                </wt-chip>
              </div>
            </template>
            <template slot="actions" slot-scope="{ item }">
            <download-action
              @click="download(item)"
            ></download-action>
            <edit-action
              v-if="hasEditAccess"
              @click="edit(item)"
            ></edit-action>
            <delete-action
              v-if="hasDeleteAccess"
              @click="callDelete(item)"
            ></delete-action>
          </template>
          </wt-table>
          <wt-pagination
            :size="size"
            :next="isNext"
            :prev="page > 1"
            debounce
            @next="nextPage"
            @prev="prevPage"
            @input="setSize"
            @change="loadList"
          ></wt-pagination>
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import FilterSearch from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-search.vue';
import DownloadAction from '../../../../../app/components/actions/download-action.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import CreateFlowPopup from './create-flow-popup.vue';
import UploadPopup from './upload-flow-popup.vue';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import FlowsAPI from '../api/flow';
import { downloadAsJSON } from '../../../../../app/utils/download';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import FlowEditor from '../enums/FlowEditor.enum';
import TheFlowFilters from '../modules/filters/components/the-flow-filters.vue';

export default {
  name: 'the-flow',
  mixins: [tableComponentMixin],
  components: {
    DownloadAction,
    CreateFlowPopup,
    UploadPopup,
    UploadFileIconBtn,
    TheFlowFilters,
    FilterSearch,
  },
  data: () => ({
    namespace: 'routing/flow',
    routeName: RouteNames.FLOW,
    isUploadPopup: false,
    jsonFile: null,
    isCreateFlowPopup: false,
  }),

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
      const flow = await FlowsAPI.get({ itemId: id });
      const filename = `${name}-schema`;
      downloadAsJSON(flow, filename);
    },
    /**
     @overrides itemLinkMixin.js
     */
    editLink({ id, editor }) {
      const routeName = this.routeName || this.tableObjectRouteName;
      return {
        name: `${routeName}-edit`,
        params: { id },
        query: {
          editor: editor ? FlowEditor.DIAGRAM : FlowEditor.CODE,
        },
      };
    },
  },
  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.the-flow__tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}
</style>
