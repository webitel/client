<template>
  <wt-tags-input
    :close-on-select="filterSchema.closeOnSelect"
    :label="label"
    :multiple="filterSchema.multiple"
    :search-method="search"
    :track-by="filterSchema.storedProp"
    :value="filterSchema.value"
    class="queues-tags-filter"
    option-label="name"
    v-bind="$attrs"
    @input="handleInput"
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
