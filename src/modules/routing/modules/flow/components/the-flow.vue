<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>

    <template slot="main">
      <upload-popup
        v-if="isUploadPopup"
        :file="jsonFile"
        @close="closeUploadPopup"
      ></upload-popup>
      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.routing.flow.allFlowSchemas') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @input="setSearch"
              @search="loadList"
              @enter="loadList"
            ></wt-search-bar>
            <wt-icon-btn
              v-if="hasDeleteAccess"
              class="icon-action"
              :class="{'hidden': anySelected}"
              icon="bucket"
              :tooltip="$t('iconHints.deleteSelected')"
              @click="deleteSelected"
            ></wt-icon-btn>
            <upload-file-icon-btn
              v-if="hasCreateAccess"
              class="icon-action"
              accept=".json"
              @change="processJSON"
            ></upload-file-icon-btn>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            ></wt-table-actions>
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
              <item-link :link="itemLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template slot="actions" slot-scope="{ item, index }">
            <wt-icon-btn
              class="table-action"
              icon="download"
              :tooltip="$t('iconHints.download')"
              tooltip-position="left"
              @click="download(item)"
            ></wt-icon-btn>
            <edit-action
              v-if="hasEditAccess"
              @click="edit(item)"
            ></edit-action>
            <delete-action
              v-if="hasDeleteAccess"
              @click="remove(index)"
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
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import UploadPopup from './upload-flow-popup.vue';
import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-ucon-btn.vue';
import { getFlow } from './flow';
import { downloadAsJSON } from '../../../../../app/utils/download';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'the-flow',
  mixins: [tableComponentMixin],
  components: { UploadPopup, UploadFileIconBtn },
  data: () => ({
    namespace: 'routing/flow',
    routeName: RouteNames.FLOW,
    isUploadPopup: false,
    jsonFile: null,
  }),

  computed: {
    path() {
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$tc('objects.routing.flow.flow', 2), route: '/routing/flow' },
      ];
    },
  },

  methods: {
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
      const flow = await getFlow({ id });
      const filename = `${name}-schema`;
      downloadAsJSON(flow, filename);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
