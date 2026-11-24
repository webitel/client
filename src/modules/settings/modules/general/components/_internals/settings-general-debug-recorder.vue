<template>
  <settings-section-wrapper v-if="available">
    <template #title>
      {{ t('settings.debugRecorder.title') }}
    </template>
    <template #default>
      <settings-switcher-row
        :model-value="recording || enabledUntil !== null"
        @update:model-value="setRecording"
      >
        <template #label>
          <div class="settings-general-debug-recorder__label">
            <p>{{ t('settings.debugRecorder.toggle') }}</p>
            <wt-hint>{{ t('settings.debugRecorder.hint') }}</wt-hint>
          </div>
        </template>
      </settings-switcher-row>
      <div
        v-if="enabledUntil !== null"
        class="settings-general-debug-recorder__status"
      >
        <p class="settings-general-debug-recorder__muted typo-body-2">
          {{ t('settings.debugRecorder.status', { until: formatTime(enabledUntil), count: records ?? 0 }) }}
        </p>
        <wt-button
          color="secondary"
          size="sm"
          :disabled="!records"
          :loading="busy"
          @click.prevent="download"
        >
          {{ t('settings.debugRecorder.download') }}
        </wt-button>
      </div>
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { useDebugRecorder } from '@webitel/ui-sdk/modules/DebugRecorder/composables';
import { useI18n } from 'vue-i18n';
import SettingsSectionWrapper from '../../../../components/_internals/settings-section-wrapper.vue';
import SettingsSwitcherRow from '../../../../components/_internals/settings-switcher-row.vue';

const { t, locale } = useI18n();

const {
	available,
	recording,
	enabledUntil,
	records,
	busy,
	setRecording,
	download,
} = useDebugRecorder();

const formatTime = (t: number) =>
	new Date(t).toLocaleString(locale.value, {
		dateStyle: 'short',
		timeStyle: 'short',
	});
</script>

<style scoped>
.settings-general-debug-recorder__label {
  display: flex;
  align-items: center;
  gap: var(--spacing-2xs);
}

.settings-general-debug-recorder__status {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-xs);
}

.settings-general-debug-recorder__muted {
  color: var(--text-secondary-color);
}
</style>
