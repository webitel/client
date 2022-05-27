<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        v-bind="$attrs"
        class="table-action"
        icon="plus"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
      {{ $t('iconHints.add') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'add-action',
};
</script>

<style scoped>

</style>
