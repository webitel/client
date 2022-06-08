<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>

    <template v-slot:main>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :payload="deleteConfirmation"
        @close="closeDelete"
      ></delete-confirmation-popup>

      <history-popup
        v-if="historyId"
        @close="closeHistoryPopup"
      ></history-popup>

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.ccenter.agents.allAgents') }}</h3>
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
        <div v-show="isLoaded" class="table-wrapper">
          <wt-table
            :data="dataList"
            :grid-actions="hasTableActions"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              <item-link :link="editLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template slot="state" slot-scope="{ item }">
              <wt-indicator
                :color="statusIndicatorColor[snakeToCamel(item.status)]"
                :text="statusIndicatorText[snakeToCamel(item.status)]"
              ></wt-indicator>
            </template>
            <template slot="time" slot-scope="{ item }">
              {{ item.statusDuration }}
            </template>
            <template slot="team" slot-scope="{ item }">
              <item-link v-if="item.team" :link="itemTeamLink(item)" target="_blank">
                {{ item.team.name }}
              </item-link>
            </template>
            <template slot="actions" slot-scope="{ item }">
              <history-action
                @click="openHistory(item.id)"
              ></history-action>
              <edit-action
                v-if="hasEditAccess"
                @click="edit(item)"
              ></edit-action>
              <delete-action
                v-if="hasDeleteAccess"
                @click="callDelete(item)"
              ></delete-action>
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
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import agentStatusMixin from '../../../mixins/agentStatusMixin';
import HistoryPopup from './agent-history-popup.vue';

export default {
  name: 'the-agents',
  mixins: [tableComponentMixin, agentStatusMixin],
  components: { HistoryPopup },

  data: () => ({
    namespace: 'ccenter/agents',
    routeName: RouteNames.AGENTS,
  }),

  computed: {
    ...mapState({
      historyId(state) {
        return getNamespacedState(state, `${this.namespace}/history`).parentId;
      },
    }),
    path() {
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        {
          name: this.$tc('objects.ccenter.agents.agents', 2),
          route: '/contact-center/agents',
        },
      ];
    },
  },

  methods: {
    ...mapActions({
      openHistory(dispatch, payload) {
        return dispatch(`${this.namespace}/history/SET_PARENT_ITEM_ID`, payload);
      },
    }),
    itemTeamLink({ team }) {
      return {
        name: `${RouteNames.TEAMS}-edit`,
        params: { id: team.id },
      };
    },
    closeHistoryPopup() {
      this.openHistory(null);
    },
    snakeToCamel,
  },
};
</script>

<style lang="scss" scoped>
</style>
