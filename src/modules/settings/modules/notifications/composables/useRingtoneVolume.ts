import { RingtoneType } from '@webitel/ui-sdk/enums';
import { debounce } from '@webitel/ui-sdk/scripts';
import triggerSound from '@webitel/ui-sdk/src/modules/Notifications/assets/audio/triggerSound';
import { computed, onMounted, reactive, ref } from 'vue';

import { SettingsStorageKey } from '../enums/SettingsStorageKey';

type RingtoneVolumes = Record<RingtoneType, number>;

const DEFAULT_VOLUME = 1;

const ringtoneTypes = Object.values(RingtoneType);

const readSavedVolumes = (): RingtoneVolumes | null => {
	const savedVolumeStr = localStorage.getItem(
		SettingsStorageKey.RingtoneVolume,
	);
	if (!savedVolumeStr) return null;
	try {
		return JSON.parse(savedVolumeStr) as RingtoneVolumes;
	} catch {
		return null;
	}
};

export const useRingtoneVolume = () => {
	const ringtoneVolume = reactive(
		Object.fromEntries(
			ringtoneTypes.map((type) => [
				type,
				DEFAULT_VOLUME,
			]),
		) as RingtoneVolumes,
	);
	const isRingtoneVolumeSaved = ref(false);

	const ringtoneEntities = computed(() =>
		ringtoneTypes.map((type) => ({
			type,
			volume: ringtoneVolume[type],
		})),
	);

	const debouncedPlayBeep = debounce(
		(volume: number) => {
			const playSound = async () => {
				const audio = await triggerSound(volume);
				audio.play();
			};
			playSound();
		},
		null,
		200,
	);

	const changeRingtoneVolume = (type: RingtoneType, newVolume: number) => {
		ringtoneVolume[type] = newVolume;
		debouncedPlayBeep(newVolume); // Debounced beep sound with selected ringtoneVolume

		const savedVolumes = readSavedVolumes();
		isRingtoneVolumeSaved.value =
			!!savedVolumes &&
			ringtoneTypes.every(
				(ringtoneType) =>
					savedVolumes[ringtoneType] === ringtoneVolume[ringtoneType],
			);
	};

	const saveRingtoneVolume = () => {
		// Save the ringtoneVolumes to localStorage as JSON object
		localStorage.setItem(
			SettingsStorageKey.RingtoneVolume,
			JSON.stringify(ringtoneVolume),
		);
		isRingtoneVolumeSaved.value = true;
	};

	const restoreRingtoneVolume = () => {
		// Load the saved ringtoneVolumes from localStorage if it exists
		const savedVolumeStr = localStorage.getItem(
			SettingsStorageKey.RingtoneVolume,
		);
		if (!savedVolumeStr) return;

		const savedVolumes = readSavedVolumes();
		if (savedVolumes) {
			ringtoneTypes.forEach((type) => {
				ringtoneVolume[type] = savedVolumes[type] ?? DEFAULT_VOLUME;
			});
			isRingtoneVolumeSaved.value = true;
			return;
		}

		// If parsing fails, migrate old single value to new structure
		const oldVolume = parseFloat(savedVolumeStr);
		if (!Number.isNaN(oldVolume)) {
			ringtoneTypes.forEach((type) => {
				ringtoneVolume[type] = oldVolume;
			});
		}
		isRingtoneVolumeSaved.value = false;
	};

	onMounted(restoreRingtoneVolume);

	return {
		ringtoneEntities,
		isRingtoneVolumeSaved,
		changeRingtoneVolume,
		saveRingtoneVolume,
	};
};
