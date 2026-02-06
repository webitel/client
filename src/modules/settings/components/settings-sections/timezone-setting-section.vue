<template>
  <settings-section-wrapper>
    <template #title>{{ t('date.timezone') }}</template>
    <template #default>
      <wt-select
        :label="t('date.timezone')"
        :search-method="CalendarsAPI.getTimezonesLookup"
        :value="selectedTimezone"
        :clearable="false"
        @input="handleTimezoneChange"
      />
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { CalendarsAPI } from '@webitel/api-services/api';
import UserSettingsAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/UserSettingsAPI';
import { TIMEZONE_STORAGE_KEY } from '@webitel/ui-sdk/src/modules/Userinfo/constants/UserSettingsConstants';
import type { Timezone } from '@webitel/ui-sdk/src/modules/Userinfo/types/UserSettings';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

const { t } = useI18n();

const selectedTimezone = ref<string | null>(null);

const getBrowserTimezone = (): string =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const extractTimezoneId = (timezoneString: string): string => {
  if (!timezoneString || typeof timezoneString !== 'string') {
    return '';
  }
  /**
   * @author @rzaritskyi
   *
   * [WTEL-7508](https://webitel.atlassian.net/browse/WTEL-7508)
   *
   * Original timezoneString looks like "America/New_York -04:00"
   * For toLocaleDateString method i need only "America/New_York"
   * so this regex will extract the part before the space
   */
  const match = timezoneString.match(/^([^\s]+)/);
  return match?.[1] || timezoneString;
};

const getSavedTimezone = (): string | null =>
  localStorage.getItem(TIMEZONE_STORAGE_KEY);

const saveToStorage = (timezoneId: string) =>
  localStorage.setItem(TIMEZONE_STORAGE_KEY, extractTimezoneId(timezoneId));

const setTimezone = (timezoneId: string) => {
  saveToStorage(timezoneId);
  selectedTimezone.value = timezoneId;
};

const handleTimezoneChange = async (timezone: Timezone) => {
  const previousTimezone = selectedTimezone.value;

  setTimezone(timezone.name);

  const { timezone: updatedTimezone } = await UserSettingsAPI.setUserTimezone(
    extractTimezoneId(timezone.name),
  );
  if (!updatedTimezone) selectedTimezone.value = previousTimezone;
};

const findTimezoneByName = async (timezoneId: string): Promise<Timezone> => {
  const { items } = await CalendarsAPI.getTimezonesLookup({
    search: timezoneId,
  });
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
