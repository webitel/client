import { type Ringtone, RingtonesAPI } from '@webitel/api-services/api';
import { computed, onMounted, ref } from 'vue';

import { SettingsStorageKey } from '../enums/SettingsStorageKey';

export const useRingtone = () => {
	const isCustomRingtone = ref(false);
	const ringtone = ref<Partial<Ringtone>>({});
	const options = ref<Ringtone[]>([]);
	const savedRingtone = ref<string | null>(null);

	const isRingtoneSelected = computed(
		() => isCustomRingtone.value && ringtone.value.name,
	);

	const audioLink = computed(() => {
		const src = isRingtoneSelected.value
			? `${import.meta.env.VITE_RINGTONES_URL}/${ringtone.value.name}`
			: '';
		return {
			src,
			type: 'audio/mp3',
		};
	});

	const isRingtoneSaved = computed(
		() =>
			(!savedRingtone.value && !ringtone.value.name) ||
			savedRingtone.value === ringtone.value.name,
	);

	const toggleCustomRingtone = () => {
		isCustomRingtone.value = !isCustomRingtone.value;
		if (!isRingtoneSelected.value) ringtone.value = {};
	};

	const selectRingtone = (value: Ringtone) => {
		ringtone.value = value;
	};

	const saveRingtone = () => {
		if (ringtone.value.name) {
			localStorage.setItem(SettingsStorageKey.Ringtone, ringtone.value.name);
		} else {
			localStorage.removeItem(SettingsStorageKey.Ringtone);
		}
		savedRingtone.value = localStorage.getItem(SettingsStorageKey.Ringtone);
	};

	const restoreRingtone = () => {
		const ringtoneName = localStorage.getItem(SettingsStorageKey.Ringtone);
		if (!ringtoneName) return;
		savedRingtone.value = ringtoneName;
		ringtone.value =
			options.value.find((item) => item.name === ringtoneName) || {};
		isCustomRingtone.value = true;
	};

	onMounted(async () => {
		options.value = await RingtonesAPI.getList();
		restoreRingtone();
	});

	return {
		isCustomRingtone,
		ringtone,
		options,
		audioLink,
		isRingtoneSaved,
		toggleCustomRingtone,
		selectRingtone,
		saveRingtone,
	};
};
