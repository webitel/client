import { getMediaStreamUrl } from '@webitel/api-services/api';
import type { StorageMediaFile } from '@webitel/api-services/gen/models';
import { computed, ref } from 'vue';

/** [Claude] the bottom player: which file it plays and whether it's paused */
export function useMediaPlayer() {
	const playingFile = ref<StorageMediaFile | null>(null);
	const isPaused = ref(false);

	const playerSrc = computed(
		() =>
			playingFile.value && {
				src: getMediaStreamUrl(playingFile.value.id ?? ''),
				type: playingFile.value.mimeType ?? '',
			},
	);

	const play = (file: StorageMediaFile) => {
		playingFile.value = file;
	};

	const closePlayer = () => {
		playingFile.value = null;
	};

	const isPlaying = (file: StorageMediaFile) =>
		file.id === playingFile.value?.id && !isPaused.value;

	return {
		playerSrc,
		isPaused,
		play,
		closePlayer,
		isPlaying,
	};
}
