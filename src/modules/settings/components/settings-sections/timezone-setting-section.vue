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
import { SearchParams } from '@webitel/ui-sdk/packages/api-services/gen/_models';
import UserSettingsAPI from '@webitel/ui-sdk/src/modules/UserSettings/api/UserSettingsAPI';
import { TIMEZONE_STORAGE_KEY } from '@webitel/ui-sdk/src/modules/UserSettings/constants/UserSettingsConstants';
import type { Timezone } from '@webitel/ui-sdk/src/modules/UserSettings/types/UserSettings';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import CalendarsAPI from '../../../lookups/modules/calendars/api/calendars';
import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

const { t } = useI18n();

const selectedTimezone = ref<string | null>(null);

const getBrowserTimezone = (): string =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const extractTimezoneId = (timezoneString: string): string => {
  if (!timezoneString || typeof timezoneString !== 'string') {
    return '';
  }
  /* Original timezoneString looks like "America/New_York -04:00" 
     For toLocaleDateString method i need only "America/New_York"
     so this regex will extract the part before the space
  */
  const match = timezoneString.match(/^([^\s]+)/);
  return match?.[1] || timezoneString;
};

const getSavedTimezone = (): string | null =>
  localStorage.getItem(TIMEZONE_STORAGE_KEY);

const saveToStorage = (timezoneId: string) =>
  localStorage.setItem(TIMEZONE_STORAGE_KEY, extractTimezoneId(timezoneId));

const loadTimezoneOptions = (
  params: SearchParams,
): Promise<{ items: Timezone[] }> => CalendarsAPI.getTimezonesLookup(params);

const setTimezone = (timezoneId: string) => {
  saveToStorage(timezoneId);
  selectedTimezone.value = timezoneId;
};

const handleTimezoneChange = async (timezone: Timezone) => {
  const previousTimezone = selectedTimezone.value;

  setTimezone(timezone.name);

  const { timezone: updatedTimezone } = await UserSettingsAPI.setUserTimezone(
    extractTimezoneId(timezone.name)
  );
  if (!updatedTimezone) selectedTimezone.value = previousTimezone;
};

const findTimezoneByName = async (timezoneId: string): Promise<Timezone> => {
  const { items } = await loadTimezoneOptions({ search: timezoneId });
  return items.find((timezone) => timezone.name.includes(timezoneId));
};

const initializeTimezone = async () => {
  const targetTimezone = getSavedTimezone() || getBrowserTimezone();
  const timezone = await findTimezoneByName(targetTimezone);
  const timezoneId = timezone.name || targetTimezone;
  setTimezone(timezoneId);
};

onMounted(initializeTimezone);
</script>

<style scoped></style>
