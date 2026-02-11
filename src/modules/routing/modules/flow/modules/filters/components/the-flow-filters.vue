<template>
  <wt-filters-panel-wrapper :table-action-icons="['filter-reset']" @reset="resetFilters">
    <flow-tags-filter
      :namespace="namespace"
    />
    <flow-type-filter
      :namespace="namespace"
    />
  </wt-filters-panel-wrapper>
</template>

<script>
import { mapActions } from 'vuex';

import FlowTagsFilter from './flow-tags-filter.vue';
import FlowTypeFilter from './flow-type-filter.vue';

export default {
	name: 'TheFlowFilters',
	components: {
		FlowTagsFilter,
		FlowTypeFilter,
	},
	props: {
		namespace: {
			type: String,
			required: true,
		},
	},
	data: () => ({}),
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
};
</script>

<style lang="scss" scoped>
.flow-tags-filter {
  grid-column: 1 / 3;
}

.flow-type-filter {
  grid-column: 3 / 5;
}
</style>
