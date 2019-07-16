<template>
    <v-app dark>
        <router-view></router-view>
    </v-app>
</template>

<script>
import { getSession } from './api/auth';

export default {
  name: 'app',
  created() {
    getSession();
  },
};
</script>

<style>

</style>
