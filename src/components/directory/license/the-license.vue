<template>
  <wt-page-wrapper class="license" :actions-panel="false">
    <template slot="header">
      <object-header :hide-primary="true">
        {{ $t('objects.directory.directory') }} |
        {{ $t('objects.directory.license.license') }}
      </object-header>
    </template>
    <template slot="main">
      <license-popup
          v-if="isLicensePopup"
          @close="isLicensePopup = false"
      ></license-popup>
      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.directory.license.allLicenses') }}
          </h3>
          <div class="content-header__actions-wrap">
            <wt-search-bar
                :value="search"
                debounce
                @input="setSearch"
                @search="loadList"
                @enter="loadList"
            ></wt-search-bar>
            <wt-table-actions
                :icons="['refresh']"
                @input="tableActionsHandler"
            ></wt-table-actions>
            <wt-icon-btn
                class="icon-action"
                icon="plus"
                :tooltip="$t('iconHints.add')"
                @click="isLicensePopup = true"
            ></wt-icon-btn>
          </div>
        </header>

        <wt-loader v-show="!isLoaded"></wt-loader>
        <div class="table-wrapper" v-show="isLoaded">
          <wt-table
              :headers="headers"
              :data="dataList"
              :selectable="false"
              :grid-actions="false"
          >
            <template slot="id" slot-scope="{ item }">
              <div class="license__id-column">
                <wt-icon-btn
                    v-show="copiedId !== item.id"
                    class="license__id-column__icon-btn license__id-column__icon-btn--copy"
                    icon="copy"
                    :tooltip="$t('objects.copy')"
                    @click="copy(item.id)"
                ></wt-icon-btn>
                <wt-icon-btn
                    v-show="copiedId === item.id"
                    class="license__id-column__icon-btn license__id-column__icon-btn--tick"
                    icon="rounded-tick"
                    color="true"
                    :tooltip="$t('objects.copied')"
                ></wt-icon-btn>
              </div>
            </template>
            <template slot="product" slot-scope="{ item }">
              {{ item.product }}
            </template>

            <template slot="valid-from" slot-scope="{ item }">
              {{ prettifyDate(item.notBefore) }}
            </template>

            <template slot="valid-till" slot-scope="{ item }">
              {{ prettifyDate(item.notAfter) }}
            </template>

            <template slot="used" slot-scope="{ item }">
              {{ item.limit - item.remain }}
            </template>

            <template slot="limit" slot-scope="{ item }">
              {{ item.limit }}
            </template>

            <template slot="status" slot-scope="{ item }">
              <div class="license-status" :class="statusClass(item.notAfter)">
                {{ statusText(item.notAfter) }}
              </div>
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
import { mapActions, mapState } from 'vuex';
import copy from 'clipboard-copy';
import licensePopup from './license-popup.vue';
import tableComponentMixin from '../../../mixins/tableComponentMixin';
import tableActionsHandlerMixin from '../../../mixins/tableActionsMixin';

let copiedIdTimeout = null;

export default {
  name: 'the-license',
  mixins: [tableComponentMixin, tableActionsHandlerMixin],
  components: { licensePopup },
  data() {
    return {
      isLicensePopup: false,
      copiedId: null,
      headers: [
        { value: 'id', text: this.$t('objects.directory.license.licenseId'), width: '24px' },
        { value: 'product', text: this.$t('objects.directory.license.product') },
        { value: 'valid-from', text: this.$t('objects.directory.license.validFrom'), width: '150px' },
        { value: 'valid-till', text: this.$t('objects.directory.license.validTill') },
        { value: 'used', text: this.$t('objects.directory.license.used') },
        { value: 'limit', text: this.$t('objects.directory.license.limit') },
        { value: 'status', text: this.$t('objects.directory.license.status'), width: '120px' },
      ],
    };
  },
  computed: {
    ...mapState('directory/license', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
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


    ...mapActions('directory/license', {
      loadDataList: 'LOAD_DATA_LIST',
      setSize: 'SET_SIZE',
      setSearch: 'SET_SEARCH',
      nextPage: 'NEXT_PAGE',
      prevPage: 'PREV_PAGE',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/objects/table-page';

.license {
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
      display: block;
      top: 0;
      left: calc(100% + 10px);
      right: auto;
      overflow-wrap: normal;
      white-space: nowrap;
      transform: translateY(-10px);
    }

    &--tick {
      pointer-events: none;
      ::v-deep .wt-tooltip {
        opacity: 1;
      }
    }
  }
}

.license-status {
  text-align: center;
  align-self: flex-end;
  width: 93px;
  padding: 5px 8px 3px;
  border-radius: var(--border-radius);

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
