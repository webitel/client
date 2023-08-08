<template>
  <wt-page-wrapper>
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
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
<!--        <wt-dummy-->
<!--          v-if="dummy && isLoaded"-->
<!--          :src="dummy.src"-->
<!--          :text="dummy.text && $t(dummy.text)"-->
<!--          :show-action="dummy.showAction"-->
<!--          @create="create"-->
<!--          class="dummy-wrapper"-->
<!--        ></wt-dummy>-->
        <div
          v-show="isLoaded"
          class="table-wrapper">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template v-slot:editor="{ item }">
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


            <template v-slot:createdAt="{ item }">
              {{ new Date(+item.createdAt).toLocaleDateString()}}
            </template>

            <template v-slot:updatedAt="{ item }">
              {{ new Date(+item.updatedAt).toLocaleDateString()}}
            </template>

            <template v-slot:actions="{ item }">
            <wt-icon-action
              action="download"
              @click="download(item)"
            ></wt-icon-action>
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              ></wt-icon-action>
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
                @click="callDelete(item)"
              ></wt-icon-action>
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
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import CreateFlowPopup from './create-flow-popup.vue';
import UploadPopup from './upload-flow-popup.vue';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import FlowsAPI from '../api/flow';
import { downloadAsJSON } from '../../../../../app/utils/download';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import FlowEditor from '../enums/FlowEditor.enum';
import TheFlowFilters from '../modules/filters/components/the-flow-filters.vue';
import { useDummy } from '../../../../../app/composables/useDummy';

const namespace = 'routing/flow';

export default {
  name: 'the-flow',
  mixins: [tableComponentMixin],
  components: {
    CreateFlowPopup,
    UploadPopup,
    UploadFileIconBtn,
    TheFlowFilters,
    FilterSearch,
  },
  data: () => ({
    namespace,
    routeName: RouteNames.FLOW,
    isUploadPopup: false,
    jsonFile: null,
    isCreateFlowPopup: false,
  }),

  /* https://my.webitel.com/browse/WTEL-3697 */
  /* Temporarily disabled functionality due to problems with pagination */

  // setup() {
  //   const { dummy } = useDummy({ namespace, showAction: true });
  //   return { dummy };
  // },

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
