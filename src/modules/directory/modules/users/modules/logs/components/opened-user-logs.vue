<template>
  <section class="content-wrapper">
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.system.changelogs.logs.logs', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-icon-action
          action="download"
          @click="exportCSV({ parentId })"
        ></wt-icon-action>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <!--    <wt-dummy-->
    <!--      v-if="dummy && isLoaded"-->
    <!--      :src="dummy.src"-->
    <!--      :text="dummy.text && $t(dummy.text)"-->
    <!--      class="dummy-wrapper"-->
    <!--    ></wt-dummy>-->
    <div
      v-show="isLoaded"
      class="table-wrapper"
    >
      <wt-table
        :data="dataList"
        :grid-actions="false"
        :headers="headers"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template v-slot:action="{ item }">
          {{ $t(`objects.system.changelogs.logs.actionType.${item.action}`) }}
        </template>
        <template v-slot:date="{ item }">
          {{ new Date(+item.date).toLocaleString() }}
        </template>
        <template v-slot:object="{ item }">
          <wt-item-link
            v-if="item.object"
            :id="item.configId"
            :route-name="changelogsRouteName"
          >{{ item.object.name }}
          </wt-item-link>
        </template>
        <template v-slot:record="{ item }">
          <record-link
            :item="item"
          ></record-link>
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
      ></wt-pagination>
    </div>
  </section>
</template>

<script>
import ExportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import RecordLink
  from '../../../../../../system/modules/changelogs/modules/logs/components/changelog-logs-record-link.vue';
import LogsAPI from '../api/logs';
// import { useDummy } from '.  ./../../../../../../app/composables/useDummy';

const namespace = 'directory/users';
const subNamespace = 'logs';

export default {
  name: 'opened-users-logs',
  mixins: [openedObjectTableTabMixin, ExportCSVMixin],
  components: { RecordLink },
  data: () => ({
    namespace,
    subNamespace,
    changelogsRouteName: RouteNames.CHANGELOGS,
  }),

  /* https://my.webitel.com/browse/WTEL-3697 */
  /* Temporarily disabled functionality due to problems with pagination */

  // setup() {
  //   const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
  //   return { dummy };
  // },
  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
      },
    },
  },
  created() {
    this.initCSVExport(LogsAPI.getList, {
      filename: `${this.itemInstance.name}-logs-at-${new Date().toLocaleString()}`,
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
