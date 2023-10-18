<template>
  <wt-filters-panel-wrapper @reset="resetFilters">
    <flow-tags-filter
      :namespace="namespace"
    ></flow-tags-filter>
    <flow-type-filter
      :namespace="namespace"
    ></flow-type-filter>
  </wt-filters-panel-wrapper>
</template>

<script>
import { mapActions } from 'vuex';
import FlowTagsFilter from './flow-tags-filter.vue';
import FlowTypeFilter from './flow-type-filter.vue';

export default {
  name: 'the-flow-filters',
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
      this.$router.push({ query: null });
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
