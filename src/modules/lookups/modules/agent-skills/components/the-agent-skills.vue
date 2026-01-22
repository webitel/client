<template>
  <wt-page-wrapper
    :actions-panel="false"

    class="table-page"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <template #actions>
          <wt-button
            :disabled="!selectedRows.length"
            color="secondary"

            @click="openAddSkillToAgentPopup"
          >
            {{ $t('objects.lookups.skills.assignAgent') }}
          </wt-button>
        </template>
        <wt-breadcrumb
          :path="path"
        />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"

        @close="closeDelete"
      />

      <add-skill-to-agent-popup
        :skill-id="selectedRowsId"

        @close="closeAddSkillToAgentPopup"
        @saved="loadDataList"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ $t('objects.lookups.skills.allSkills') }}
          </h3>
          <div class="table-title__actions-wrap">
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
                :class="{ 'hidden': anySelected }"
                :selected-count="selectedRows.length"

                @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader
          v-show="!isLoaded"
        />
        <wt-dummy
          v-if="dummy && isLoaded"
          :show-action="dummy.showAction"
          :src="dummy.src"
          :dark-mode="darkMode"
          :text="dummy.text && $t(dummy.text)"

          class="dummy-wrapper"
          @create="create"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-section__table-wrapper"
        >
          <wt-table
            :data="dataList"
            :headers="headers"
            sortable

            @sort="sort"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="routeName"
              >
                {{ item.name }}
              </adm-item-link>
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
                action="edit"
                :disabled="!hasEditAccess"

                @click="edit(item)"
              />
              <wt-icon-action
                action="delete"
                :disabled="!hasDeleteAccess"

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
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import addSkillToAgentMixin from '../mixins/addSkillToAgentPopupMixin.js';
import AddSkillToAgentPopup from '../modules/agents/components/add-skill-to-agent-popup/add-skill-to-agent-popup.vue';

const namespace = 'lookups/skills';

export default {
  name: 'TheAgentSkills',
  components: { AddSkillToAgentPopup, DeleteConfirmationPopup },
  mixins: [tableComponentMixin, addSkillToAgentMixin],

  setup() {
    const { dummy } = useDummy({
      namespace,
      showAction: true,
    });
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
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.lookups.lookups'),
        },
        {
          name: this.$t('objects.lookups.skills.agentSkills', 2),
          route: '/lookups/skills',
        },
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

<style scoped></style>
