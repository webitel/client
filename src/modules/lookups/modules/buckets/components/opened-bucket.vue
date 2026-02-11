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
import BucketsRouteNames from '../router/_internals/BucketsRouteNames.enum.js';
import General from './opened-bucket-general.vue';

export default {
	name: 'OpenedBucket',
	components: {
		General,
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
		namespace: 'lookups/buckets',
		routeName: RouteNames.BUCKETS,
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
					pathName: BucketsRouteNames.GENERAL,
				},
			];
			return tabs;
		},

		path() {
			const baseUrl = '/lookups/buckets';
			return [
				{
					name: this.$t('objects.lookups.lookups'),
				},
				{
					name: this.$t('objects.lookups.buckets.buckets', 2),
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

<style scoped></style>
