<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <template v-slot:actions>
          <wt-button
            color="secondary"
            @click="openAgentPopup"
            :disabled="!selectedRows.length"
          >
            {{ $t('objects.lookups.skills.assignUser') }}
          </wt-button>
        </template>
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>

    <template v-slot:main>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>
      <skill-popup
        @open-agent-skill-state-popup="openAgentSkillStatePopup"
        @selecting-agents="selectingAgents"
        v-if="isAgentPopup"
        @close="closeAgentPopup"
      ></skill-popup>
      <skill-state-popup
        @change-agents-state="changeAgentsState"
        @previous-agent-state-popup="closeAgentSkillStatePopup();openAgentPopup();"
        v-if="agentSkillStatePopup"
        @close="closeAgentSkillStatePopup"
      ></skill-state-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.lookups.skills.allSkills') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @input="setSearch"
              @search="loadList"
              @enter="loadList"
            ></wt-search-bar>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="callDelete(selectedRows)"
              ></delete-all-action>
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :text="dummy.text && $t(dummy.text)"
          :show-action="dummy.showAction"
          @create="create"
          class="dummy-wrapper"
        ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template v-slot:name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template v-slot:description="{ item }">
              {{ item.description }}
            </template>
            <template v-slot:totalAgents="{ item }">
              {{ item.totalAgents }}
            </template>
            <template v-slot:activeAgents="{ item }">
              {{ item.activeAgents }}
            </template>
            <template v-slot:actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              ></wt-icon-action>
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
                @click="callDelete(item)"
              ></wt-icon-action>
            </template>
          </wt-table>
          <wt-pagination
            :size="size"
            :next="isNext"
            :prev="page > 1"
            debounce
            @next="nextPage"
            @prev="prevPage"
            @input="setSize"
            @change="loadList"
          ></wt-pagination>
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useDummy } from '../../../../../app/composables/useDummy';
import AgentSkillsAPI from '../modules/agents/api/skillAgents';
import SkillPopup from '../modules/agents/components/opened-skill-agent-popup.vue';
import SkillStatePopup from '../modules/agents/components/opened-skill-agent-state-popup.vue';

const namespace = 'lookups/skills';

export default {
  name: 'the-agent-skills',
  mixins: [tableComponentMixin],
  components: { SkillPopup, SkillStatePopup },
  data: () => ({
    namespace,
    routeName: RouteNames.SKILLS,
    isAgentPopup: false,
    agentSkillStatePopup: false,
  }),

  setup() {
    const { dummy } = useDummy({ namespace, showAction: true });
    return { dummy };
  },

  computed: {
    path() {
      return [
        { name: this.$t('objects.lookups.lookups') },
        { name: this.$tc('objects.lookups.skills.agentSkills', 2), route: '/lookups/skills' },
      ];
    },
    selectedRows() {
      return this.dataList.filter((item) => item._isSelected);
    },
  },
  methods: {
    openAgentPopup() {
      this.isAgentPopup = true;
    },
    closeAgentPopup() {
      this.isAgentPopup = false;
    },
    openAgentSkillStatePopup() {
      this.agentSkillStatePopup = true;
    },
    closeAgentSkillStatePopup() {
      this.agentSkillStatePopup = false;
    },
    selectingAgents(selectedRows) {
      this.agentsSelectedRows = selectedRows.map((obj) => ({
        id: obj.id,
      }));
    },
    async changeAgentsState(agentsState) {
      const itemInstance = { ...agentsState };
      itemInstance.agent = [].concat(this.agentsSelectedRows);
      try {
        await this.selectedRows.forEach((el) => {
          const parentId = el.id;
          AgentSkillsAPI.add({ parentId, itemInstance });
        });
      } catch (e) {
        console.error(e);
      } finally {
        // TODO: loadDataList doesnt update Total agents column
        await this.loadDataList();
      }
    },
  },
};
</script>

<style scoped>

</style>
