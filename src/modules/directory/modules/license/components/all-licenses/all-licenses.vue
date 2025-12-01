<template>
  <div class="all-licenses content-wrapper">
    <license-popup
      :shown="isLicensePopup"
      @close="closeLicensePopup"
    />
    <license-users-popup
      v-if="isLicenseUsersPopup"
      :namespace="namespace"
      @close="closeLicenseUsersPopup"
    />
    <header class="content-header">
      <h3 class="content-title">
        <!--        {{ $t('objects.directory.license.allLicenses') }}-->
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
          <adm-item-link
            v-if="hasCreateAccess"
            id="new"
            :route-name="LicencesRouteNames.ALL">
            <wt-icon-action
              action="add"
            />
          </adm-item-link>
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
      class="table-wrapper"
    >
      <wt-table
        :data="dataList"
        :grid-actions="false"
        :headers="headers"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template #id="{ item }">
          <wt-copy-action
            :value="item.id"
          />
        </template>
        <template #product="{ item }">
          <div class="all-licenses__product-cell">
            <wt-icon
              icon="license"
              icon-prefix="adm"
            />
            {{ item.product }}
          </div>
        </template>

        <template #valid-from="{ item }">
          {{ prettifyDate(item.notBefore) }}
        </template>

        <template #valid-till="{ item }">
          {{ prettifyDate(item.notAfter) }}
        </template>

        <template #used="{ item }">
          <adm-item-link
            :id="item.id"
            :route-name="LicencesRouteNames.ALL"
          >
            <wt-icon
              icon="license-users"
              icon-prefix="adm"
            />
            {{ item.limit - item.remain }}
          </adm-item-link>
        </template>

        <template #competitive="{ item }">
          {{ item.competitive ? $t('reusable.true') : '' }}
        </template>

        <template #status="{ item }">
          <wt-chip
            :color="statusColor(item.notAfter)"
            class="license-status"
          >
            {{ statusText(item.notAfter) }}
          </wt-chip>
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
  </div>
</template>

<script>
import { FormatDateMode } from '@webitel/flow-ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils'

import { useDummy } from '../../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../../app/router/_internals/RouteNames.enum';
import LicenseUsersPopup from '../../modules/license-users/components/license-users-popup.vue';
import LicencesRouteNames from '../../router/_internals/LicencesRouteNames.enum.js';
import LicensePopup from './license-popup.vue';

const namespace = 'directory/license';

export default {
  name: 'AllLicenses',
  components: { LicensePopup, LicenseUsersPopup },
  mixins: [tableComponentMixin],
  setup() {
    const { dummy } = useDummy({ namespace });
    return { dummy };
  },
  data: () => ({
    namespace,
    isLicensePopup: false,
    isLicenseUsersPopup: false,
    LicencesRouteNames,
    routeName: RouteNames.LICENSE,
  }),
  computed: {
    licenseId() {
      return this.$route.params.id;
    },
  },
  watch: {
    licenseId: {
     async handler(value) {
        if(value === 'new') {
          this.openLicensePopup();
        } else if (value) {
          this.openLicenseUsersPopup();
        }
      },
      immediate: true,
    },
  },
  methods: {
    openLicensePopup() {
      this.isLicensePopup = true;
    },
    closeLicensePopup() {
      this.$router.go(-1); // remove license id
      this.isLicensePopup = false;
    },
    openLicenseUsersPopup() {
      this.isLicenseUsersPopup = true;
    },
    closeLicenseUsersPopup() {
      this.$router.go(-1);
      this.isLicenseUsersPopup = false;
    },

    prettifyDate(date) {
      return formatDate(+date, FormatDateMode.DATE);
    },

    statusText(endDate) {
      const daysLeft = Math.ceil((endDate - Date.now()) / 1000 / 60 / 60 / 24);
      if (daysLeft <= 0) return this.$t('objects.directory.license.daysToExpire.0');
      if (daysLeft < 30) return this.$t('objects.directory.license.daysToExpire.30');
      if (daysLeft < 90) return this.$t('objects.directory.license.daysToExpire.90');
      return daysLeft + this.$t('objects.directory.license.daysToExpire.days');
    },

    statusColor(endDate) {
      const daysLeft = Math.ceil((endDate - Date.now()) / 1000 / 60 / 60 / 24);
      if (daysLeft <= 0) return 'error';
      if (daysLeft < 30) return 'warning';
      if (daysLeft < 90) return 'success';
      return 'success';
    },
  },
};
</script>

<style lang="scss" scoped>
.all-licenses__product-cell {
  display: flex;
  align-items: center;

  .wt-icon {
    margin-right: var(--spacing-2xs);
  }
}

.wt-item-link .wt-icon {
  margin-right: var(--spacing-2xs);
}

.license-status {
  align-self: flex-end;
  width: 93px;
  text-align: center;
}
</style>
