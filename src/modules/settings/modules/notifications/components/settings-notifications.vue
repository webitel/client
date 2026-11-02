<template>
  <div class="opened-card-tabs__tab">
    <settings-notifications-sounds />
    <settings-notifications-ringtone />
  </div>
  <div class="opened-card-tabs__tab">
    <settings-notifications-ringtone-volume />
  </div>
</template>

<script setup lang="ts">
import SettingsNotificationsRingtone from './_internals/settings-notifications-ringtone.vue';
import SettingsNotificationsRingtoneVolume from './_internals/settings-notifications-ringtone-volume.vue';
import SettingsNotificationsSounds from './_internals/settings-notifications-sounds.vue';
</script>