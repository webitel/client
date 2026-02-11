<template>
  <settings-wrapper-column>
    <notifications-sounds-section />
    <ringtones-section />
  </settings-wrapper-column>
  <settings-wrapper-column>
    <ringtone-volume-control-section />
  </settings-wrapper-column>
</template>

<script setup lang="ts">
import SettingsWrapperColumn from './_internals/settings-wrapper-column.vue';
import NotificationsSoundsSection from './settings-sections/notifications-section/notifications-sounds-section.vue';
import RingtoneVolumeControlSection from './settings-sections/ringtone-volume-control-section.vue';
import RingtonesSection from './settings-sections/ringtones-section.vue';
</script>