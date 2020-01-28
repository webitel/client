<template>
<!--  :class="$i18n.locale" root element class to control fonts on each locale  -->
    <router-view :class="$i18n.locale"></router-view>
</template>

<script>
import { getSession } from './api/auth/auth';

export default {
  name: 'app',
  created() {
    getSession();
  },
};
</script>

<style>

</style>
