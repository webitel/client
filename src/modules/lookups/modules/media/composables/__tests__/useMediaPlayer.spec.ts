import { describe, expect, it } from 'vitest';

import { useMediaPlayer } from '../useMediaPlayer';

const first = {
	id: '1',
	mimeType: 'audio/wav',
};
const second = {
	id: '2',
	mimeType: 'audio/mpeg',
};

describe('useMediaPlayer', () => {
	it('streams the chosen file and marks it as playing', () => {
		const player = useMediaPlayer();

		player.play(second);

		expect(player.playerSrc.value).toEqual({
			src: expect.stringContaining('/storage/media/2/stream'),
			type: 'audio/mpeg',
		});
		expect(player.isPlaying(second)).toBe(true);
		expect(player.isPlaying(first)).toBe(false);
	});

	it('forgets the file on close', () => {
		const player = useMediaPlayer();

		player.play(first);
		player.closePlayer();

		expect(player.playerSrc.value).toBeNull();
		expect(player.isPlaying(first)).toBe(false);
	});
});
