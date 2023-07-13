<template>
  <section class="content-wrapper">
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.queues.logs.logs', 1) }}</h3>
      <div class="content-header__actions-wrap">
        <filter-search
          :namespace="filtersNamespace"
        ></filter-search>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper"
    ></wt-dummy>
    <div
      v-show="dataList.length && isLoaded"
      class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="false"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template v-slot:destination="{ item }">
          <div v-if="item.destination">
            {{ item.destination.destination }}
          </div>
        </template>
        <template v-slot:agent="{ item }">
          <div v-if="item.agent">
            {{ item.agent.name }}
          </div>
        </template>
        <template v-slot:joinedAt="{ item }">
          {{ formatDate(item.joinedAt) }}
        </template>
        <template v-slot:leavingAt="{ item }">
          {{ formatDate(item.leavingAt) }}
        </template>
        <template v-slot:offeringAt="{ item }">
          {{ formatDate(item.offeringAt) }}
        </template>
        <template v-slot:duration="{ item }">
          {{ calcDuration(item) }}
        </template>
        <template v-slot:viewNumber="{ item }">
          <div v-if="item.destination">
            {{ item.destination.description }}
          </div>
        </template>
        <template v-slot:attempts="{ item }">
          {{ item.attempts || 0 }}
        </template>
        <template v-slot:result="{ item }">
          {{ item.result }}
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
import FilterSearch from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-search.vue';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'ccenter/queues';
const subNamespace = 'log';

export default {
  name: 'opened-queue-logs',
  mixins: [openedObjectTableTabMixin],
  components: { FilterSearch },
  data: () => ({
    namespace,
    subNamespace,
  }),
  setup() {
    const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
    return { dummy };
  },
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
      return convertDuration((item.leavingAt - item.joinedAt) / 1000);
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
