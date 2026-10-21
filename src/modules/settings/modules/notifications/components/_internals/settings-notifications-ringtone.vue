<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.ringtones.title') }}
    </template>
    <template>

        <wt-checkbox
          :selected="isCustomRingtone"
          :label="t('settings.ringtones.customRingtone')"
          @update:selected="toggleCustomRingtone"
        />
        <wt-single-select
          :model-value="ringtone"
          :options="options"
          :disabled="!isCustomRingtone"
          :show-clear="false"
          :label="t('settings.ringtones.ringtone')"
          option-label="label"
          data-key="label"
          @update:model-value="selectRingtone"
        />
        <wt-player
          v-if="audioLink.src"
          :src="audioLink"
          :file-name="ringtone.name"
          :closable="false"
          :autoplay="false"
          position="static"
        />
        <wt-button
          :disabled="isRingtoneSaved"
          class="settings-notifications-ringtone__save"
          @click="saveRingtone"
        >
          {{ t('objects.save') }}
        </wt-button>

    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { WtPlayer } from '@webitel/ui-sdk/components';
import { useI18n } from 'vue-i18n';
import SettingsSectionWrapper from '../../../../components/_internals/settings-section-wrapper.vue';
import { useRingtone } from '../../composables/useRingtone';

const { t } = useI18n();

const {
	isCustomRingtone,
	ringtone,
	options,
	audioLink,
	isRingtoneSaved,
	toggleCustomRingtone,
	selectRingtone,
	saveRingtone,
} = useRingtone();
</script>

<style scoped>
.settings-notifications-ringtone__save {
  align-self: flex-end;
}
</style>

