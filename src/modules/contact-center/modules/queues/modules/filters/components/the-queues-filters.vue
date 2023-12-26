<template>
  <wt-filters-panel-wrapper @reset="resetFilters">
    <component
      :is="`abstract-${filter.type}-filter`"
      v-for="(filter) of filters"
      :key="filter.filterQuery"
      :filter-query="filter.filterQuery"
      :namespace="namespace"
    ></component>
  </wt-filters-panel-wrapper>
</template>

<script>
import AbstractEnumFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-enum-filter.vue';
import { mapActions } from 'vuex';
import AbstractApiFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-api-filter.vue';
export default {
  name: 'TheQueuesFilters',
  components: {
    AbstractApiFilter,
    AbstractEnumFilter
  },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    filters: [
      // { type: 'api', filterQuery: 'team' },
      { type: 'enum', filterQuery: 'type' },
    ],
  }),
  methods: {
    ...mapActions({
      resetFilterValues(dispatch, payload) {
        return dispatch(`${this.namespace}/RESET_FILTERS`, payload);
      },
    }),
    resetFilters() {
      this.$router.push({ query: null });
      this.resetFilterValues();
    },
  },
  unmounted() {
    this.resetFilters();
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
