<template>
  <wt-filters-panel-wrapper @reset="resetFilters">
    <queues-tags-filter
      :namespace="namespace"
    />
    <component
      :is="`abstract-${filter.type}-filter`"
      v-for="(filter) of filters"
      :key="filter.filterQuery"
      :filter-query="filter.filterQuery"
      :namespace="namespace"
      class="queues-abstract-filter"
    />
  </wt-filters-panel-wrapper>
</template>

<script>
import AbstractApiFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-api-filter.vue';
import AbstractEnumFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-enum-filter.vue';
import { mapActions } from 'vuex';

import QueuesTagsFilter from './queues-tags-filter.vue';

export default {
	name: 'TheQueuesFilters',
	components: {
		QueuesTagsFilter,
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
				type: 'api',
				filterQuery: 'team',
			},
			{
				type: 'enum',
				filterQuery: 'queueType',
			},
		],
	}),
	methods: {
		...mapActions({
			resetFilterValues(dispatch, payload) {
				return dispatch(`${this.namespace}/RESET_FILTERS`, payload);
			},
		}),
		/**
		 * @author @Oleksandr Palonnyi
		 *
		 * Preserve `type` query param — it's passed to the create-item page and must survive unmount.
		 * Pushing `query: null` here would wipe the param after the router has already set it
		 * for the next route.
		 *
		 * [WTEL-9657](https://webitel.atlassian.net/browse/WTEL-9657)
		 * */
		resetFilters() {
			this.$router.push({
				query: {
					type: this.$route.query.type,
				},
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
