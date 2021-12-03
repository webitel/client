<template>
  <wt-popup
    min-width="600"
    overflow
    @close="close"
  >
    <template slot="header">
      <h3 class="license-users-popup__title">
        <wt-icon
          icon="license"
          icon-prefix="adm"
          size="lg"
        ></wt-icon>
        {{ license.product }}
      </h3>
    </template>
    <template slot="main">
      <wt-search-bar
        :value="search"
        debounce
        @enter="loadList"
        @input="setSearch"
        @search="loadList"
      ></wt-search-bar>

      <wt-loader v-show="!isLoaded"></wt-loader>
      <div v-show="isLoaded" class="table-wrapper">
        <div class="table-wrapper__scroll-wrapper">
          <wt-table
            :data="dataList"
            :grid-actions="false"
            :headers="headers"
            :selectable="false"
            sortable
            @sort="sort"
          >
            <template slot="name" slot-scope="{ item }">
              <div v-if="item.user">
                {{ item.user.name }}
              </div>
            </template>
            <template slot="used" slot-scope="{ item }">
              <user-logout-control
                :item="item"
                @logout="logoutUser"
              ></user-logout-control>
            </template>
          </wt-table>
        </div>
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
    </template>
  </wt-popup>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import UserLogoutControl from './user-logout-control.vue';

export default {
  name: 'license-users-popup',
  mixins: [openedObjectTableTabMixin],
  components: { UserLogoutControl },
  data: () => ({
    subNamespace: 'licenseUsers',
  }),
  computed: {
    ...mapState({
      license(state) {
        return getNamespacedState(state, this.namespace)
          .dataList.find(({ id }) => id === this.parentId) || {};
      },
    }),
  },
  methods: {
    ...mapActions({
      setId(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_ID`, payload);
      },
      logoutUser(dispatch, payload) {
        return dispatch(`${this.namespace}/${this.subNamespace}/LOGOUT_USER`, payload);
      },
    }),
    async initTableView() {
      await this.setId(this.$route.params.id);
      if (this.setParentId) this.setParentId(this.parentId);
      this.loadList();
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.license-users-popup__title {
  display: flex;
  align-items: center;
  justify-content: center;

  .wt-icon {
    margin-right: var(--spacing--lg);
  }
}

.wt-search-bar {
  margin: var(--spacing--lg) 0;
}

.table-wrapper {
  max-height: 60vh;
}
</style>
