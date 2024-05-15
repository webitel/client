<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <template #actions>
          <wt-button
            :disabled="!selectedRows.length"
            color="secondary"
            @click="isAddSkillToAgentPopup = true"
          >
            {{ $t('objects.lookups.skills.assignAgent') }}
          </wt-button>
        </template>
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        :callback="deleteCallback"
        :delete-count="deleteCount"
        :shown="isDeleteConfirmationPopup"
        @close="closeDelete"
      />

      <add-skill-to-agent-popup
        :shown="isAddSkillToAgentPopup"
        :skill-id="selectedRowsId"
        @close="isAddSkillToAgentPopup = false"
        @saved="loadDataList"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.lookups.skills.allSkills') }}
          </h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
            />
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :dark-mode="darkMode"
          :show-action="dummy.showAction"
          :src="dummy.src"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
          @create="create"
        />
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
            <template #name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #description="{ item }">
              {{ item.description }}
            </template>
            <template #totalAgents="{ item }">
              {{ item.totalAgents }}
            </template>
            <template #activeAgents="{ item }">
              {{ item.activeAgents }}
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
              />
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
  </wt-page-wrapper>
</template>

<script>
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import {
  useDeleteConfirmationPopup,
} from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import AddSkillToAgentPopup from '../modules/agents/components/add-skill-to-agent-popup/add-skill-to-agent-popup.vue';

const namespace = 'lookups/skills';

export default {
  name: 'TheAgentSkills',
  components: { AddSkillToAgentPopup, DeleteConfirmationPopup },
  mixins: [tableComponentMixin],

  setup() {
    const { dummy } = useDummy({ namespace, showAction: true });
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },

  data: () => ({
    namespace,
    routeName: RouteNames.SKILLS,
    isAddSkillToAgentPopup: false,
  }),

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
