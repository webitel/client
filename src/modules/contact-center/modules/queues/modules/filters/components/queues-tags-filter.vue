<template>
  <wt-multi-select
    :label="label"
    :search-method="search"
    :data-key="filterSchema.storedProp"
    :model-value="filterSchema.value"
		chips-view
    class="queues-tags-filter"
    option-label="name"
    v-bind="$attrs"
    @update:model-value="handleInput"
    @reset="setValueToQuery({ value, filterQuery, storedProp: filterSchema.storedProp })"
  />
</template>

<script>
import apiFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/apiFilterMixin';

export default {
	name: 'QueuesTagsFilter',
	mixins: [
		apiFilterMixin,
	],
	data: () => ({
		filterQuery: 'tags',
	}),
	methods: {
		handleInput(value) {
			this.setValue({
				filter: this.filterQuery,
				value,
			});
			this.setValueToQuery({
				value,
				filterQuery: this.filterQuery,
				storedProp: this.filterSchema.storedProp,
			});
		},
		search(params) {
			return this.filterSchema.search(params);
		},
		fetchSelected(tags) {
			return tags.map((name) => ({
				name,
			}));
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
