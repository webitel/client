<template>
  <div class="all-licenses">
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
          <wt-icon-btn
            v-if="hasCreateAccess"
            :tooltip="$t('iconHints.add')"
            class="icon-action"
            icon="plus"
            @click="isLicensePopup = true"
          ></wt-icon-btn>
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
        <template slot="id" slot-scope="{ item }">
          <div class="license__id-column">
            <wt-icon-btn
              v-show="copiedId !== item.id"
              :tooltip="$t('objects.copy')"
              class="license__id-column__icon-btn license__id-column__icon-btn--copy"
              icon="copy"
              @click="copy(item.id)"
            ></wt-icon-btn>
            <wt-icon-btn
              v-show="copiedId === item.id"
              :tooltip="$t('objects.copied')"
              class="license__id-column__icon-btn license__id-column__icon-btn--tick"
              color="true"
              icon="done"
            ></wt-icon-btn>
          </div>
        </template>
        <template slot="product" slot-scope="{ item }">
          <div class="all-licenses__product-cell">
            <wt-icon
              icon="license"
              icon-prefix="adm"
            ></wt-icon>
            {{ item.product }}
          </div>
        </template>

        <template slot="valid-from" slot-scope="{ item }">
          {{ prettifyDate(item.notBefore) }}
        </template>

        <template slot="valid-till" slot-scope="{ item }">
          {{ prettifyDate(item.notAfter) }}
        </template>

        <template slot="used" slot-scope="{ item }">
          <item-link :link="itemLink(item)">
            <wt-icon
              icon="license-users"
              icon-prefix="adm"
            ></wt-icon>
            {{ item.limit - item.remain }}
          </item-link>
        </template>

        <template slot="competitive" slot-scope="{ item }">
          {{ item.competitive ? $t('reusable.true') : '' }}
        </template>

        <template slot="status" slot-scope="{ item }">
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
import copy from 'clipboard-copy';
import tableComponentMixin from '../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../../app/router/_internals/RouteNames.enum';
import LicenseUsersPopup from '../../modules/license-users/components/license-users-popup.vue';
import LicensePopup from './license-popup.vue';

let copiedIdTimeout = null;

export default {
  name: 'all-licenses',
  mixins: [tableComponentMixin],
  components: { LicensePopup, LicenseUsersPopup },
  data: () => ({
    namespace: 'directory/license',
    isLicensePopup: false,
    copiedId: null,
    routeName: RouteNames.LICENSE,
  }),
  computed: {
    isLicenseUsersPopup() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    async copy(id) {
      try {
        await copy(id);
        this.copiedId = id;
        if (copiedIdTimeout) window.clearTimeout(copiedIdTimeout);
        copiedIdTimeout = setTimeout(() => {
          this.copiedId = null;
        }, 1500);
      } catch (err) {
        throw err;
      }
    },

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

.license__id-column {
  display: flex;
  align-items: center;

  .license__id-column__icon-btn {
    ::v-deep .wt-tooltip {
      top: 0;
      right: auto;
      left: calc(100% + 10px);
      display: block;
      transform: translateY(-10px);
      white-space: nowrap;
      overflow-wrap: normal;
    }

    &--tick {
      pointer-events: none;

      ::v-deep .wt-tooltip {
        opacity: 1;
      }
    }
  }
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
