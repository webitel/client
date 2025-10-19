<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.timezone') }}
    </template>
    <template #default>
      <wt-select
        :label="t('settings.timezone')"
        :options="timezoneOptions"
        :value="selectedTimezone"
        :clearable="false"
        use-value-from-options-by-prop="id"
        @input="onChange"
      />
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { saveTimezone } from '../../api/settings.js';
import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

const TIMEZONE_STORAGE_KEY = 'timezoneId';

const { t } = useI18n();

const timezones = typeof Intl.supportedValuesOf === 'function'
  ? Intl.supportedValuesOf('timeZone') : [getBrowserTimezone()];
 
function getBrowserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getInitialTimezone(): string {
  const savedTimezone = localStorage.getItem(TIMEZONE_STORAGE_KEY);
  if (savedTimezone && timezones.includes(savedTimezone)) {
    return savedTimezone;
  }
  return getBrowserTimezone();
}

const initialTimezone = ref(getInitialTimezone());
const selectedTimezone = ref(initialTimezone.value); 

const timezoneOptions = computed(() =>
  timezones.map((timezone) => ({
    name: timezone,
    id: timezone,
  })),
);

function saveTimezoneToStorage() {
  localStorage.setItem(TIMEZONE_STORAGE_KEY, selectedTimezone.value);
}

function updateInitialTimezone() {
  initialTimezone.value = selectedTimezone.value;
}

function setSelectedTimezone(timezone: string) {
  selectedTimezone.value = timezone;
}

async function onChange(timezone: string) {
  setSelectedTimezone(timezone);

  await saveTimezone(selectedTimezone.value).then(() => {
    saveTimezoneToStorage();
    updateInitialTimezone();
  });
}
</script>

<style scoped></style>
