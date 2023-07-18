<template>
  <wt-popup min-width="900" @close="close">
    <template v-slot:title>
      Assign skill to agents
    </template>
    <template v-slot:main>
      <wt-search-bar
        v-model="dataSearch"
        @change="loadDataList"
      >
      </wt-search-bar>
      <wt-select
        :search-method="loadTeams"
        v-model="teamSearch"
        @input="loadDataList"
        multiple
      >
      </wt-select>
      <wt-select
        :search-method="loadSkills"
        v-model="skillSearch"
        @input="loadDataList"
        multiple
      >
      </wt-select>
      <div
        ref="scroll-wrap"
        class="table-wrapper">
        <wt-table
          :headers="headers"
          :data="dataList"
          :grid-actions="false"
          sortable
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
        :disabled="disabledSave"
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
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
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
    namespace: 'ccenter/teams/agents',
    agents: {},
    dataList: [],
    teamSearch: [],
    skillSearch: [],
  }),

  setup: () => ({
    v$: useVuelidate(),
  }),
  created() {
    this.loadDataList();
  },
  validations: {
    itemInstance: {
      agent: { required },
    },
  },

  methods: {
    fetch: AgentsAPI.getList,
    loadTeams: TeamsAPI.getLookup,
    loadSkills: SkillsAPI.getLookup,
    openAgentSkillStatePopup() {
      this.$emit('openAgentSkillStatePopup');
      this.close();
    },
    collectParams() {
      const team = this.teamSearch.map(({id}) => id);
      const skill = this.skillSearch.map(({id}) => id);
      return {
        page: this.dataPage,
        size: this.dataSize,
        search: this.dataSearch,
        team,
        skill,
      };
    },
  },
  computed: {
    headers() {
      return [
        { value: 'name', text: this.$t('reusable.name') },
        { value: 'team', text: this.$tc('objects.ccenter.teams.teams', 1) },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
