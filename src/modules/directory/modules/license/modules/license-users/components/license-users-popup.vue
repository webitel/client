<template>
  <wt-popup
    v-bind="$attrs"
    size="md"
    overflow
    @close="close"
  >
    <template #header>
      <h3 class="license-users-popup__title">
        <wt-icon
          icon="license"
          icon-prefix="adm"
          size="lg"
        />
        {{ license.product }}
      </h3>
    </template>
    <template #main>
      <wt-search-bar
        :value="search"
        debounce
        @enter="loadList"
        @input="setSearch"
        @search="loadList"
      />

      <wt-loader v-show="!isLoaded" />
      <div
        v-show="isLoaded"
        class="table-section__table-wrapper"
      >
        <div class="table-wrapper__scroll-wrapper">
          <wt-table
            :data="dataList"
            :grid-actions="false"
            :headers="headers"
            :selectable="false"
            sortable
            @sort="sort"
          >
            <template #domain="{ item }">
              <div v-if="item.domain">
                {{ item.domain.name }}
              </div>
            </template>
            <template #name="{ item }">
              <adm-item-link
                v-if="item.user"
                :id="item.user.id"
                :route-name="RouteNames.USERS"
              >
                {{ item.user.name }}
              </adm-item-link>
            </template>
            <template #used="{ item }">
              <user-logout-control
                :item="item"
                @logout="logoutUser"
              />
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
        />
      </div>
    </template>
  </wt-popup>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import resetOnDestroyMixin from '../../../../../../../app/mixins/baseMixins/resetOnDestroyMixin/resetOnDestroyMixin';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import UserLogoutControl from './user-logout-control.vue';

export default {
	name: 'LicenseUsersPopup',
	components: {
		UserLogoutControl,
	},
	mixins: [
		resetOnDestroyMixin,
		openedObjectTableTabMixin,
	],
	data: () => ({
		subNamespace: 'licenseUsers',
	}),
	computed: {
		...mapState({
			license(state) {
				return (
					getNamespacedState(state, this.namespace).dataList.find(
						({ id }) => id === this.parentId,
					) || {}
				);
			},
		}),
	},
	methods: {
		...mapActions({
			setId(dispatch, payload) {
				return dispatch(`${this.namespace}/SET_ITEM_ID`, payload);
			},
			logoutUser(dispatch, payload) {
				return dispatch(
					`${this.namespace}/${this.subNamespace}/LOGOUT_USER`,
					payload,
				);
			},
			resetState(dispatch, payload) {
				return dispatch(
					`${this.namespace}/${this.subNamespace}/RESET_STATE`,
					payload,
				);
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

<style
  lang="scss"
  scoped
>
.license-users-popup__title {
  display: flex;
  align-items: center;
  justify-content: center;

  .wt-icon {
    margin-right: var(--spacing-sm);
  }
}

.wt-search-bar {
  margin: var(--spacing-sm) 0;
}

.table-section__table-wrapper {
  max-height: 60vh;
}
</style>
