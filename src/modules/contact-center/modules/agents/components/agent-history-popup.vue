<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!isHistoryOpened"
    overflow
    @close="close"
  >
    <template #title>
      {{ $t('objects.ccenter.agents.statusHistory') }}
    </template>
    <template #main>
      <section class="history-popup">
        <div class="history-popup__filters">
          <wt-datepicker
            :label="$t('objects.from')"
            :value="from"
            mode="datetime"
            @input="selectForm"
          />
          <wt-datepicker
            :label="$t('objects.to')"
            :value="to"
            mode="datetime"
            @input="selectTo"
          />
        </div>
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="false"
            :headers="headers"
            :selectable="false"
          >
            <template #state="{ item }">
              {{ $t(`${agentState[item.state]}`) }}
            </template>
            <template #channel="{ item }">
              <span v-if="item.channel">
                {{ $t(`channel.type.${item.channel}`) }}
              </span>
            </template>
            <template #from="{ item }">
              {{ prettifyTime(item.joinedAt) }}
            </template>
            <template #to="{ item }">
              <div v-if="item.duration">
                {{ calcStatusTo(item) }}
              </div>
            </template>
            <template #duration="{ item }">
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
          />
        </div>
      </section>
    </template>
    <template #actions>
      <wt-button @click="close">
        {{ $t('objects.ok') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { FormatDateMode } from '@webitel/ui-sdk/enums'
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { formatDate } from '@webitel/ui-sdk/utils';
import { mapGetters } from 'vuex';

import historyPopupMixin from '../../../../../app/mixins/objectPagesMixins/historyPopupMixin/historyPopupMixin';
import dummyPicDark from '../assets/adm-agent-history-dark.svg';
import dummyPicLight from '../assets/adm-agent-history-light.svg';
import agentState from '../dictionaries/agentState.dictionary';

export default {
  name: 'AgentHistoryPopup',
  mixins: [historyPopupMixin],
  data: () => ({
    namespace: 'ccenter/agents/history',
    agentState,
  }),

  computed: {
    ...mapGetters('appearance', {
      darkMode: 'DARK_MODE',
    }),
    headers() {
      return [
        {
          value: 'state',
          text: this.$t('objects.ccenter.agents.historyState'),
        },
        {
          value: 'channel',
          text: this.$t('objects.ccenter.agents.historyChannel'),
        },
        {
          value: 'from',
          text: this.$t('objects.ccenter.agents.historyFrom'),
        },
        {
          value: 'to',
          text: this.$t('objects.ccenter.agents.historyTo'),
        },
        {
          value: 'duration',
          text: this.$t('objects.ccenter.agents.historyDuration'),
        },
      ];
    },
    dummy() {
      return (
        !this.dataList.length && {
          src: this.darkMode ? dummyPicDark : dummyPicLight,
          text: 'objects.ccenter.agents.emptyPopup',
        }
      );
    },
  },

  methods: {
    convertDuration,
    calcStatusTo(item) {
      return formatDate(+item.joinedAt + item.duration * 1000, FormatDateMode.DATETIME);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
