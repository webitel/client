<template>
  <section>
    <agent-buckets-popup
        v-if="isAgentBucketsPopup"
        :itemId="this.agentId"
        @close="closeBucketsPopup"
    ></agent-buckets-popup>

    <agent-popup
        v-if="isAgentPopup"
        @close="closePopup"
    ></agent-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.agents.agents', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        ></wt-search-bar>
        <wt-icon-btn
          :class="{'hidden': anySelected}"
          :tooltip="$t('iconHints.deleteSelected')"
          class="icon-action"
          icon="bucket"
          @click="deleteSelected"
        ></wt-icon-btn>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
        <wt-icon-btn
          class="icon-action"
          icon="plus"
          @click="create"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
    <wt-table
        :headers="headers"
        :data="dataList"
    >
      <template slot="name" slot-scope="{ item }">
        <div v-if="item.agent">
          {{ item.agent.name }}
        </div>
      </template>

      <template slot="lvl" slot-scope="{ item }">
          {{ item.lvl }}
      </template>

      <template slot="buckets" slot-scope="{ item }">
        <div>{{ getFirstBucket(item.buckets) }}
          <span class="hidden-num"
                @click="readBuckets(item)"
                v-if="item.buckets.length > 1"
          >+{{ item.buckets.length - 1 }}</span>
        </div>
      </template>

      <template slot="actions" slot-scope="{ item, index }">
        <edit-action
          @click="edit(item)"
        ></edit-action>
        <delete-action
          @click="remove(index)"
        ></delete-action>
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
import { mapState } from 'vuex';
import AgentBucketsPopup from './opened-team-agents-buckets-popup.vue';
import AgentPopup from './opened-team-agents-popup.vue';
import openedObjectTableTabMixin from '../../../mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-team-agents',
  mixins: [openedObjectTableTabMixin],
  components: { AgentPopup, AgentBucketsPopup },
  data: () => ({
    isAgentBucketsPopup: false,
    isAgentPopup: false,
    agentId: 0,
    subNamespace: 'agents',
  }),
  computed: {
    ...mapState('ccenter/teams', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('ccenter/teams/agents', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'lvl', text: this.$t('objects.ccenter.teams.lvl') },
        { value: 'buckets', text: this.$tc('objects.ccenter.buckets.buckets', 1), width: '160px' },
      ];
    },
  },

  methods: {
    getFirstBucket(buckets) {
      if (buckets.length > 0) {
        return buckets[0].name;
      }
      return '';
    },

    readBuckets(item) {
      this.agentId = item.id;
      this.isAgentBucketsPopup = true;
    },

    openPopup() {
      this.isAgentPopup = true;
    },

    closePopup() {
      this.isAgentPopup = false;
      this.resetItemState();
    },

    closeBucketsPopup() {
      this.isAgentBucketsPopup = false;
      this.resetItemState();
    },
  },
};
</script>

<style lang="scss" scoped>
.hidden-num {
  @extend .typo-body-md;

  margin-left: 33px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
