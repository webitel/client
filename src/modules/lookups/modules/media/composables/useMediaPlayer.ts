import { getMediaStreamUrl } from '@webitel/api-services/api';
import type { StorageMediaFile } from '@webitel/api-services/gen/models';
import { computed, ref } from 'vue';
import { getMediaUrlAuth } from '../scripts/getMediaUrlAuth';

/** [Claude] the bottom player: which file it plays */
export function useMediaPlayer() {
	const playingFile = ref<StorageMediaFile | null>(null);

	const playerSrc = computed(
		() =>
			playingFile.value && {
				src: getMediaStreamUrl(playingFile.value.id ?? '', {
					auth: getMediaUrlAuth(),
				}),
				type: playingFile.value.mimeType ?? '',
			},
	);

	const play = (file: StorageMediaFile) => {
		playingFile.value = file;
	};

	const closePlayer = () => {
		playingFile.value = null;
	};

	/** [Claude] true while the file is in the player, paused or not — its row shows stop, as in history */
	const isPlaying = (file: StorageMediaFile) =>
		file.id === playingFile.value?.id;

	return {
		playerSrc,
		play,
		closePlayer,
		isPlaying,
	};
}
