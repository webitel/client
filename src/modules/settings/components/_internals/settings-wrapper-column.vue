<template>
  <div class="settings-wrapper-column">
    <slot />
  </div>
</template>

<style scoped>
.settings-wrapper-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacing-sm);
}
</style>