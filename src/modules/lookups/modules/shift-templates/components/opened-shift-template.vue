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
import {
	helpers,
	maxLength,
	maxValue,
	minValue,
	required,
} from '@vuelidate/validators';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import { requiredArrayValue } from '../../../../../app/utils/validators.js';
import ShiftTemplatesRouteNames from '../router/_internals/ShiftTemplatesRouteNames.enum.js';
import General from './opened-shift-template-general.vue';
import Times from './opened-shift-template-times.vue';

export default {
	name: 'OpenedShiftTemplate',
	components: {
		General,
		Times,
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
		namespace: 'lookups/shiftTemplates',
		routeName: RouteNames.SHIFT_TEMPLATES,
	}),
	validations: {
		itemInstance: {
			name: {
				required,
				maxLength: maxLength(250),
			},
			times: {
				requiredArrayValue,
				$each: helpers.forEach({
					start: {
						required,
						minValue: minValue(0),
						maxValue: maxValue(1440),
					},
					end: {
						required,
						minValue: minValue(0),
						maxValue: maxValue(1440),
					},
					duration: {
						minValue: minValue(1),
					},
				}),
			},
		},
	},

	computed: {
		tabs() {
			const tabs = [
				{
					text: this.$t('objects.general'),
					value: 'general',
					pathName: ShiftTemplatesRouteNames.GENERAL,
				},
				{
					text: this.$t('objects.routing.chatGateways.templates.templates', 1),
					value: 'times',
					pathName: ShiftTemplatesRouteNames.TIMES,
				},
			];
			return tabs;
		},

		path() {
			const baseUrl = '/lookups/shift-templates';
			return [
				{
					name: this.$t('objects.lookups.lookups'),
				},
				{
					name: this.$t('objects.lookups.shiftTemplates.shiftTemplates', 2),
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
