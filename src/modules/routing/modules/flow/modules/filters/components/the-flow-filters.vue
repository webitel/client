<template>
  <wt-filters-panel-wrapper @reset="resetFilters">
    <flow-type-filter
      :namespace="namespace"
    ></flow-type-filter>
  </wt-filters-panel-wrapper>
</template>

<script>
import { mapActions } from 'vuex';
import FlowTypeFilter from './flow-type-filter.vue';

export default {
  name: 'the-flow-filters',
  components: {
    FlowTypeFilter,
  },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  data: () => ({
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
};
</script>

<style lang="scss" scoped>

</style>
