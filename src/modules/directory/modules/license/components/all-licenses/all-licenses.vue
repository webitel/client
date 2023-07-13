<template>
  <div class="all-licenses content-wrapper">
    <license-popup
      v-if="isLicensePopup"
      @close="isLicensePopup = false"
    ></license-popup>
    <license-users-popup
      v-if="isLicenseUsersPopup"
      :namespace="namespace"
      @close="closeLicenseUsersPopup"
    ></license-users-popup>
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
        ></wt-search-bar>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        >
          <wt-icon-action
            v-if="hasCreateAccess"
            action="add"
            @click="isLicensePopup = true"
          ></wt-icon-action>
        </wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :text="dummy.text && $t(dummy.text)"
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
        <template v-slot:id="{ item }">
          <wt-copy-action
            :value="item.id"
          ></wt-copy-action>
        </template>
        <template v-slot:product="{ item }">
          <div class="all-licenses__product-cell">
            <wt-icon
              icon="license"
              icon-prefix="adm"
            ></wt-icon>
            {{ item.product }}
          </div>
        </template>

        <template v-slot:valid-from="{ item }">
          {{ prettifyDate(item.notBefore) }}
        </template>

        <template v-slot:valid-till="{ item }">
          {{ prettifyDate(item.notAfter) }}
        </template>

        <template v-slot:used="{ item }">
          <wt-item-link
            :link="editLink(item)"
            class="name-link"
          ><wt-icon
              icon="license-users"
              icon-prefix="adm"
            ></wt-icon>
            {{ item.limit - item.remain }}
          </wt-item-link>
        </template>

        <template v-slot:competitive="{ item }">
          {{ item.competitive ? $t('reusable.true') : '' }}
        </template>

        <template v-slot:status="{ item }">
          <wt-chip :class="statusClass(item.notAfter)" class="license-status">
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
      ></wt-pagination>
    </div>
  </div>
</template>

<script>
import tableComponentMixin from '../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../../app/router/_internals/RouteNames.enum';
import LicenseUsersPopup from '../../modules/license-users/components/license-users-popup.vue';
import LicensePopup from './license-popup.vue';
import { useDummy } from '../../../../../../app/composables/useDummy';

const namespace = 'directory/license';

export default {
  name: 'all-licenses',
  mixins: [tableComponentMixin],
  components: { LicensePopup, LicenseUsersPopup },
  data: () => ({
    namespace,
    isLicensePopup: false,
    routeName: RouteNames.LICENSE,
  }),
  setup() {
    const { dummy } = useDummy({ namespace });
    return { dummy };
  },
  computed: {
    isLicenseUsersPopup() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    closeLicenseUsersPopup() {
      this.$router.push({ name: this.routeName }); // remove license id
    },

    prettifyDate(date) {
      return new Date(+date).toLocaleDateString();
    },

    statusText(endDate) {
      const daysLeft = Math.ceil((endDate - Date.now()) / 1000 / 60 / 60 / 24);
      if (daysLeft <= 0) return this.$t('objects.directory.license.daysToExpire.0');
      if (daysLeft < 30) return this.$t('objects.directory.license.daysToExpire.30');
      if (daysLeft < 90) return this.$t('objects.directory.license.daysToExpire.90');
      return daysLeft + this.$t('objects.directory.license.daysToExpire.days');
    },

    statusClass(endDate) {
      const daysLeft = Math.ceil((endDate - Date.now()) / 1000 / 60 / 60 / 24);
      if (daysLeft <= 0) return 'days0';
      if (daysLeft < 30) return 'days30';
      if (daysLeft < 90) return 'days90';
      return 'valid';
    },
  },
};
</script>

<style lang="scss" scoped>
.all-licenses {
  --license--valid: rgba(255, 234, 0, 0.3);
  --license--90: rgba(255, 234, 0, 0.3);
  --license--30: rgba(255, 68, 68, 0.3);
  --license--0: rgba(0, 0, 0, 0.1);
}

.all-licenses__product-cell {
  display: flex;
  align-items: center;

  .wt-icon {
    margin-right: var(--spacing-2xs);
  }
}

.name-link .wt-icon {
  margin-right: var(--spacing-2xs);
}

.license-status {
  align-self: flex-end;
  width: 93px;
  text-align: center;

  &.valid {
    background: var(--license--valid);
  }

  &.days90 {
    background: var(--license--90);
  }

  &.days30 {
    background: var(--license--30);
  }

  &.days0 {
    background: var(--license--0);
  }
}
</style>
