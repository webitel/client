<template>
  <section>
    <add-skill-to-agent-popup
      :skill-id="parentId"
      @close="closeAddSkillToAgentPopup"
      @saved="loadDataList"
    />
    <change-skill-popup
      :shown="agentSkillPopup"
      :selected-agents="selectedRows"
      @change="change"
      @close="closeAgentSkillPopup"
    />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.ccenter.agents.allAgents') }}
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
          <wt-switcher
            :label="$t('objects.lookups.skills.stateForAll')"
            :label-left="true"
            :value="aggs.enabled"
            @change="changeStateForAll"
          />
          <wt-icon-btn
            v-if="!disableUserInput"
            :class="{'hidden': anySelected}"
            class="icon-action"
            icon="arrow-mix"
            @click="openAgentSkillPopup"
          />
          <delete-all-action
            v-if="!disableUserInput"
            :class="{'hidden': anySelected}"
            :selected-count="selectedRows.length"
            @click="askDeleteConfirmation({
              deleted: selectedRows,
              callback: () => deleteData(selectedRows),
            })"
          />
          <wt-icon-btn
            v-if="!disableUserInput"
            class="icon-action"
            icon="plus"
            @click="openAddSkillToAgentPopup"
          />
        </wt-table-actions>
      </div>
    </header>
    <wt-loader v-show="!isLoaded" />
    <div
      v-show="isLoaded"
      class="table-wrapper"
    >
      <wt-table
        :data="dataList"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template #name="{ item }">
          <adm-item-link
            :id="item.agent.id"
            :route-name="RouteNames.AGENTS"
          >
            {{ item.agent.name }}
          </adm-item-link>
        </template>
        <template #team="{ item }">
          <adm-item-link
            v-if="item.team"
            :id="item.team.id"
            :route-name="RouteNames.TEAMS"
          >
            {{ item.team.name }}
          </adm-item-link>
        </template>
        <template #capacity="{ item, index }">
          <wt-input
            v-model="item.capacity"
            type="number"
            @input="handlePatchInput({item, index, prop:'capacity', value:$event})"
          />
        </template>
        <template #state="{ item, index }">
          <wt-switcher
            :value="item.enabled"
            @change="handlePatchEnabled({ item, index, prop: 'enabled', value: $event })"
          />
        </template>
        <template #actions="{ item }">
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

<script>
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import debounce from '@webitel/ui-sdk/src/scripts/debounce';

import accessControlMixin from '../../../../../../../app/mixins/baseMixins/accessControlMixin/accessControlMixin.js';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import addSkillToAgentPopupMixin from "../../../mixins/addSkillToAgentPopupMixin.js";
import AgentSkillsAPI from '../api/skillAgents';
import AddSkillToAgentPopup from './add-skill-to-agent-popup/add-skill-to-agent-popup.vue';
import ChangeSkillPopup from './replace-agent-skill-popup.vue';

export default {
  name: 'OpenedSkillAgents',
  components: {
    AddSkillToAgentPopup,
    ChangeSkillPopup,
    DeleteConfirmationPopup,
  },
  mixins: [openedObjectTableTabMixin, accessControlMixin, addSkillToAgentPopupMixin],
  setup() {
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },

  data: () => ({
    namespace: 'lookups/skills',
    subNamespace: 'agents',
    tableObjectRouteName: RouteNames.AGENTS, // this.editLink() computing
    agentSkillPopup: false,
  }),
  mounted() {
    this.handlePatchInput = debounce(this.handlePatchInput);
  },
  methods: {
    openAgentSkillPopup() {
      this.agentSkillPopup = true;
    },
    closeAgentSkillPopup() {
      this.agentSkillPopup = false;
    },
    async changeStateForAll(enabled) {
      const { parentId } = this;
      const changes = {
        enabled,
      };
      try {
        await AgentSkillsAPI.patch({
          parentId,
          changes,
        });
      } catch (e) {
        console.error(e);
      } finally {
        await this.loadDataList();
      }
    },
    async change({ changes, id }) {
      const { parentId } = this;
      try {
        await AgentSkillsAPI.patch({
          parentId,
          changes,
          id,
        });
      } catch (e) {
        console.error(e);
      } finally {
        await this.loadDataList();
      }
    },
    handlePatchInput(payload) {
      const modifiedIdPayload = this.payloadIdModifier(payload);
      this.patchItem(modifiedIdPayload);
    },
    async handlePatchEnabled(payload) {
      const modifiedIdPayload = this.payloadIdModifier(payload);
      try {
        await this.patchItem(modifiedIdPayload);
      } catch (e) {
        console.error(e);
      } finally {
        await this.loadDataList();
      }
    },
    payloadIdModifier(payload) {
      return {
        ...payload,
        item: {
          ...payload.item,
          id: [payload.item.id],
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
