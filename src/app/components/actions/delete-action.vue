<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        v-bind="$attrs"
        class="table-action"
        icon="bucket"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
      {{ $t('iconHints.delete') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'delete-action',
};
</script>

<style scoped>

</style>
