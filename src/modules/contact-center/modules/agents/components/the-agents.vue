<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>

    <template slot="main">
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
              @input="setSearch"
              @search="loadList"
              @enter="loadList"
            ></wt-search-bar>
            <wt-icon-btn
              v-if="hasDeleteAccess"
              class="icon-action"
              :class="{'hidden': anySelected}"
              icon="bucket"
              :tooltip="actionPanelDeleteTooltip"
              @click="callDelete(selectedRows)"
            ></wt-icon-btn>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            ></wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
            :headers="headers"
            :data="dataList"
            :grid-actions="hasTableActions"
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              <item-link :link="itemLink(item)">
                {{ item.name }}
              </item-link>
            </template>
            <template slot="state" slot-scope="{ item }">
              <status
                :class="{'status__true': item.status === 'online',
                            'status__info': item.status === 'pause'}"
                :text=computeOnlineText(item.status)
              ></status>
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
import { mapState, mapActions } from 'vuex';
import HistoryPopup from './agent-history-popup.vue';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import getNamespacedState from '../../../../../app/store/helpers/getNamespacedState';

export default {
  name: 'the-agents',
  mixins: [tableComponentMixin],
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
          route: '/contact-center/agents'
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

    computeOnlineText(state) {
      switch (state) {
        case 'online':
          return 'Online';
        case 'pause':
          return 'Pause';
        default:
          return 'Offline';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
