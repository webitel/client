<template>
  <wt-popup overflow @close="close">
    <template slot="title">{{ $t('objects.ccenter.agents.statusHistory') }}</template>
    <template slot="main">
      <section class="history-popup">
        <div class="history-popup__filters">
          <wt-datetimepicker
            :label="$t('objects.from')"
            :value="from"
            @change="setFrom"
          ></wt-datetimepicker>
          <wt-datetimepicker
            :label="$t('objects.to')"
            :value="to"
            @change="setTo"
          ></wt-datetimepicker>
        </div>
        <div class="table-wrapper">
          <wt-table
            :data="dataList"
            :grid-actions="false"
            :headers="headers"
            :selectable="false"
          >
            <template slot="state" slot-scope="{ item }">
              {{ $t(`${agentStateLocales[item.state]}`) }}
            </template>
            <template slot="channel" slot-scope="{ item }">
              {{ item.channel }}
            </template>
            <template slot="from" slot-scope="{ item }">
              {{ prettifyTime(item.joinedAt) }}
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
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import historyPopupMixin from '../../../../../app/mixins/objectPagesMixins/historyPopupMixin/historyPopupMixin';
import agentStateLocales from '../_internals/agentStateLocales.lookup';

export default {
  name: 'agent-history-popup',
  mixins: [historyPopupMixin],
  data: () => ({
    namespace: 'ccenter/agents/history',
    agentStateLocales,
  }),

  computed: {
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
    convertDuration,
    calcStatusTo(item) {
      return new Date(+item.joinedAt + item.duration * 1000).toLocaleString();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
