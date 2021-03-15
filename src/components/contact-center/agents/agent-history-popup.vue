<template>
  <wt-popup @close="close" overflow>
    <template slot="title">{{ $t('objects.ccenter.agents.statusHistory') }}</template>
    <template slot="main">
      <section class="history-popup">
        <div class="history-popup__filters">
          <wt-datetimepicker
            :value="from"
            :label="$t('objects.from')"
            @change="setHistoryFrom"
          ></wt-datetimepicker>
          <wt-datetimepicker
            :value="to"
            :label="$t('objects.to')"
            @change="setHistoryTo"
          ></wt-datetimepicker>
        </div>
        <div class="table-wrapper">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="false"
            :selectable="false"
          >
            <template slot="state" slot-scope="{ item }">
              {{ item.state }}
            </template>
            <template slot="channel" slot-scope="{ item }">
              {{ item.channel }}
            </template>
            <template slot="from" slot-scope="{ item }">
              {{ computeTime(item.joinedAt) }}
            </template>
            <template slot="to" slot-scope="{ item }">
              <div v-if="item.duration">
                {{ calcStatusTo(item) }}
              </div>
            </template>
            <template slot="duration" slot-scope="{ item }">
              {{ convertDuration(item.duration) }}
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
    <template slot="actions">
      <wt-button @click="close">{{ $t('objects.ok') }}</wt-button>
      <wt-button color="secondary" @click="close"> {{ $t('objects.close') }}</wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import tableComponentMixin from '../../../mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';

export default {
  name: 'agent-history-popup',
  mixins: [tableComponentMixin],
  data() {
    return {};
  },

  computed: {
    ...mapState('ccenter/agents/history', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      from: (state) => state.from,
      to: (state) => state.to,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'state', text: this.$t('objects.ccenter.agents.historyState') },
        { value: 'channel', text: this.$t('objects.ccenter.agents.historyChannel') },
        { value: 'from', text: this.$t('objects.ccenter.agents.historyFrom') },
        { value: 'to', text: this.$t('objects.ccenter.agents.historyTo') },
        { value: 'duration', text: this.$t('objects.ccenter.agents.historyDuration') },
      ];
    },
  },

  methods: {
    ...mapActions('ccenter/agents/history', {
      loadDataList: 'LOAD_HISTORY_DATA_LIST',
      setSize: 'SET_HISTORY_SIZE',
      setSearch: 'SET_HISTORY_SEARCH',
      setHistoryFrom: 'SET_HISTORY_FROM',
      setHistoryTo: 'SET_HISTORY_TO',
      nextPage: 'NEXT_HISTORY_PAGE',
      prevPage: 'PREV_HISTORY_PAGE',
    }),
    convertDuration,
    computeTime(time) {
      return new Date(+time).toLocaleString();
    },
    calcStatusTo(item) {
      return new Date(+item.joinedAt + item.duration * 1000).toLocaleString();
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
