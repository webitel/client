<template>
  <router-view :class="locale /* root element class to control fonts on each locale */" />
</template>

<script lang="ts" setup>
import { computed, onMounted, provide } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

const store = useStore();

const darkMode = computed(() => store.getters['appearance/DARK_MODE']);

provide('darkMode', darkMode);

const { locale, fallbackLocale } = useI18n();

const setLanguage = () => {
	const lang = localStorage.getItem('lang');
	if (lang) {
		locale.value = lang;
	}
	const fallbackLang = localStorage.getItem('fallbackLang');
	if (fallbackLang && fallbackLocale) {
		fallbackLocale.value = fallbackLang;
	}
};

onMounted(() => {
	setLanguage();
});
</script>

<style></style>
