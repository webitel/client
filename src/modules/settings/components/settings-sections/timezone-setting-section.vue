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
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

const { t } = useI18n();
const timeZones = Intl.supportedValuesOf('timeZone');

function getBrowserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getInitialTimezone(): string {
  const savedTimezone = localStorage.getItem('timezone');
  if (savedTimezone && timeZones.includes(savedTimezone)) {
    return savedTimezone;
  }
  return getBrowserTimezone();
}

const selectedTimezone = ref<string>('');

const timezoneOptions = computed(() =>
  timeZones.map((timezone) => ({
    name: timezone,
    id: timezone,
  })),
);

function onChange(timezone: string) {
  selectedTimezone.value = timezone;
  localStorage.setItem('timezone', timezone);
}

onMounted(() => {
  selectedTimezone.value = getInitialTimezone();
});
</script>

<style scoped></style>
