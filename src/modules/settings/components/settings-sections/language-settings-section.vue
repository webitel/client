<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.language') }}
    </template>
    <template>
      <wt-single-select
        :label="t('settings.language')"
        :options="languageOptions"
        :model-value="locale"
        :show-clear="false"
        option-value="id"
        @update:model-value="changeLanguage"
      />
      
      <!--  https://webitel.atlassian.net/browse/WTEL-7541  -->
      <!-- <wt-single-select
        :label="t('settings.fallbackLanguage')"
        :options="languageOptions"
        :model-value="fallbackLocale"
        :show-clear="false"
        option-value="id"
        @update:model-value="changeFallbackLanguage"
      /> -->
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { TranslationLocale } from '@webitel/ui-sdk/locale';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

const { t, locale } = useI18n();

const languageOptions = computed(() =>
	Object.values(TranslationLocale).map((locale) => ({
		name: t(`reusable.lang.${locale}`, null, {
			missingWarn: false,
			fallbackWarn: false,
		}), // skip err, coz notTranslatable locale
		id: locale,
	})),
);

function changeLanguage(lang: string) {
	locale.value = lang;
	localStorage.setItem('lang', lang);
}

// function changeFallbackLanguage(lang: string) {
//   fallbackLocale.value = lang;
//   localStorage.setItem('fallbackLang', lang);
// }
</script>

<style scoped>
</style> 