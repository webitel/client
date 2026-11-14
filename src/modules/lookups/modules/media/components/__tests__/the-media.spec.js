import { shallowMount } from '@vue/test-utils';
import { MediaAPI } from '@webitel/api-services/api';
import { openStorageFileInNewTab } from '@webitel/ui-sdk/scripts/file';
import { createPinia, setActivePinia } from 'pinia';

import TheMedia from '../the-media.vue';

vi.mock('@webitel/ui-sdk/scripts/file', async (importOriginal) => ({
	...(await importOriginal()),
	openStorageFileInNewTab: vi.fn(),
}));

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

	it('renders a component', () => {
		expect(mountMedia().exists()).toBe(true);
	});

	describe('opening a file', () => {
		it('hands the stream URL to the storage-file helper', () => {
			const wrapper = mountMedia();

			wrapper.vm.openFile({
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
			const wrapper = mountMedia();

			wrapper.vm.openFile({
				id: '42',
				name: 'payload.html',
			});

			expect(open).not.toHaveBeenCalled();

			open.mockRestore();
		});
	});
});
