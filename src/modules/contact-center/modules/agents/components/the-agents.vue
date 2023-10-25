<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        v-show="deleteConfirmation.isDeleteConfirmationPopup"
        :delete-count="deleteConfirmation.deleteCount"
        :callback="deleteConfirmation.callback"
        @close="closeDelete"
      />

      <history-popup
        v-if="historyId"
        @close="closeHistoryPopup"
      />

      <section class="main-section__wrapper">
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
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="callDelete(selectedRows)"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
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
            <template #state="{ item }">
              <wt-indicator
                :color="statusIndicatorColor[snakeToCamel(item.status)]"
                :text="statusIndicatorText[snakeToCamel(item.status)]"
              />
            </template>
            <template #time="{ item }">
              {{ item.statusDuration }}
            </template>
            <template #team="{ item }">
              <wt-item-link
                v-if="item.team"
                :link="itemTeamLink(item)"
                target="_blank"
              >
                {{ item.team.name }}
              </wt-item-link>
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="history"
                @click="openHistory(item.id)"
              />
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
                @click="callDelete(item)"
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
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import { useDummy } from '../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import agentStatusMixin from '../../../mixins/agentStatusMixin';
import HistoryPopup from './agent-history-popup.vue';

const namespace = 'ccenter/agents';

export default {
  name: 'TheAgents',
  components: { HistoryPopup },
  mixins: [tableComponentMixin, agentStatusMixin],

  setup() {
    const { dummy } = useDummy({ namespace, showAction: true });
    return { dummy };
  },

  data: () => ({
    namespace,
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
