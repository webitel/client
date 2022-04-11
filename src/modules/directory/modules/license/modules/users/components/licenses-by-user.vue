<template>
  <div>
    <header class="content-header">
      <h3 class="content-title">
<!--        {{ $tc('objects.directory.users.users', 2) }}-->
      </h3>
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
          <wt-table-column-select
            :headers="headers"
            :static-headers="staticHeaders"
            @change="changeVisibleHeaders"
          ></wt-table-column-select>
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :data="dataList"
        :grid-actions="false"
        :headers="headers"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template slot="name" slot-scope="{ item }">
          <item-link :link="itemLink(item)" target="_blank">
            {{ item.name }}
          </item-link>
        </template>

        <template
          v-for="(license, key) of licenseHeaders"
          :slot="license.value"
          slot-scope="{ item }"
        >
          <wt-checkbox
            :selected="item.license[license.value]"
            :key="key"
            :disabled="!hasEditAccess"
            @change="toggleUserLicense({ user: item, license })"
          ></wt-checkbox>
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
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import tableComponentMixin
  from '../../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';

export default {
  name: 'licenses-by-user',
  mixins: [tableComponentMixin],
  data: () => ({
    namespace: 'directory/license/users',
    staticHeaders: ['name'],
  }),
  computed: {
    licenseHeaders() {
      return this.headers.slice(1); // except 1st column "name"
    },
    hasEditAccess() {
      return this.$store.getters['userinfo/HAS_EDIT_ACCESS']({ route: { name: `${RouteNames.USERS}-edit` } });
    },
  },
  methods: {
    ...mapActions({
      toggleUserLicense(dispatch, payload) {
        return dispatch(`${this.namespace}/TOGGLE_USER_LICENSE`, payload);
      },
      setHeaders(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_HEADERS`, payload);
      },
    }),
    changeVisibleHeaders(headers) {
      this.setHeaders(headers);
    },
    itemLink({ id }) {
      return { name: `${RouteNames.USERS}-edit`, params: { id } };
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .wt-table__th {
  word-break: normal;
}
</style>
