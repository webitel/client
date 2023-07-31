<template>
  <wt-popup min-width="900" @close="close">
    <template v-slot:title>
      Assign skill to agents
    </template>
    <template v-slot:main>
      <div class="opened-skill-agent-popup__filters">
        <wt-search-bar
          v-model="dataSearch"
          @change="loadDataList"
        >
        </wt-search-bar>
        <wt-select
          :placeholder="$tc('objects.ccenter.teams.teams', 1)"
          :search-method="loadTeams"
          v-model="teamSearch"
          @input="loadDataList"
          multiple
        >
        </wt-select>
        <wt-select
          :placeholder="$tc('objects.lookups.skills.skills', 1)"
          :search-method="loadSkills"
          v-model="skillSearch"
          @input="loadDataList"
          multiple
        >
        </wt-select>
      </div>
      <div ref="scroll-wrap" class="scroll-wrap">
        <wt-table
          :headers="headers"
          :data="dataList"
          :grid-actions="false"
          sortable
          @sort="sort"
        >
          <template v-slot:name="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:team="{ item }">
            {{ item?.team?.name }}
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
      >{{ $t('objects.add') }}
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
import AgentsAPI from '../../../../../../contact-center/modules/agents/api/agents';
import TeamsAPI from '../../../../../../contact-center/modules/teams/api/teams';
import SkillsAPI from '../../../api/agentSkills';
import nestedObjectMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import infiniteScrollMixin from './infiniteScrollMixin';
import ScrollObserver from './scroll-observer.vue';

export default {
  name: 'opened-skill-agent-popup',
  mixins: [nestedObjectMixin, infiniteScrollMixin],
  components: { ScrollObserver },

  data: () => ({
    namespace: 'lookups/teams/agents',
    agents: {},
    dataList: [],
    teamSearch: [],
    skillSearch: [],
  }),

  methods: {
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
      this.dispatchSort({ header: params[0], nextSortOrder: params[1] });
    },
    dispatchSort(dispatch, payload) {
      return dispatch(`${this.namespace}/${this.subNamespace}/SORT`, payload);
    },
    selectingAgents() {
      this.$emit('selectingAgents', this.selectedRows);
    },
  },
  computed: {
    headers() {
      return [
        { value: 'name', text: this.$t('reusable.name') },
        { value: 'team', text: this.$tc('objects.ccenter.teams.teams', 1) },
      ];
    },
    selectedRows() {
      return this.dataList.filter((item) => item._isSelected);
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
  gap: 8px;
}
</style>
