<template>
  <wt-error-page
    type="404"
    @back="router.replace(RoutePaths.StartPage)"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import RoutePaths from '../router/_internals/RoutePaths';

const router = useRouter();
</script>
