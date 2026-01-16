<template>
  <section class="settings-section-wrapper">
    <p class="settings-section-title typo-heading-4">
      <slot name="title" />
    </p>
    <div class="settings-section-content">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.settings-section-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-5);
}


.settings-section-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>