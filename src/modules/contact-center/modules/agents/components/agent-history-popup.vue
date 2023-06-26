<template>
  <wt-popup overflow @close="close">
    <template v-slot:title>{{ $t('objects.ccenter.agents.statusHistory') }}</template>
    <template v-slot:main>
      <section class="history-popup">
        <div class="history-popup__filters">
          <wt-datepicker
            :label="$t('objects.from')"
            :value="from"
            mode="datetime"
            @input="setFrom"
          ></wt-datepicker>
          <wt-datepicker
            :label="$t('objects.to')"
            :value="to"
            mode="datetime"
            @input="setTo"
          ></wt-datepicker>
        </div>
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :text="$t(dummy.text)"
          class="dummy-wrapper"
        ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper">
          <wt-table
            :data="dataList"
            :grid-actions="false"
            :headers="headers"
            :selectable="false"
          >
            <template v-slot:state="{ item }">
              {{ $t(`${agentState[item.state]}`) }}
            </template>
            <template v-slot:channel="{ item }">
              <span v-if="item.channel">
              {{ $t(`channel.type.${item.channel}`) }}
              </span>
            </template>
            <template v-slot:from="{ item }">
              {{ prettifyTime(item.joinedAt) }}
            </template>
            <template v-slot:to="{ item }">
              <div v-if="item.duration">
                {{ calcStatusTo(item) }}
              </div>
            </template>
            <template v-slot:duration="{ item }">
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
    <template v-slot:actions>
      <wt-button @click="close">{{ $t('objects.ok') }}</wt-button>
      <wt-button color="secondary" @click="close"> {{ $t('objects.close') }}</wt-button>
    </template>
  </wt-popup>
</template>

<script>
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import historyPopupMixin from '../../../../../app/mixins/objectPagesMixins/historyPopupMixin/historyPopupMixin';
import agentState from '../dictionaries/agentState.dictionary';
import dummyPic from '../assets/adm-agent-history.svg';

export default {
  name: 'agent-history-popup',
  mixins: [historyPopupMixin],
  data: () => ({
    namespace: 'ccenter/agents/history',
    agentState,
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
    dummy() {
      return !this.dataList.length && {
          src: dummyPic,
          text: 'objects.ccenter.agents.emptyPopup',
      };
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
