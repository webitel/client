<template>
  <!-- [Claude] back goes to the hub: without admin access the start page would lead here again -->
  <wt-error-page
    type="403"
    @back="router.replace({ name: RouteNames.ApplicationHub })"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { RouteNames } from '../router/_internals/RouteNames.enum';

const router = useRouter();
</script>
