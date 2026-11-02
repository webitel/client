<template>
  <settings-section-wrapper>
    <template #title>{{ t('date.timezone') }}</template>
    <template #default>
      <wt-single-select
        :label="t('date.timezone')"
        :search-method="CalendarsAPI.getTimezonesLookup"
        :model-value="selectedTimezone"
        :show-clear="false"
        @update:model-value="changeTimezone"
      />
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { CalendarsAPI } from '@webitel/api-services/api';
import { useI18n } from 'vue-i18n';
import SettingsSectionWrapper from '../../../../components/_internals/settings-section-wrapper.vue';
import { useTimezone } from '../../composables/useTimezone';

const { t } = useI18n();

const { selectedTimezone, changeTimezone } = useTimezone();
</script>
