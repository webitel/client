<template>
  <section class="content-wrapper">
    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.ccenter.queues.logs.logs', 1) }}
      </h3>
      <div class="content-header__actions-wrap">
        <filter-search
          :namespace="filtersNamespace"
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
        <template #destination="{ item }">
          <div v-if="item.destination">
            {{ item.destination.destination }}
          </div>
        </template>
        <template #agent="{ item }">
          <div v-if="item.agent">
            {{ item.agent.name }}
          </div>
        </template>
        <template #joinedAt="{ item }">
          {{ formatDate(item.joinedAt) }}
        </template>
        <template #leavingAt="{ item }">
          {{ formatDate(item.leavingAt) }}
        </template>
        <template #offeringAt="{ item }">
          {{ formatDate(item.offeringAt) }}
        </template>
        <template #duration="{ item }">
          {{ calcDuration(item) }}
        </template>
        <template #viewNumber="{ item }">
          <div v-if="item.destination">
            {{ item.destination.description }}
          </div>
        </template>
        <template #attempts="{ item }">
          {{ item.attempts || 0 }}
        </template>
        <template #result="{ item }">
          {{$t(`objects.ccenter.queues.logs.resultName.${item.result}`)}}
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
import FilterSearch from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-search.vue';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { formatDate } from '@webitel/ui-sdk/utils';

import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

const namespace = 'ccenter/queues';
const subNamespace = 'log';

export default {
  name: 'OpenedQueueLogs',
  components: { FilterSearch },
  mixins: [openedObjectTableTabMixin],

  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy };
  },
  data: () => ({
    namespace,
    subNamespace,
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
    formatDate(value) {
      if (!value) return '';
      return formatDate(+value, 'datetime');
    },

    calcDuration(item) {
      return convertDuration((item.leavingAt - item.joinedAt) / 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
