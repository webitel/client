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
import { maxValue, minValue, required } from '@vuelidate/validators';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import Numbers from '../modules/display/components/opened-resource-numbers.vue';
import ResourcesRouteNames from '../router/_internals/ResourcesRouteNames.enum.js';
import Failure from './opened-resource-failure.vue';
import General from './opened-resource-general.vue';

export default {
	name: 'OpenedResource',
	components: {
		General,
		Numbers,
		Failure,
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
		namespace: 'ccenter/res',
		routeName: RouteNames.RESOURCES,
		permissionsTabPathName: ResourcesRouteNames.PERMISSIONS,
	}),
	validations: {
		itemInstance: {
			name: {
				required,
			},
			gateway: {
				required,
			},
			cps: {
				required,
				minValue: minValue(-1),
				maxValue: maxValue(1000),
			},
			limit: {
				required,
				minValue: minValue(-1),
				maxValue: maxValue(1000),
			},
			maxErrors: {
				required,
			},
			// numberList: {
			//     requiredArrayValue
			// }
		},
	},

	computed: {
		tabs() {
			const tabs = [
				{
					text: this.$t('objects.general'),
					value: 'general',
					pathName: ResourcesRouteNames.GENERAL,
				},
				{
					text: this.$t('objects.ccenter.res.numbers', 2),
					value: 'numbers',
					pathName: ResourcesRouteNames.NUMBERS,
				},
				{
					text: this.$t('objects.ccenter.res.failure'),
					value: 'failure',
					pathName: ResourcesRouteNames.FAILURE,
				},
			];

			if (this.id) tabs.push(this.permissionsTab);
			return tabs;
		},

		path() {
			const baseUrl = '/contact-center/resources';
			return [
				{
					name: this.$t('objects.ccenter.ccenter'),
				},
				{
					name: this.$t('objects.ccenter.res.res', 2),
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
