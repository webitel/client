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
import { maxLength, maxValue, minValue, required } from '@vuelidate/validators';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import WorkingConditionsRouteNames from '../router/_internals/WorkingConditionsRouteNames.enum.js';
import General from './opened-working-condition-general.vue';

export default {
	name: 'OpenedWorkingCondition',
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
		namespace: 'lookups/workingConditions',
		routeName: RouteNames.WORKING_CONDITIONS,
	}),
	validations: {
		itemInstance: {
			name: {
				required,
				maxLength: maxLength(250),
			},
			pauseTemplate: {
				required,
			},
			pauseDuration: {
				minValue: minValue(0),
				maxValue: maxValue(1440),
			},
			daysOff: {
				minValue: minValue(0),
				maxValue: maxValue(365),
			},
			sickLeaves: {
				minValue: minValue(0),
				maxValue: maxValue(365),
			},
			vacation: {
				minValue: minValue(0),
				maxValue: maxValue(365),
			},
			workdayPerMonth: {
				minValue: minValue(0),
				maxValue: maxValue(31),
			},
			workdayHours: {
				minValue: minValue(0),
				maxValue: maxValue(24),
			},
		},
	},
	computed: {
		tabs() {
			const tabs = [
				{
					text: this.$t('objects.general'),
					value: 'general',
					pathName: WorkingConditionsRouteNames.GENERAL,
				},
			];
			return tabs;
		},

		path() {
			const baseUrl = '/lookups/working-conditions';
			return [
				{
					name: this.$t('objects.lookups.lookups'),
				},
				{
					name: this.$t('objects.lookups.workingConditions.workingConditions'),
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
