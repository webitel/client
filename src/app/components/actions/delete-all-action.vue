<template>
  <div class="delete-all-action">
    <wt-icon-btn
      v-tooltip="actionPanelDeleteTooltip"
      class="icon-action"
      icon="bucket"
      v-bind="$attrs"
      @click="$emit('click')"
    />
  </div>
</template>

<script>
export default {
  name: 'DeleteAllAction',
  props: {
    selectedCount: {
      type: Number,
    },
  },
  computed: {
    actionPanelDeleteTooltip() {
      return this.selectedCount
        ? this.$t('iconHints.deleteSelected', {
            count: this.selectedCount,
          })
        : this.$t('iconHints.deleteAll');
    },
  },
};
</script>

<style lang="scss" scoped>
.delete-all-action {
  line-height: 0;
}
</style>
