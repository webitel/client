import { shallowMount } from '@vue/test-utils';
import { MediaAPI } from '@webitel/api-services/api';
import type { StorageMediaFile } from '@webitel/api-services/gen/models';
import { openStorageFileInNewTab } from '@webitel/ui-sdk/scripts/file';
import { createPinia, setActivePinia } from 'pinia';
import { describe, expect, it, vi } from 'vitest';

import TheMedia from '../the-media.vue';

vi.mock('@webitel/ui-sdk/scripts/file', async (importOriginal) => ({
	...(await importOriginal<typeof import('@webitel/ui-sdk/scripts/file')>()),
	openStorageFileInNewTab: vi.fn(),
}));

// openFile is not exposed from <script setup>, so the instance type does not list it
type TheMediaVm = {
	openFile: (item: StorageMediaFile) => void;
};

describe('TheMedia', () => {
	const pinia = createPinia();
	setActivePinia(pinia);

	vi.spyOn(MediaAPI, 'getList').mockResolvedValue({
		items: [],
		next: false,
	});

	const mountMedia = () =>
		shallowMount(TheMedia, {
			global: {
				plugins: [
					pinia,
				],
			},
		});

	const openFile = (item: StorageMediaFile) =>
		(mountMedia().vm as unknown as TheMediaVm).openFile(item);

	it('renders a component', () => {
		expect(mountMedia().exists()).toBe(true);
	});

	describe('opening a file', () => {
		it('hands the stream URL to the storage-file helper', () => {
			openFile({
				id: '42',
				name: 'payload.html',
			});

			expect(openStorageFileInNewTab).toHaveBeenCalledWith({
				url: expect.stringContaining('/storage/media/42/stream'),
				name: 'payload.html',
			});
		});

		it('never navigates to the stream URL itself', () => {
			const open = vi.spyOn(window, 'open').mockImplementation(() => null);

			openFile({
				id: '42',
				name: 'payload.html',
			});

			expect(open).not.toHaveBeenCalled();

			open.mockRestore();
		});
	});
});
