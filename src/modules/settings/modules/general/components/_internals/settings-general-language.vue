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
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { TranslationLocale } from '@webitel/ui-sdk/locale';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import SettingsSectionWrapper from '../../../../components/_internals/settings-section-wrapper.vue';

const { t, locale } = useI18n();

const languageOptions = computed(() =>
	Object.values(TranslationLocale).map((locale) => ({
		name: t(`reusable.lang.${locale}`, null, {
			missingWarn: false,
			fallbackWarn: false,
		}),
		id: locale,
	})),
);

function changeLanguage(lang: string) {
	locale.value = lang;
	localStorage.setItem('lang', lang);
}
</script>
