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

interface TimezoneResponse {
  items: Timezone[];
}

const createTimezone = (name: string): Timezone => ({
  name,
  id: name,
  offset: '',
});

const TIMEZONE_STORAGE_KEY = 'timezone';
const { t } = useI18n();
const selectedTimezone = ref<Timezone | null>(null);

const getBrowserTimezone = (): Timezone =>
  createTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);

const getSavedTimezone = (): Timezone | null =>
  JSON.parse(localStorage.getItem(TIMEZONE_STORAGE_KEY));

const saveToStorage = (tz: Timezone) =>
  localStorage.setItem(TIMEZONE_STORAGE_KEY, JSON.stringify(tz));

const loadTimezoneOptions = (
  params: TimezoneSearchParams,
): Promise<TimezoneResponse> => CalendarsAPI.getTimezonesLookup(params);

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

const setTimezone = (tz: Timezone) => {
  saveToStorage(tz);
  selectedTimezone.value = tz;
};

const findTimezoneByName = async (name: string): Promise<Timezone> => {
  const { items } = await loadTimezoneOptions({ search: name });
  return items.find((tz) => tz.name === name) || createTimezone(name);
};

const initializeTimezone = async () => {
  const savedTimezone = getSavedTimezone();
  const targetTimezone = savedTimezone || getBrowserTimezone();
  const timezone = await findTimezoneByName(targetTimezone.name);
  setTimezone(timezone);
};

onMounted(initializeTimezone);
</script>

<style scoped></style>
