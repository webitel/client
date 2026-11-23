<template>
  <settings-section-wrapper v-if="available">
    <template #title>
      {{ t('settings.debugRecorder.title') }}
    </template>
    <template #default>
      <settings-switcher-row
        :model-value="recording || enabledUntil !== null"
        @update:model-value="toggle"
      >
        <template #label>
          <p>{{ t('settings.debugRecorder.toggle') }}</p>
        </template>
      </settings-switcher-row>
      <p class="settings-general-debug-recorder__hint typo-body-2">
        {{ t('settings.debugRecorder.description') }}
      </p>
      <template v-if="enabledUntil !== null">
        <p class="typo-body-2">
          {{ t('settings.debugRecorder.status', { until: formatTime(enabledUntil), count: records ?? 0 }) }}
        </p>
        <p
          v-if="justEnabled"
          class="settings-general-debug-recorder__hint typo-body-2"
        >
          {{ t('settings.debugRecorder.reloadHint') }}
        </p>
        <wt-button
          class="settings-general-debug-recorder__download"
          color="secondary"
          :disabled="!records"
          :loading="busy"
          @click.prevent="download"
        >
          {{ t('settings.debugRecorder.download') }}
        </wt-button>
      </template>
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { useDebugRecorder } from '@webitel/ui-sdk/modules/DebugRecorder/composables';
import { ref } from 'vue';
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

// switching on mid-session misses connections opened before: say so once
const justEnabled = ref(false);

const toggle = async (on: boolean) => {
	await setRecording(on);
	justEnabled.value = on;
};

const formatTime = (t: number) =>
	new Date(t).toLocaleString(locale.value, {
		dateStyle: 'short',
		timeStyle: 'short',
	});
</script>

<style scoped>
.settings-general-debug-recorder__hint {
  color: var(--text-secondary-color);
}

.settings-general-debug-recorder__download {
  align-self: flex-start;
}
</style>
