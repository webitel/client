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
        <router-view
          v-if="isPermissionsTab"
          v-slot="{ Component }"
        >
          <component
            v-if="Component"
            :is="Component"
            v-bind="permissionsStoreData"
          />
        </router-view>
        <component
          v-else
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
import { helpers, required } from '@vuelidate/validators';
import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNamesEnum from '../../../../../app/router/_internals/RouteNames.enum.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import {
	hourRange,
	requiredArrayValue,
	timerangeNotIntersect,
	timerangeStartLessThanEnd,
} from '../../../../../app/utils/validators';
import Resources from '../modules/resources/components/opened-resource-group-resources.vue';
import ResourcesGroupsRouteNames from '../router/_internals/ResourcesGroupsRouteNames.enum.js';
import { useResourceGroupsPermissionsStore } from '../stores/permissions/resourceGroupsPermissionsStore';
import General from './opened-resource-group-general.vue';
import Timerange from './opened-resource-group-timerange.vue';

export default {
	name: 'OpenedResourceGroup',
	components: {
		General,
		Resources,
		Timerange,
	},
	mixins: [
		openedObjectMixin,
	],

	setup: () => {
		const v$ = useVuelidate();
		const {
			hasSaveActionAccess,
			hasReadAccess,
			hasCreateAccess,
			hasUpdateAccess,
			hasDeleteAccess,
		} = useUserAccessControl();

		const { hasReadAccess: hasResourcesReadAccess } = useUserAccessControl(
			WtObject.Resource,
		);

		return {
			v$,
			hasSaveActionAccess,
			hasReadAccess,
			hasCreateAccess,
			hasUpdateAccess,
			hasDeleteAccess,
			hasResourcesReadAccess,
		};
	},
	data: () => ({
		namespace: 'ccenter/resGroups',
		routeName: RouteNames.RESOURCE_GROUPS,
		permissionsTabPathName: ResourcesGroupsRouteNames.PERMISSIONS,
	}),
	// by vuelidate
	validations() {
		const hourRangeWithMessage = helpers.withMessage(
			this.$t('validation.hourRange'),
			hourRange,
		);
		const timerangeStartLessThanEndWithMessage = helpers.withMessage(
			this.$t('validation.timerangeStartLessThanEnd'),
			timerangeStartLessThanEnd,
		);
		return {
			itemInstance: {
				name: {
					required,
				},
				communication: {
					required,
				},
				time: {
					requiredArrayValue,
					timerangeNotIntersect,
					$each: helpers.forEach({
						start: {
							hourRange: hourRangeWithMessage,
							timerangeStartLessThanEnd: timerangeStartLessThanEndWithMessage,
						},
						end: {
							hourRange: hourRangeWithMessage,
						},
					}),
				},
			},
		};
	},
	computed: {
		isPermissionsTab() {
			return this.$route.name === ResourcesGroupsRouteNames.PERMISSIONS;
		},

		permissionsStoreData() {
			return {
				store: useResourceGroupsPermissionsStore,
				access: {
					read: this.hasReadAccess,
					create: this.hasCreateAccess,
					update: this.hasUpdateAccess,
					delete: this.hasDeleteAccess,
				},
				parentId: this.$route.params.id,
			};
		},

		tabs() {
			const general = {
				text: this.$t('objects.general'),
				value: 'general',
				pathName: ResourcesGroupsRouteNames.GENERAL,
			};
			const resources = {
				text: this.$t('objects.ccenter.res.res', 2),
				value: 'resources',
				pathName: ResourcesGroupsRouteNames.RESOURCES,
			};
			const timerange = {
				text: this.$t('objects.ccenter.resGroups.timerange'),
				value: 'timerange',
				pathName: ResourcesGroupsRouteNames.TIME_RANGE,
			};
			const tabs = [
				general,
			];
			if (this.hasResourcesReadAccess) tabs.push(resources);
			tabs.push(timerange);
			if (this.id) tabs.push(this.permissionsTab);
			return tabs;
		},

		path() {
			const baseUrl = '/contact-center/resource-groups';
			return [
				{
					name: this.$t('objects.ccenter.ccenter'),
				},
				{
					name: this.$t('objects.ccenter.resGroups.resGroups', 2),
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
