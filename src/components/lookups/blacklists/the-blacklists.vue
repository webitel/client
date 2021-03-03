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
            <wt-icon-btn
              v-if="hasDeleteAccess"
              class="icon-action"
              :class="{'hidden': anySelected}"
              icon="bucket"
              :tooltip="$t('iconHints.deleteSelected')"
              @click="deleteSelected"
            ></wt-icon-btn>
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
          >
            <template slot="name" slot-scope="{ item }">
              <item-link :link="itemLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template slot="numbers" slot-scope="{ item }">
              {{ item.count }}
            </template>
            <template slot="actions" slot-scope="{ item, index }">
              <wt-icon-btn
                class="table-action"
                icon="download"
                :tooltip="$t('iconHints.download')"
                tooltip-position="left"
                @click="download(index)"
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
import exportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import tableComponentMixin from '../../../mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import { downloadAsCSV } from '../../../utils/download';
import { getBlacklistCommunicationList } from '../../../api/lookups/blacklists/blacklistNumbers';
import RouteNames from '../../../router/_internals/RouteNames.enum';

export default {
  name: 'the-blacklists',
  mixins: [exportCSVMixin, tableComponentMixin],
  data: () => ({
    namespace: 'lookups/blacklists',
    routeName: RouteNames.BLACKLIST,
  }),

  created() {
    this.initCSVExport(getBlacklistCommunicationList, { filename: 'numbers' });
  },

  computed: {
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'numbers', text: this.$t('objects.lookups.blacklist.numbersCount') },
      ];
    },
    path() {
      return [
        { name: this.$t('objects.lookups.lookups') },
        { name: this.$tc('objects.lookups.blacklist.blacklist', 2), route: '/lookups/blacklist' },
      ];
    },
  },

  methods: {
    async download(rowId) {
      const list = this.dataList[rowId];
      // this.exportCSV({ parentId: list.id });
      const listNumbers = await getBlacklistCommunicationList({ parentId: list.id, size: 5000 });

      let dataStr = 'data:text/csv;charset=utf-8,';
      dataStr += 'number,description\n';
      listNumbers.list.forEach((item) => {
        dataStr += encodeURIComponent(
          `${item.number},${item.description}\n`,
        );
      });
      downloadAsCSV(dataStr, `${list.name}-numbers.csv`);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
