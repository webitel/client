<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.language') }}
    </template>
    <template>
      <wt-select
        :label="t('settings.language')"
        :options="languageOptions"
        :value="locale"
        :clearable="false"
        use-value-from-options-by-prop="id"
        @input="changeLanguage"
      />
      
      <!--  https://webitel.atlassian.net/browse/WTEL-7541  -->
      <!-- <wt-select
        :label="t('settings.fallbackLanguage')"
        :options="languageOptions"
        :value="fallbackLocale"
        :clearable="false"
        use-value-from-options-by-prop="id"
        @input="changeFallbackLanguage"
      /> -->
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

const { t, locale, fallbackLocale } = useI18n();

const languageOptions = [
  { name: 'English', id: 'en' },
  { name: 'Russian', id: 'ru' },
  { name: 'Ukrainian', id: 'uk' },
  { name: 'Spanish', id: 'es' },
  { name: 'Kazakh', id: 'kz' },
  { name: 'Vietnamese', id: 'vi' },
  { name: 'Polish', id: 'pl' },
  { name: 'Romanian', id: 'ro' },
  { name: 'Uzbek', id: 'uz' },
  { name: 'Poland', id: 'pl' },
];

function changeLanguage(lang: string) {
  locale.value = lang;
  localStorage.setItem('lang', lang);
}

function changeFallbackLanguage(lang: string) {
  fallbackLocale.value = lang;
  localStorage.setItem('fallbackLang', lang);
}

</script>

<style scoped>
</style> 