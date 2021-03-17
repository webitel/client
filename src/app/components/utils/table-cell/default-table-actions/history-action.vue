<template>
  <wt-icon-btn
    class="table-action"
    icon="history"
    :tooltip="$t('iconHints.history')"
    tooltip-position="left"
    @click="$emit('click')"
  ></wt-icon-btn>
</template>

<script>
export default {
  name: 'history-action',
};
</script>

<style scoped>

</style>
