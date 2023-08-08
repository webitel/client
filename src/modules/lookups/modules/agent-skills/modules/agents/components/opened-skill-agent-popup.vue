<template>
  <wt-popup
    min-width="768"
    width="1440"
    @close="close"
  >
    <template v-slot:title>
      {{ $t('objects.lookups.skills.assignSkillToAgents') }}
    </template>
    <template v-slot:main>
      <div class="opened-skill-agent-popup__filters">
        <wt-search-bar
          :value="state.search"
          class="opened-skill-agent-popup__input"
          debounce
          @enter="handleSearch"
          @input="setSearch"
          @search="handleSearch"
        >
        </wt-search-bar>
        <wt-select
          :placeholder="$tc('objects.ccenter.teams.teams', 1)"
          :search-method="loadTeams"
          :value="teamSearch"
          class="opened-skill-agent-popup__input"
          multiple
          @input="handleTeamSearch"
        >
        </wt-select>
        <wt-select
          :placeholder="$tc('objects.lookups.skills.skills', 1)"
          :search-method="loadSkills"
          :value="skillSearch"
          class="opened-skill-agent-popup__input"
          multiple
          @input="handleSkillSearch"
        >
        </wt-select>
        <wt-icon-btn
          class="icon-action"
          icon="clear"
          @click="resetFilters"
        ></wt-icon-btn>
      </div>
      <div ref="scroll-wrap" class="scroll-wrap">
        <wt-table
          :data="state.dataList"
          :grid-actions="false"
          :headers="state.headers"
          sortable
          @sort="sort"
        >
          <template v-slot:name="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:team="{ item }">
            <div v-if="item.team">
              {{ item.team.name }}
            </div>
          </template>
        </wt-table>
        <scroll-observer
          :options="obsOptions"
          @intersect="handleIntersect"
        />
      </div>
    </template>
    <template v-slot:actions>
      <wt-button
        :disabled="!selectedRows.length"
        @click="openAgentSkillStatePopup"
      >{{ $t('objects.next') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { SortSymbols, sortToQueryAdapter } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapState } from 'vuex';
import AgentsAPI from '../../../../../../contact-center/modules/agents/api/agents';
import TeamsAPI from '../../../../../../contact-center/modules/teams/api/teams';
import SkillsAPI from '../../../api/agentSkills';
import infiniteScrollMixin from './infiniteScrollMixin';
import ScrollObserver from './scroll-observer.vue';

export default {
  name: 'opened-skill-agent-popup',
  mixins: [infiniteScrollMixin],
  components: { ScrollObserver },

  data() {
    return {
      namespace: 'lookups/teams/agents',
      agents: {},
      teamSearch: [],
      skillSearch: [],
      state: {
        headers: [
          {
            value: 'name',
            field: 'name',
            text: this.$t('reusable.name'),
            sort: SortSymbols.NONE,
          },
          {
            value: 'team',
            field: 'team',
            text: this.$tc('objects.ccenter.teams.teams', 1),
            sort: SortSymbols.NONE,
          },
        ],
        dataList: [],
        aggs: {},
        size: 20,
        search: '',
        page: 1,
        sort: '',
        isNextPage: false,
      },
    };
  },

  props: {
    notSkillId: {
      required: true,
    },
  },

  methods: {
    close() {
      this.$emit('close');
    },
    async sortDataList(header, nextSortOrder) {
      const sort = nextSortOrder
        ? `${sortToQueryAdapter(nextSortOrder)}${header.field}`
        : nextSortOrder;

      this.state.sort = sort;
      await this.updateHeaderSort(header, nextSortOrder);
      return this.loadDataList();
    },

    async updateHeaderSort(header, nextSortOrder) {
      const headers = this.state.headers.map((oldHeader) => {
        if (oldHeader.sort !== undefined) {
          return {
            ...oldHeader,
            sort: oldHeader.field === header.field
              ? nextSortOrder
              : SortSymbols.NONE,
          };
        }
        return oldHeader;
      });
      this.state.headers = headers;
    },

    setSearch(value) {
      this.state.search = value;
    },
    async handleSearch() {
      this.state.page = 1;
      this.loadDataList();
    },
    async handleTeamSearch(value) {
      this.state.page = 1;
      this.teamSearch = value;
      this.state.dataList = [];
      const uniqValues = value.filter(
        (item) => !this.teamSearch.some((entry) => entry.id === item.id),
      );
      this.teamSearch.push(...uniqValues);
      await this.loadDataList();
    },
    async handleSkillSearch(value) {
      this.state.page = 1;
      this.skillSearch = value;
      this.state.dataList = [];
      const uniqValues = value.filter(
        (item) => !this.skillSearch.some((entry) => entry.id === item.id),
      );
      this.skillSearch.push(...uniqValues);
      await this.loadDataList();
    },
    fetch: AgentsAPI.getList,
    loadTeams: TeamsAPI.getLookup,
    loadSkills: SkillsAPI.getLookup,
    openAgentSkillStatePopup() {
      this.close();
      this.selectingAgents();
      this.$emit('openAgentSkillStatePopup');
    },
    collectParams() {
      const team = this.teamSearch.map(({ id }) => id);
      const skill = this.skillSearch.map(({ id }) => id);
      return {
        page: this.state.page,
        size: this.state.size,
        search: this.state.search,
        sort: this.state.sort,
        team,
        skill,
      };
    },
    sort(...params) {
      this.state.page = 1;
      this.sortDataList(params[0], params[1]);
    },
    selectingAgents() {
      this.$emit('selectingAgents', this.selectedRows);
    },
    async resetFilters() {
      this.teamSearch = [];
      this.skillSearch = [];
      this.state.search = '';
      this.state.page = 1;
      await this.loadDataList();
    },
  },
  computed: {
    selectedRows() {
      return this.state.dataList.filter((item) => item._isSelected);
    },
    ...mapState({
      id(state) {
        return getNamespacedState(state, this.namespace).itemId;
      },
      itemInstance(state) {
        return getNamespacedState(state, this.namespace).itemInstance;
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
.scroll-wrap {
  height: 65vh;
}

.wt-popup {
  :deep(.wt-popup__main) {
    display: flex;
    flex-direction: column;
  }

  :deep(.scroll-wrap) {
    overflow: auto;
    flex-grow: 1;
    min-height: 0;
  }
}

.opened-skill-agent-popup__filters {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.opened-skill-agent-popup__input {
  width: calc((100% - var(--spacing-md)) / 3);
}
</style>
