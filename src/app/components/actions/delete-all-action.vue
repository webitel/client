<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        v-bind="$attrs"
        class="icon-action"
        icon="bucket"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ actionPanelDeleteTooltip }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'delete-all-action',
  props: {
    selectedCount: {
      type: Number,
    },
  },
  computed: {
    actionPanelDeleteTooltip() {
      return this.selectedCount
        ? this.$t('iconHints.deleteSelected', { count: this.selectedCount })
        : this.$t('iconHints.deleteAll');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
