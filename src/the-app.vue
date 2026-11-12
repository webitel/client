<template>
  <wt-notifications-bar />
  <router-view :class="locale /* root element class to control fonts on each locale */" />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onMounted, provide } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppearanceStore } from './modules/appearance/store/appearanceStore';
import { useUserinfoStore } from './modules/userinfo/stores/userinfoStore';

const appearanceStore = useAppearanceStore();
const { darkMode } = storeToRefs(appearanceStore);

const { showUserNotifications } = useUserinfoStore();

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
	showUserNotifications();
});
</script>
