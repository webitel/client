<template>
  <wt-filters-panel-wrapper @reset="resetFilters">
    <queues-tags-filter
      :namespace="namespace"
    />
    <component
      class="queues-abstract-filter"
      :is="`abstract-${filter.type}-filter`"
      v-for="(filter) of filters"
      :key="filter.filterQuery"
      :filter-query="filter.filterQuery"
      :namespace="namespace"
    />
  </wt-filters-panel-wrapper>
</template>

<script>
import AbstractEnumFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-enum-filter.vue';
import { mapActions } from 'vuex';
import AbstractApiFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-api-filter.vue';
import QueuesTagsFilter from './queues-tags-filter.vue';
export default {
  name: 'TheQueuesFilters',
  components: {
    QueuesTagsFilter,
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
      { type: 'api', filterQuery: 'team' },
      { type: 'enum', filterQuery: 'queueType' },
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
.queues-abstract-filter, .queues-tags-filter {
  grid-column: span 2;
}
</style>
