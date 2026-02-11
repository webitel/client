<template>
  <settings-section-wrapper>
    <template #title>
      {{ t('settings.ringtones.title') }}
    </template>
    <template>
  
        <wt-checkbox
          :selected="isCustomRingtone"
          :label="t('settings.ringtones.customRingtone')"
          @update:selected="selectRingtoneType"
        />
        <wt-select
          :value="ringtone"
          :options="options"
          :disabled="!isCustomRingtone"
          :clearable="false"
          :label="t('settings.ringtones.ringtone')"
          option-label="label"
          track-by="label"
          @input="(val: Ringtone) => (ringtone = val)"
        />
        <wt-player
          v-show="audioLink"
          :src="audioLink"
          :closable="false"
          :autoplay="false"
        />
        <wt-button
          :disabled="isRingtoneSaved"
          @click="saveRingtone"
        >
          {{ t('objects.save') }}
        </wt-button>
      
    </template>
  </settings-section-wrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { getRingtonesList } from '../../api/settings';
import SettingsSectionWrapper from './utils/settings-section-wrapper.vue';

interface Ringtone {
	name: string;
	label: string;
	[key: string]: any;
}

const { t } = useI18n();

const isCustomRingtone = ref(false);
const ringtone = ref<Ringtone | Record<string, any>>({});
const options = ref<Ringtone[]>([]);
const savedRingtone = ref<string | null>(null);

const isRingtoneSelected = computed(
	() => isCustomRingtone.value && ringtone.value.name,
);
const audioLink = computed(() =>
	isRingtoneSelected.value
		? `${import.meta.env.VITE_RINGTONES_URL}/${ringtone.value.name}`
		: '',
);
const isRingtoneSaved = computed(
	() =>
		(!savedRingtone.value && !ringtone.value.name) ||
		savedRingtone.value === ringtone.value.name,
);

function selectRingtoneType() {
	isCustomRingtone.value = !isCustomRingtone.value;
	if (!isRingtoneSelected.value) ringtone.value = {};
}

function saveRingtone() {
	if (ringtone.value.name) {
		localStorage.setItem('settings/ringtone', ringtone.value.name);
	} else {
		localStorage.removeItem('settings/ringtone');
	}
	savedRingtone.value = localStorage.getItem('settings/ringtone');
}

async function loadRingtonesOptions() {
	options.value = await getRingtonesList();
}

function restoreRingtone() {
	const ringtoneName = localStorage.getItem('settings/ringtone');
	if (ringtoneName) {
		savedRingtone.value = ringtoneName;
		ringtone.value =
			options.value.find((item) => item.name === ringtoneName) || {};
		isCustomRingtone.value = true;
	}
}

onMounted(async () => {
	await loadRingtonesOptions();
	restoreRingtone();
});
</script>

<style scoped>
  .wt-button {
    align-self: flex-end;
  
  }

  .wt-player {
    position: relative;
    bottom: auto;
  }

</style>

