<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        v-bind="$attrs"
        class="table-action"
        icon="edit"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
      {{ $t('iconHints.edit') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'edit-action',
};
</script>

<style scoped>

</style>
