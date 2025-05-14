<template>
  <div class="notifications-sound-state">
    <p>{{ props.title }}</p>
    <wt-switcher
      :value="notificationState"
      @change="changeState"
    />
  </div>
</template>
<script setup lang="ts">

import {ref} from 'vue';

const props = defineProps<{
  notificationType: string,
  title: string,
}>()


const notificationState = ref<boolean>(!!localStorage.getItem(`settings/${props.notificationType}`));

function changeState(value: boolean) {
  value
    ? localStorage.setItem(`settings/${props.notificationType}`, 'true')
    : localStorage.removeItem(`settings/${props.notificationType}`);
  notificationState.value = value;
};

</script>

<style lang="scss" scoped>
.notifications-sound-state {
  display: flex;
  justify-content: space-between;
}
</style>
