<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.integrations.triggers.logs.logs')}}</h3>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="false"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template slot="startedAt" slot-scope="{ item }">
          {{ formatDate(item.startedAt) }}
        </template>
        <template slot="duration" slot-scope="{ item }">
          {{ calcDuration(item) }}
        </template>
        <template slot="state" slot-scope="{ item }">
          {{ $t(`objects.integrations.triggers.logs.resultName.${item.state}`) }}
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
import convertDurationWithMilliseconds from '../scripts/convertDurationWithMilliseconds';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-trigger-logs',
  mixins: [openedObjectTableTabMixin],
  data: () => ({
    subNamespace: 'log',
  }),
  computed: {
    filtersNamespace() {
      return `${this.namespace}/${this.subNamespace}/filters`;
    },
  },
  methods: {
    formatDate(value) {
      if (!value) return '';
      return new Date(+value).toLocaleString();
    },

    calcDuration(item) {
      return convertDurationWithMilliseconds((item.stoppedAt - item.startedAt) / 1000);
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
</style>
