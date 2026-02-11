<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import Numbers from '../modules/numbers/components/opened-blacklist-numbers.vue';
import BlacklistRouteNames from '../router/_internals/BlacklistRouteNames.enum.js';
import General from './opened-blacklist-general.vue';

export default {
	name: 'OpenedBlacklist',
	components: {
		General,
		Numbers,
	},
	mixins: [
		openedObjectMixin,
	],

	setup: () => {
		const v$ = useVuelidate();
		const { hasSaveActionAccess } = useUserAccessControl();
		return {
			v$,
			hasSaveActionAccess,
		};
	},

	data: () => ({
		namespace: 'lookups/blacklists',
		routeName: RouteNames.BLACKLIST,
	}),
	validations: {
		itemInstance: {
			name: {
				required,
			},
		},
	},

	computed: {
		tabs() {
			const tabs = [
				{
					text: this.$t('objects.general'),
					value: 'general',
					pathName: BlacklistRouteNames.GENERAL,
				},
				{
					text: this.$t('objects.lookups.blacklist.number', 2),
					value: 'numbers',
					pathName: BlacklistRouteNames.NUMBERS,
				},
			];

			const permissions = {
				text: this.$t('objects.permissions.permissions', 2),
				value: 'permissions',
				pathName: BlacklistRouteNames.PERMISSIONS,
			};

			if (this.id) tabs.push(permissions);
			return tabs;
		},

		path() {
			const baseUrl = '/lookups/blacklist';
			return [
				{
					name: this.$t('objects.lookups.lookups'),
				},
				{
					name: this.$t('objects.lookups.blacklist.blacklist', 2),
					route: baseUrl,
				},
				{
					name: this.id ? this.pathName : this.$t('objects.new'),
					route: {
						name: this.currentTab.pathName,
						query: this.$route.query,
					},
				},
			];
		},
	},
};
</script>

<style
  lang="scss"
  scoped
></style>
