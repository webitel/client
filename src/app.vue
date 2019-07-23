<template>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
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
