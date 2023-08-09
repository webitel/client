<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <template v-slot:actions>
          <wt-button
            :disabled="!selectedRows.length"
            color="secondary"
            @click="isAddSkillToAgentPopup = true"
          >{{ $t('objects.lookups.skills.assignAgent') }}
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

      <add-skill-to-agent-popup
        v-if="isAddSkillToAgentPopup"
        :skill-id="selectedRowsId"
        @close="isAddSkillToAgentPopup = false"
        @saved="loadDataList"
      ></add-skill-to-agent-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.lookups.skills.allSkills') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
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
          :show-action="dummy.showAction"
          :src="dummy.src"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
          @create="create"
        ></wt-dummy>
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="hasTableActions"
            :headers="headers"
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
  </wt-page-wrapper>
</template>

<script>
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import AddSkillToAgentPopup from '../modules/agents/components/add-skill-to-agent-popup/add-skill-to-agent-popup.vue';

const namespace = 'lookups/skills';

export default {
  name: 'the-agent-skills',
  mixins: [tableComponentMixin],
  components: { AddSkillToAgentPopup },
  data: () => ({
    namespace,
    routeName: RouteNames.SKILLS,
    isAddSkillToAgentPopup: false,
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
    selectedRowsId() {
      return this.selectedRows.map((item) => item.id);
    },
  },
};
</script>

<style scoped>

</style>
