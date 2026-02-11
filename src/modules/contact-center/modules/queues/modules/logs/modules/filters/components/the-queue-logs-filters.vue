<template>
  <wt-filters-panel-wrapper @reset="resetFilters">
    <filter-datetime
      :label="`${$t('objects.ccenter.queues.logs.joinedAt')}: ${$t('reusable.from')}`"
      :namespace="namespace"
      filter-query="joinedAtFrom"
    />
    <filter-datetime
      :label="`${$t('objects.ccenter.queues.logs.joinedAt')}: ${$t('reusable.to')}`"
      :namespace="namespace"
      filter-query="joinedAtTo"
    />
    <component
      :is="`abstract-${filter.type}-filter`"
      v-for="(filter, key) of filters"
      :key="key"
      :filter-query="filter.filterQuery"
      :namespace="namespace"
      class="history-filters__filter"
    />
    <filter-from-to
      :label="$t('objects.ccenter.queues.logs.duration')"
      :namespace="namespace"
      filter-query="duration"
    />
  </wt-filters-panel-wrapper>
</template>

<script>
import AbstractApiFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-api-filter.vue';
import AbstractEnumFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-enum-filter.vue';
import FilterDatetime from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-datetime.vue';
import FilterFromTo from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-from-to.vue';
import { mapActions } from 'vuex';

export default {
	name: 'TheQueueLogsFilters',
	components: {
		FilterDatetime,
		FilterFromTo,
		AbstractApiFilter,
		AbstractEnumFilter,
	},
	props: {
		namespace: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		filters: [
			{
				type: 'enum',
				filterQuery: 'result',
			},
			{
				type: 'api',
				filterQuery: 'agent',
			},
		],
	}),
	methods: {
		...mapActions({
			resetFilterValues(dispatch, payload) {
				return dispatch(`${this.namespace}/RESET_FILTERS`, payload);
			},
		}),
		resetFilters() {
			this.$router.push({
				query: null,
			});
			this.resetFilterValues();
		},
	},
	unmounted() {
		this.resetFilters();
	},
};
</script>

<style lang="scss" scoped>

</style>
