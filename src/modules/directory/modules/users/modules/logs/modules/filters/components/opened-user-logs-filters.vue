<template>
  <wt-filters-panel-wrapper @reset="resetFilters">
    <component
      :is="`abstract-${filter.type}-filter`"
      v-for="(filter, key) of filters"
      :key="key"
      :filter-query="filter.filterQuery"
      :namespace="namespace"
      class="history-filters__filter"
    />
    <filter-datetime
      :label="`${
        $t('reusable.modifiedAt')}: ${$t('reusable.from').toLowerCase()
      }`"
      :namespace="namespace"
      filter-query="from"
    />
    <filter-datetime
      :label="`${
        $t('reusable.modifiedAt')}: ${$t('reusable.to').toLowerCase()
      }`"
      :namespace="namespace"
      filter-query="to"
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
	name: 'OpenedUserLogsFilters',
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
				filterQuery: 'action',
			},
			{
				type: 'api',
				filterQuery: 'object',
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
