<template>
  <div class="settings-wrapper-column">
    <notifications-sounds-section />
    <ringtones-section />
  </div>
  <div class="settings-wrapper-column">
    <ringtone-volume-control-section />
  </div>
</template>

<script setup lang="ts">
import NotificationsSoundsSection from './settings-sections/notifications-section/notifications-sounds-section.vue';
import RingtoneVolumeControlSection from './settings-sections/ringtone-volume-control-section.vue';
import RingtonesSection from './settings-sections/ringtones-section.vue';
</script>

<style lang="scss" scoped>
.settings-wrapper-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacing-sm);
}
</style>