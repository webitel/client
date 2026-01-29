<template>
  <section class="table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        <!--        {{ $t('objects.user', 2) }}-->
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
          <wt-table-column-select
            :headers="headers"
            :static-headers="staticHeaders"
            @change="changeVisibleHeaders"
          />
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :dark-mode="darkMode"
      :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper"
    />
    <div
      v-show="dataList.length && isLoaded"
      class="table-section__table-wrapper"
    >
      <wt-table
        :data="dataList"
        :grid-actions="false"
        :headers="headers"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template #name="{ item }">
          <adm-item-link
            :id="item.id"
            :route-name="RouteNames.USERS"
          >
            {{ item.name }}
          </adm-item-link>
        </template>

        <template
          v-for="(license, key) of licenseHeaders"
          #[license.value]="{ item }"
        >
          <wt-checkbox
            :key="key"
            :selected="item.license[license.value]"
            :disabled="!hasEditAccess"
            @update:selected="toggleUserLicense({ user: item, license })"
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
import { mapActions } from 'vuex';

import { useDummy } from '../../../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';

const namespace = 'directory/license/users';

export default {
  name: 'LicensesByUser',
  mixins: [tableComponentMixin],
  setup() {
    const { dummy } = useDummy({ namespace });
    const { hasEditAccess } = useUserAccessControl({
      route: {
        name: `${RouteNames.USERS}-edit`,
      },
    });
    return {
      dummy,
      hasEditAccess,
    };
  },
  data: () => ({
    staticHeaders: ['name'],
    namespace,
  }),
  computed: {
    licenseHeaders() {
      return this.headers.slice(1); // except 1st column "name"
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

<style
  lang="scss"
  scoped
>
:deep(.wt-table th) {
  word-break: normal;
}
</style>
