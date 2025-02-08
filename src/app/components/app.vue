<template>
  <router-view
    :class="locale /* root element class to control fonts on each locale */"
  />
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

const store = useStore();
const { locale } = useI18n();

const darkMode = computed(() => store.getters['appearance/DARK_MODE']);

provide('darkMode', darkMode);
</script>

<style></style>
