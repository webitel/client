<template>
  <div class="all-licenses content-wrapper">
    <license-popup
      v-if="isLicensePopup"
      @close="isLicensePopup = false"
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
          <wt-icon-action
            v-if="hasCreateAccess"
            action="add"
            @click="isLicensePopup = true"
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
          <wt-item-link
            :link="editLink(item)"
            class="name-link"
          >
            <wt-icon
              icon="license-users"
              icon-prefix="adm"
            />
            {{ item.limit - item.remain }}
          </wt-item-link>
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
import { useDummy } from '../../../../../../app/composables/useDummy';
import tableComponentMixin from '../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../../app/router/_internals/RouteNames.enum';
import LicenseUsersPopup from '../../modules/license-users/components/license-users-popup.vue';
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
    routeName: RouteNames.LICENSE,
  }),
  computed: {
    isLicenseUsersPopup() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    closeLicenseUsersPopup() {
      this.$router.push({
        name: this.routeName,
      }); // remove license id
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

.name-link .wt-icon {
  margin-right: var(--spacing-2xs);
}

.license-status {
  align-self: flex-end;
  width: 93px;
  text-align: center;
}
</style>
