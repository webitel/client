<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
    </template>

    <template v-slot:main>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.lookups.blacklist.allBlacklists') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @input="setSearch"
              @search="loadList"
              @enter="loadList"
            ></wt-search-bar>
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
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :text="$t(dummy.text)"
          :show-action="dummy.showAction"
          @create="create"
          class="dummy-wrapper"
        ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
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
            <template v-slot:numbers="{ item }">
              {{ item.count }}
            </template>
            <template v-slot:actions="{ item }">
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
import exportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import DownloadAction from '../../../../../app/components/actions/download-action';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import BlacklistNumbersAPI from '../modules/numbers/api/blacklistNumbers';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useDummy } from '../../../../../app/composables/useDummy';
import dummyPic from '../assets/adm-dummy-blacklist.svg';

const namespace = 'lookups/blacklists';

export default {
  name: 'the-blacklists',
  components: { DownloadAction },
  mixins: [exportCSVMixin, tableComponentMixin],
  data: () => ({
    namespace,
    routeName: RouteNames.BLACKLIST,
  }),

  setup() {
    const { dummy } = useDummy({ namespace, showAction: true, dummyPic });
    return { dummy };
  },

  computed: {
    path() {
      return [
        { name: this.$t('objects.lookups.lookups') },
        { name: this.$tc('objects.lookups.blacklist.blacklist', 2), route: '/lookups/blacklist' },
      ];
    },
  },

  methods: {
    async download({ id }) {
      return this.exportCSV({ parentId: id, fields: ['number', 'description'] });
    },
    getBlacklistNumbersList: BlacklistNumbersAPI.getList,
  },

  created() {
    this.initCSVExport(this.getBlacklistNumbersList, { filename: 'numbers' });
  },
};
</script>

<style lang="scss" scoped>

</style>
