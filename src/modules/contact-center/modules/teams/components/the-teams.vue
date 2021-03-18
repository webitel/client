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
          <h3 class="content-title">{{ $t('objects.ccenter.teams.allTeams') }}</h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
            ></wt-search-bar>
            <wt-icon-btn
              v-if="hasDeleteAccess"
              :class="{'hidden': anySelected}"
              :tooltip="$t('iconHints.deleteSelected')"
              class="icon-action"
              icon="bucket"
              @click="deleteSelected"
            ></wt-icon-btn>
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            ></wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div v-show="isLoaded" class="table-wrapper">
          <wt-table
            :data="dataList"
            :headers="headers"
            :grid-actions="hasTableActions"
          >
            <template slot="name" slot-scope="{ item }">
              <span class="nameLink" @click="edit(item)">
                {{ item.name }}
              </span>
            </template>
            <template slot="strategy" slot-scope="{ item }">
              {{ computeStrategyDisplay(item.strategy) }}
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
import { kebabToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'the-teams',
  mixins: [tableComponentMixin],
  data: () => ({
    namespace: 'ccenter/teams',
    routeName: RouteNames.TEAMS,
  }),

  computed: {
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'strategy', text: this.$t('objects.ccenter.teams.strategy') },
      ];
    },

    path() {
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.teams.teams', 2), route: '/contact-center/teams' },
      ];
    },
  },

  methods: {
    computeStrategyDisplay(name) {
      return this.$t(`objects.ccenter.teams.strategies.${kebabToCamel(name)}`);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
