<template>
  <div class="settings-switcher-row">
    <slot name="label"></slot>
    <wt-switcher
      :model-value="model"
      @update:model-value="model = $event"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<style lang="scss" scoped>
.settings-switcher-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 