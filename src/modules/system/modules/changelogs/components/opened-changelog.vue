<template>
  <wt-page-wrapper :actions-panel="!!currentTab.filters">
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

    <template #actions-panel>
      <component
        :is="currentTab.filters"
        :namespace="currentTab.filtersNamespace"
      />
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
import { minValue, required } from '@vuelidate/validators';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import Logs from '../modules/logs/components/opened-changelog-logs.vue';
import LogsFilters from '../modules/logs/modules/filters/components/opened-changelog-logs-filters.vue';
import ChangelogsRouteNames from '../router/_internals/ChangelogsRouteNames.enum.js';
import General from './opened-changelog-general.vue';

export default {
	name: 'OpenedChangelog',
	components: {
		General,
		Logs,
		LogsFilters,
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
		namespace: 'system/changelogs',
	}),
	validations: {
		itemInstance: {
			object: {
				required,
			},
			// storage: { required },
			daysToStore: {
				required,
				minValue: minValue(1),
			},
			// period: { required, minValue: minValue(1) },
		},
	},

	computed: {
		tabs() {
			const tabs = [
				{
					text: this.$t('objects.general'),
					value: 'general',
					pathName: ChangelogsRouteNames.GENERAL,
				},
			];
			const logs = {
				text: this.$t('objects.system.changelogs.logs.logs', 2),
				value: 'logs',
				filters: 'logs-filters',
				filtersNamespace: `${this.namespace}/logs/filters`,
				pathName: ChangelogsRouteNames.LOGS,
			};
			if (this.id) tabs.push(logs);
			return tabs;
		},

		path() {
			const baseUrl = '/system/changelogs';
			return [
				{
					name: this.$t('objects.system.system'),
				},
				{
					name: this.$t('objects.system.changelogs.changelogs', 1),
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
	mounted() {
		// override breadcrumbMixin
		const unwatch = this.$watch('itemInstance.object', () => {
			this.setPathName();
			unwatch();
		});
	},
	methods: {
		setPathName() {
			this.pathName = this.itemInstance.object.name;
		},
		close() {
			this.$router.push(`/${this.namespace}`);
		},
	},
};
</script>

<style scoped></style>
