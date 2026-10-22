<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.webPhone') }}
    </template>
    <template>
        <settings-switcher-row
          :model-value="webrtc"
          @update:model-value="changeWebrtc"
        >
          <template #label>
            <p>{{ t('settings.useWebPhone') }}</p>
          </template>
        </settings-switcher-row>
        <settings-switcher-row 
          v-show="webrtc"
          :model-value="stun"
          @update:model-value="changeStun"
        >
          <template #label>
            <p>{{ t('settings.useStun') }}</p>
          </template>
        </settings-switcher-row>
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SettingsSectionWrapper from '../../../../components/_internals/settings-section-wrapper.vue';
import SettingsSwitcherRow from '../../../../components/_internals/settings-switcher-row.vue';
import { useWebPhone } from '../../composables/useWebPhone';

const { t } = useI18n();

const { webrtc, stun, changeWebrtc, changeStun } = useWebPhone();
</script>

