<template>
  <!--  :class="$i18n.locale" root element class to control fonts on each locale  -->
  <router-view :class="locale" />
</template>

<script setup>
import { computed, provide } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

const store = useStore();

const darkMode = computed(() => store.getters['appearance/DARK_MODE']);

provide('darkMode', darkMode);

const { locale } = useI18n();
</script>

<style>

</style>
