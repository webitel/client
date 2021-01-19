<template>
  <wt-icon-btn
    class="table-action"
    icon="edit"
    :tooltip="$t('iconHints.edit')"
    tooltip-position="left"
    @click="$emit('click')"
  ></wt-icon-btn>
</template>

<script>
export default {
  name: 'edit-action',
};
</script>

<style scoped>

</style>
