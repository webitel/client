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
        class="opened-card-form"
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
          type="submit"
          hidden
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
import StoragePoliciesRouteNames from '../router/_internals/StoragePoliciesRouteNames.enum.js';
import General from './opened-storage-policy-general.vue';

export default {
	name: 'OpenedStoragePolicy',
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
		namespace: 'integrations/storagePolicies',
		routeName: RouteNames.STORAGE_POLICIES,
	}),
	validations: {
		itemInstance: {
			name: {
				required,
			},
			channels: {
				required,
			},
			mimeTypes: {
				required,
			},
		},
	},

	computed: {
		tabs() {
			return [
				{
					text: this.$t('objects.general'),
					value: 'general',
					pathName: StoragePoliciesRouteNames.GENERAL,
				},
			];
		},

		path() {
			const baseUrl = '/integrations/storage-policies';
			return [
				{
					name: this.$t('objects.integrations.integrations'),
				},
				{
					name: this.$t(
						'objects.integrations.storagePolicies.storagePolicies',
						2,
					),
					route: baseUrl,
				},
				{
					name: this.id ? this.pathName : this.$t('objects.new'),
					route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
				},
			];
		},
	},
};
</script>

<style scoped></style>
