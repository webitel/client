<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.webPhone') }}
    </template>
    <template>
        <settings-switcher-row :model-value="webrtc" @update:model-value="changeWebrtc">
          <template #label>
            <p>{{ t('settings.useWebPhone') }}</p>
          </template>
        </settings-switcher-row>
        <settings-switcher-row v-show="webrtc" :model-value="stun" @update:model-value="changeStun">
          <template #label>
            <p>{{ t('settings.useStun') }}</p>
          </template>
        </settings-switcher-row>
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { changeWebPhone, getWebPhone } from '../../api/settings';
import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';
import SettingsSwitcherRow from './utils/settings-switcher-row.vue';

const { t } = useI18n();
const webrtc = ref(true);
const stun = ref(false);

async function changeWebrtc(value: boolean) {
	webrtc.value = value;
	if (!value) stun.value = false;

	await changeWebPhone({
		webrtc: webrtc.value,
		stun: stun.value,
	});
}

async function changeStun(value: boolean) {
	stun.value = !webrtc.value ? false : value;

	await changeWebPhone({
		webrtc: webrtc.value,
		stun: stun.value,
	});
}

async function fetchWebPhoneSettings() {
	const response = await getWebPhone();
	webrtc.value = response.webrtc;
	stun.value = response.stun;
}

fetchWebPhoneSettings();
</script>

 