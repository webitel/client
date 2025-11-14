<template>
  <section class="content-wrapper">
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.system.changelogs.logs.logs', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-icon-action
          action="download"
          @click="exportCSV({ parentId })"
        />
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        />
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :dark-mode="darkMode"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
        ></wt-dummy>
    <div
      v-show="dataList.length && isLoaded"
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
        <template #action="{ item }">
          {{ $t(`objects.system.changelogs.logs.actionType.${item.action}`) }}
        </template>
        <template #date="{ item }">
          {{ formatDate(+item.date, 'datetime') }}
        </template>
        <template #user="{ item }">
          <adm-item-link
            v-if="item.user"
            :id="item.user.id"
            :route-name="usersRouteName"
          >
            {{ item.user.name }}
          </adm-item-link>
        </template>
        <template #userId="{ item }">
          <adm-item-link
            v-if="item.user"
            :id="item.user.id"
            :route-name="usersRouteName"
          >
            {{ item.user.id }}
          </adm-item-link>
        </template>
        <template #object="{ item }">
          {{ item.object.name }}
        </template>
        <template #record="{ item }">
          <record-link
            :item="item"
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

<script>
import ExportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import { formatDate } from '@webitel/ui-sdk/src/modules/Userinfo/v2/scripts/formatDate';

import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import LogsAPI from '../api/logs';
import RecordLink from './changelog-logs-record-link.vue';

const namespace = 'system/changelogs';
const subNamespace = 'logs';

export default {
  name: 'OpenedChangelogLogs',
  components: { RecordLink },
  mixins: [openedObjectTableTabMixin, ExportCSVMixin],

  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy };
  },
  data: () => ({
    namespace,
    subNamespace,
    usersRouteName: RouteNames.USERS,
  }),
  computed: {
    getFilters() {
      return this.$store.getters[`${namespace}/${subNamespace}/filters/GET_FILTERS`];
    },
  },
  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
      },
    },
  },
  created() {
    this.initCSVExport(this.getDataForCSVExport, {
      filename: `${this.itemInstance.object.name}-logs-at-${formatDate(Date.now(), 'datetime')}`,
    });
  },
  methods: {
    async getDataForCSVExport(params) {
      const filters = this.getFilters;
      const { items, next } = await LogsAPI.getList({
        ...filters,
        ...params,
        parentId: this.parentId,
      });

      const transformedItems = items.map((item) => ({
        ...item,
        date: formatDate(+item.date, 'datetime'),
      }));

      return {
        items: transformedItems,
        next,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
