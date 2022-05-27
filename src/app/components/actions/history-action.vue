<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        v-bind="$attrs"
        class="table-action"
        icon="history"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
      {{ $t('iconHints.history') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'history-action',
};
</script>

<style scoped>

</style>
