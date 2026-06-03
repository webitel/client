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
        <settings-switcher-row
          v-show="webrtc"
          :model-value="autoGainControl"
          @update:model-value="changeAutoGainControl"
        >
          <template #label>
            <p>{{ t('settings.volumeLeveling') }}</p>
          </template>
        </settings-switcher-row>
        <settings-switcher-row
          v-show="webrtc"
          :model-value="echoCancellation"
          @update:model-value="changeEchoCancellation"
        >
          <template #label>
            <p>{{ t('settings.echoCancellation') }}</p>
          </template>
        </settings-switcher-row>
        <settings-switcher-row
          v-show="webrtc"
          :model-value="noiseSuppression"
          @update:model-value="changeNoiseSuppression"
        >
          <template #label>
            <p>{{ t('settings.noiseReduction') }}</p>
          </template>
        </settings-switcher-row>
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useSettingsBroadcast } from '../../composables/useSettingsBroadcast';
import { changeWebPhone, getWebPhone } from '../../api/settings';
import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';
import SettingsSwitcherRow from './utils/settings-switcher-row.vue';

const { t } = useI18n();
const { postWebphoneSettings } = useSettingsBroadcast();
const webrtc = ref(true);
const stun = ref(false);
const autoGainControl = ref(false);
const echoCancellation = ref(false);
const noiseSuppression = ref(false);

async function save() {
	const payload = {
		webrtc: webrtc.value,
		stun: stun.value,
		autoGainControl: autoGainControl.value,
		echoCancellation: echoCancellation.value,
		noiseSuppression: noiseSuppression.value,
	};

	await changeWebPhone(payload);
	postWebphoneSettings(payload);
}

async function changeWebrtc(value: boolean) {
	webrtc.value = value;
	if (!value) stun.value = false;

	await save();
}

async function changeStun(value: boolean) {
	stun.value = !webrtc.value ? false : value;

	await save();
}

async function changeAutoGainControl(value: boolean) {
	autoGainControl.value = value;

	await save();
}

async function changeEchoCancellation(value: boolean) {
	echoCancellation.value = value;

	await save();
}

async function changeNoiseSuppression(value: boolean) {
	noiseSuppression.value = value;

	await save();
}

async function fetchWebPhoneSettings() {
	const response = await getWebPhone();
	if (!response) return;
	webrtc.value = response.webrtc;
	stun.value = response.stun;
	autoGainControl.value = response.autoGainControl;
	echoCancellation.value = response.echoCancellation;
	noiseSuppression.value = response.noiseSuppression;
}

fetchWebPhoneSettings();
</script>

