<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.integrations.triggers.logs.logs') }}
      </h3>
    </header>

    <wt-loader v-show="!isLoaded" />
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
        <template #startedAt="{ item }">
          {{ prettifyDate(item.startedAt) }}
        </template>
        <template #duration="{ item }">
          {{ calcDuration(item) }}
        </template>
        <template #state="{ item }">
          {{
            $t(`objects.integrations.triggers.logs.resultName.${item.state}`)
          }}
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
import { formatDate } from '@webitel/ui-sdk/utils';

import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import convertDurationWithMilliseconds from '../scripts/convertDurationWithMilliseconds';

export default {
  name: 'OpenedTriggerLogs',
  mixins: [openedObjectTableTabMixin],
  data: () => ({
    subNamespace: 'log',
  }),
  computed: {
    filtersNamespace() {
      return `${this.namespace}/${this.subNamespace}/filters`;
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
    prettifyDate(value) {
      if (!value) return '';
      return formatDate(+value, 'datetime');
    },

    calcDuration(item) {
      return convertDurationWithMilliseconds(item.stoppedAt - item.startedAt);
    },
  },
};
</script>

<style lang="scss" scoped></style>
