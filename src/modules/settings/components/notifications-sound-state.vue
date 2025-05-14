<template>
  <div class="notifications-sound-state">
    <p>{{ props.title }}</p>
    <wt-switcher
      :value="isNotificationOn"
      @change="changeNotificationState"
    />
  </div>
</template>
<script setup lang="ts">

import {ref} from 'vue';

const props = defineProps<{
  notificationType: string,
  title: string,
}>()


const isNotificationOn = ref<boolean>(!!localStorage.getItem(`settings/${props.notificationType}`));

function changeNotificationState(value: boolean) {
  value
    ? localStorage.setItem(`settings/${props.notificationType}`, 'true')
    : localStorage.removeItem(`settings/${props.notificationType}`);
  isNotificationOn.value = value;
};

</script>

<style lang="scss" scoped>
.notifications-sound-state {
  display: flex;
  justify-content: space-between;
}
</style>
