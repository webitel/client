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
      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">{{ $t('objects.lookups.pauseCause.allPauseCause') }}</h3>
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
              :tooltip="$t('iconHints.deleteSelected')"
              @click="deleteSelected"
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
          >
            <template slot="name" slot-scope="{ item }">
              <span class="nameLink" @click="edit(item)">
                {{ item.name }}
              </span>
            </template>
            <template slot="limit" slot-scope="{ item }">
              {{ prettifyPauseCauseLimit(item.limitMin) }}
            </template>
            <template slot="allowAdmin" slot-scope="{ item, index }">
              <wt-checkbox
                :selected="item.allowAdmin"
                :disabled="!hasEditAccess"
                @change="changeAdminPermissions({ item, index, value: $event })"
              ></wt-checkbox>
            </template>
            <template slot="allowSupervisor" slot-scope="{ item, index }">
              <wt-checkbox
                :selected="item.allowSupervisor"
                :disabled="!hasEditAccess"
                @change="changeSupervisorPermissions({ item, index, value: $event })"
              ></wt-checkbox>
            </template>
            <template slot="allowAgent" slot-scope="{ item, index }">
              <wt-checkbox
                :selected="item.allowAgent"
                :disabled="!hasEditAccess"
                @change="changeAgentPermissions({ item, index, value: $event })"
              ></wt-checkbox>
            </template>
            <template slot="actions" slot-scope="{ item, index }">
              <edit-action
                v-if="hasEditAccess"
                @click="edit(item)"
              ></edit-action>
              <delete-action
                v-if="hasDeleteAccess"
                @click="remove(index)"
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
import tableComponentMixin from '../../../mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../router/_internals/RouteNames.enum';

export default {
  name: 'the-agent-pause-cause',
  mixins: [tableComponentMixin],

  data: () => ({
    namespace: 'lookups/pauseCause',
    routeName: RouteNames.PAUSE_CAUSE,
  }),

  computed: {
    ...mapState('lookups/pauseCause', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),

    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'limit', text: this.$t('objects.lookups.pauseCause.limit') },
        { value: 'allowAdmin', text: this.$t('objects.lookups.pauseCause.allowAdmin') },
        { value: 'allowSupervisor', text: this.$t('objects.lookups.pauseCause.allowSupervisor') },
        { value: 'allowAgent', text: this.$t('objects.lookups.pauseCause.allowAgent') },
      ];
    },

    path() {
      return [
        { name: this.$t('objects.lookups.lookups') },
        { name: this.$tc('objects.lookups.pauseCause.pauseCause', 2), route: '/lookups/pause-cause' },
      ];
    },
  },
  methods: {
    ...mapActions({
      changeAdminPermissions(dispatch, payload) {
        return dispatch(`${this.namespace}/CHANGE_ADMIN_PERMISSIONS`, payload);
      },
      changeSupervisorPermissions(dispatch, payload) {
        return dispatch(`${this.namespace}/CHANGE_SUPERVISOR_PERMISSIONS`, payload);
      },
      changeAgentPermissions(dispatch, payload) {
        return dispatch(`${this.namespace}/CHANGE_AGENT_PERMISSIONS`, payload);
      },
    }),
    prettifyPauseCauseLimit(limit) {
      return `${limit} ${this.$t('objects.lookups.pauseCause.min')}`;
    },
  },
};
</script>

<style scoped>

</style>
