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
          <h3 class="content-title">{{ $t('objects.permissions.allRoles') }}</h3>
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
            <template slot="description" slot-scope="{ item }">
              {{ item.description }}
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
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'the-roles',
  mixins: [tableComponentMixin],
  data: () => ({
    namespace: 'permissions/roles',
    routeName: RouteNames.ROLES,
  }),
  computed: {
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'description', text: this.$t('objects.description') },
      ];
    },
    path() {
      return [
        { name: this.$t('objects.permissions.permissions') },
        { name: this.$tc('objects.permissions.permissionsRole', 2), route: '/permissions/roles' },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>