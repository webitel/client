<template>
  <section>

    <agent-buckets-popup
        v-if="bucketsPopupTriggerIf"
        :itemId="this.agentId"
        @close="closeBucketsPopup"
    ></agent-buckets-popup>

    <agent-popup
        v-if="popupTriggerIf"
        @close="closePopup"
    ></agent-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.agents.agents', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <search
            v-model="search"
            @filterData="loadList"
        ></search>
        <i
            class="icon-icon_delete icon-action"
            :class="{'hidden': anySelected}"
            :title="$t('iconHints.deleteSelected')"
            @click="deleteSelected"
        ></i>
        <i
            class="icon-icon_reload icon-action"
            :title="$t('iconHints.reload')"
            @click="loadList"
        ></i>
        <i
            class="icon-action icon-icon_plus"
            :title="$t('iconHints.add')"
            @click="create"
        ></i>
      </div>
    </header>

    <loader v-show="!isLoaded"></loader>

    <vuetable
        v-show="isLoaded"
        :api-mode="false"
        :fields="fields"
        :data="dataList"
    >
      <template slot="name" slot-scope="props">
        <div>
          {{ dataList[props.rowIndex].agent.name }}
        </div>
      </template>

      <template slot="lvl" slot-scope="props">
        <div>
          {{ dataList[props.rowIndex].lvl }}
        </div>
      </template>

      <template slot="buckets" slot-scope="props">
        <div>{{ getFirstBucket(dataList[props.rowIndex].buckets) }}
          <span class="hidden-num"
                @click="readBuckets(props.rowIndex)"
                v-if="dataList[props.rowIndex].buckets.length > 1"
          >+{{ dataList[props.rowIndex].buckets.length - 1 }}</span>
        </div>
      </template>

      <template slot="actions" slot-scope="props">
        <i class="vuetable-action icon-icon_edit"
           :title="$t('iconHints.edit')"
           @click="edit(props.rowIndex)"
        ></i>
        <i class="vuetable-action icon-icon_delete"
           :title="$t('iconHints.delete')"
           @click="remove(props.rowIndex)"
        ></i>
      </template>
    </vuetable>
    <pagination
        v-show="isLoaded"
        v-model="size"
        @loadDataList="loadList"
        @next="nextPage"
        @prev="prevPage"
        :isNext="isNextPage"
        :isPrev="!!page"
        :page="page"
    ></pagination>
  </section>
</template>

<script>
import tableComponentMixin from '@/mixins/tableComponentMixin';
import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
import { _checkboxTableField, _actionsTableField_2 } from '@/utils/tableFieldPresets';
import { mapActions, mapState } from 'vuex';
import eventBus from '@/utils/eventBus';
import agentBucketsPopup from './opened-team-agents-buckets-popup';
import agentPopup from './opened-team-agents-popup';

export default {
  name: 'opened-team-agents',
  mixins: [openedTabComponentMixin, tableComponentMixin],
  components: { agentPopup, agentBucketsPopup },
  data() {
    return {
      bucketsPopupTriggerIf: false,
      agentId: 0,
      fields: [
        _checkboxTableField,
        { name: 'name', title: this.$t('objects.name') },
        { name: 'lvl', title: this.$t('objects.ccenter.teams.lvl') },
        { name: 'buckets', title: this.$tc('objects.ccenter.buckets.buckets', 1), width: '160px' },
        _actionsTableField_2,
      ],
    };
  },

  watch: {
    parentId(value) {
      this.setParentId(value);
    },
  },

  computed: {
    ...mapState('ccenter/teams', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('ccenter/teams/agents', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      isNextPage: (state) => state.isNextPage,
    }),

    size: {
      get() {
        return this.$store.state.ccenter.teams.agents.size;
      },
      set(value) {
        this.setSize(value);
      },
    },

    search: {
      get() {
        return this.$store.state.ccenter.teams.agents.search;
      },
      set(value) {
        this.setSearch(value);
      },
    },

  },

  methods: {
    async create() {
      if (!this.checkValidations()) {
        if (!this.id) await this.addParentItem();
        this.popupTriggerIf = true;
      } else {
        eventBus.$emit('notification', { type: 'error', text: 'Check your validations!' });
      }
    },

    edit(rowIndex) {
      this.setId(this.dataList[rowIndex].id);
      this.popupTriggerIf = true;
    },

    getFirstBucket(buckets) {
      if (buckets.length > 0) {
        return buckets[0].name;
      }
    },

    readBuckets(rowIndex) {
      this.agentId = this.dataList[rowIndex].id;
      this.bucketsPopupTriggerIf = true;
    },

    closePopup() {
      this.popupTriggerIf = false;
      this.resetItemState();
    },

    closeBucketsPopup() {
      this.bucketsPopupTriggerIf = false;
      this.resetItemState();
    },

    ...mapActions('ccenter/teams', {
      addParentItem: 'ADD_ITEM',
    }),

    ...mapActions('ccenter/teams/agents', {
      setParentId: 'SET_PARENT_ITEM_ID',
      setId: 'SET_ITEM_ID',
      loadDataList: 'LOAD_DATA_LIST',
      setSize: 'SET_SIZE',
      setSearch: 'SET_SEARCH',
      nextPage: 'NEXT_PAGE',
      prevPage: 'PREV_PAGE',
      removeItem: 'REMOVE_ITEM',
      resetItemState: 'RESET_ITEM_STATE',
    }),
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
