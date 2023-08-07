<template>
  <wt-popup min-width="1440" @close="close">
    <template v-slot:title>
      {{ $t('objects.lookups.skills.assignSkillToAgents') }}
    </template>
    <template v-slot:main>
      <div class="opened-skill-agent-popup__filters">
        <wt-search-bar
          v-model="dataSearch"
          @input="setSearch"
          @search="loadDataList"
          @enter="loadDataList"
          class="opened-skill-agent-popup__input"
        >
        </wt-search-bar>
        <wt-select
          v-model="teamSearch"
          :placeholder="$tc('objects.ccenter.teams.teams', 1)"
          :search-method="loadTeams"
          :clearable="false"
          @input="handleTeamSearch"
          multiple
          class="opened-skill-agent-popup__input"
        >
        </wt-select>
        <wt-select
          :placeholder="$tc('objects.lookups.skills.skills', 1)"
          :search-method="loadSkills"
          v-model="skillSearch"
          :clearable="false"
          @input="handleSkillSearch"
          multiple
          class="opened-skill-agent-popup__input"
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
          :headers="headers"
          :data="state.dataList"
          :grid-actions="false"
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
import { mapActions } from 'vuex';
import AgentsAPI from '../../../../../../contact-center/modules/agents/api/agents';
import TeamsAPI from '../../../../../../contact-center/modules/teams/api/teams';
import SkillsAPI from '../../../api/agentSkills';
import infiniteScrollMixin from './infiniteScrollMixin';
import ScrollObserver from './scroll-observer.vue';

export default {
  name: 'opened-skill-agent-popup',
  mixins: [infiniteScrollMixin],
  components: { ScrollObserver },

  data: () => ({
    namespace: 'ccenter/agents',
    agents: {},
    teamSearch: [],
    skillSearch: [],
    state: {
      headers: [],
      dataList: [],
      aggs: {},
      size: 10,
      search: '',
      page: 1,
      sort: '',
      isNextPage: false,
    },
  }),

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
      await this.resetPage(this.state);
      await this.fetch(this.state);
    },

    async updateHeaderSort(header, nextSortOrder) {
      console.log(this.state.headers);
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
      console.log(headers);
    },

    async resetPage() {
      const page = 1;
      this.state.page = page;
    },
    async handleSearch(value, paramsArray) {
      const uniqValues = value.filter(
        (item) => !paramsArray.some((entry) => entry.id === item.id),
      );
      paramsArray.push(...uniqValues);
      await this.loadDataList();
    },
    async handleTeamSearch(value) {
      await this.handleSearch(value, this.teamSearch);
    },
    async handleSkillSearch(value) {
      await this.handleSearch(value, this.skillSearch);
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
        page: this.dataPage,
        size: this.dataSize,
        search: this.dataSearch,
        team,
        skill,
      };
    },
    sort(...params) {
      this.sortDataList(params[0], params[1]);
    },
    ...mapActions({
      setSearch(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_SEARCH`, payload);
      },
    }),
    selectingAgents() {
      this.$emit('selectingAgents', this.selectedRows);
    },
    async resetFilters() {
      // TODO : finish reset
      this.$router.push({ query: null });
      this.teamSearch = [];
      this.skillSearch = [];
      this.dataSearch = '';
      await this.loadDataList();
    },
  },
  computed: {
    headers() {
      return [
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
      ];
    },
    selectedRows() {
      return this.state.dataList.filter((item) => item._isSelected);
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-popup {
  :deep(.wt-popup__main) {
    display: flex;
    flex-direction: column;
  }

  :deep(.scroll-wrap) {
    flex-grow: 1;
    min-height: 0;
    overflow: auto;
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
