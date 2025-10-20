<template>
  <settings-section-wrapper>
    <template #title>{{ t('settings.timezone') }}</template>
    <template #default>
      <wt-select
        :label="t('settings.timezone')"
        :search-method="loadTimezoneOptions"
        :value="selectedTimezone"
        :clearable="false"
        @input="handleTimezoneChange"
      />
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import CalendarsAPI from '../../../lookups/modules/calendars/api/calendars.js';
import { saveTimezone } from '../../api/settings.js';
import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

interface Timezone {
  name: string;
  id: string;
  offset: string;
}

interface TimezoneSearchParams {
  search?: string;
  page?: number;
  size?: number;
}

const TIMEZONE_STORAGE_KEY = 'timezoneId';
const { t } = useI18n();
const selectedTimezone = ref<Timezone | null>(null);

const getBrowserTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;
const getSavedTimezone = () => localStorage.getItem(TIMEZONE_STORAGE_KEY);
const saveToStorage = (tz: Timezone) =>
  localStorage.setItem(TIMEZONE_STORAGE_KEY, tz.name);

const loadTimezoneOptions = (params: TimezoneSearchParams) =>
  CalendarsAPI.getTimezonesLookup(params);

const saveOnServer = async (tz: Timezone) => {
  try {
    await saveTimezone(tz);
    return true;
  } catch {
    return false;
  }
};

const handleTimezoneChange = async (tz: Timezone) => {
  const prev = selectedTimezone.value;
  selectedTimezone.value = tz;

  if (await saveOnServer(tz)) {
    saveToStorage(tz);
  } else {
    selectedTimezone.value = prev;
  }
};

const createTimezone = (name: string): Timezone => ({
  name,
  id: name,
  offset: '',
});

const initializeTimezone = async () => {
  const name = getSavedTimezone() || getBrowserTimezone();

  try {
    const { items } = await loadTimezoneOptions({ search: name });
    selectedTimezone.value =
      items.find((tz: Timezone) => tz.name === name) || createTimezone(name);
  } catch {
    selectedTimezone.value = createTimezone(name);
  }
};

onMounted(initializeTimezone);
</script>

<style scoped></style>
