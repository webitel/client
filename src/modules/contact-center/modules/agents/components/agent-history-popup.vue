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
              {{ agentStateLocales(item) }}
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
import { AgentStatus, ChannelState, ChannelType } from 'webitel-sdk';
import historyPopupMixin from '../../../../../app/mixins/objectPagesMixins/historyPopupMixin/historyPopupMixin';

export default {
  name: 'agent-history-popup',
  mixins: [historyPopupMixin],
  data: () => ({
    namespace: 'ccenter/agents/history',
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
    agentStateLocales(item) {
      if (item.state === AgentStatus.Online) return this.$t('objects.agent.status.online');
      if (item.state === AgentStatus.Offline) return this.$t('objects.agent.status.offline');
      if (item.state === AgentStatus.Pause) return this.$t('objects.agent.status.pause');
      if (item.state === AgentStatus.BreakOut) return this.$t('objects.agent.status.breakOut');

      if (item.state === ChannelState.Waiting) return this.$t('channel.state.waiting');
      if (item.state === ChannelState.Distribute) return this.$t('channel.state.distribute');
      if (item.state === ChannelState.Offering) return this.$t('channel.state.offering');
      if (item.state === ChannelState.Answered) return this.$t('channel.state.answered');
      if (item.state === ChannelState.Active) return this.$t('channel.state.active');
      if (item.state === ChannelState.Hold) return this.$t('channel.state.bridged');
      if (item.state === ChannelState.Missed) return this.$t('channel.state.hold');
      if (item.state === ChannelState.WrapTime) return this.$t('channel.state.wrapTime');
      if (item.state === ChannelState.Processing) return this.$t('channel.state.processing');
      if (item.state === ChannelState.Transfer) return this.$t('channel.state.transfer');

      if (item.state === ChannelType.Call) return this.$t('channel.type.call');
      if (item.state === ChannelType.Email) return this.$t('channel.type.email');
      if (item.state === ChannelType.Chat) return this.$t('channel.type.chat');
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
