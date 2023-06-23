<template>
  <div class="content-wrapper">
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
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :text="$t(dummy.text)"
      class="dummy-wrapper"
    ></wt-dummy>
    <div
      v-show="dataList.length && isLoaded"
      class="table-wrapper">
      <wt-table
        :data="dataList"
        :grid-actions="false"
        :headers="headers"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template v-slot:name="{ item }">
          <item-link
            :id="item.id"
            :route-name="RouteNames.USERS"
          >
            {{ item.name }}
          </item-link>
        </template>

        <template
          v-for="(license, key) of licenseHeaders"
          v-slot:[license.value]="{ item }"
        >
          <wt-checkbox
            :key="key"
            :disabled="!hasEditAccess"
            :selected="item.license[license.value]"
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
import { useDummy } from '../../../../../../../app/composables/useDummy';
import tableComponentMixin
  from '../../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';

const namespace = 'directory/license/users';

export default {
  name: 'licenses-by-user',
  mixins: [tableComponentMixin],
  data: () => ({
    staticHeaders: ['name'],
    namespace,
  }),
  setup() {
    const { dummy } = useDummy({ namespace });
    return { dummy };
  },
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
  },
};
</script>

<style lang="scss" scoped>
:deep(.wt-table__th) {
  word-break: normal;
}
</style>
