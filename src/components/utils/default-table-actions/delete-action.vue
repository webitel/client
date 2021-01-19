<template>
  <wt-icon-btn
    class="table-action"
    icon="bucket"
    :tooltip="$t('iconHints.delete')"
    tooltip-position="left"
    @click="$emit('click')"
  ></wt-icon-btn>
</template>

<script>
export default {
  name: 'delete-action',
};
</script>

<style scoped>

</style>
