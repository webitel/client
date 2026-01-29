<template>
  <wt-navigation-menu
    :nav="nav"
    :icons="icons"
  />
</template>

<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia';

import { useNavStore } from '../stores/navStore';

const navStore = useNavStore();

// Initialize nav, if not initialized yet
navStore.initializeNav();

const { nav } = storeToRefs(navStore);

const icons = [
  'adm-directory',
  'adm-integrations',
  'adm-lookups',
  'adm-routing',
  'adm-system',
  'adm-permissions',
  'adm-contact-center',
];
</script>

<style
  lang="scss"
  scoped
></style>
