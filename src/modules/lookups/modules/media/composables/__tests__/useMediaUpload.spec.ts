import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useMediaUpload } from '../useMediaUpload';

const { uploadMedia, handlers } = vi.hoisted(() => ({
	uploadMedia: vi.fn(),
	handlers: {} as {
		drop?: (files: File[] | null) => Promise<void>;
		pick?: (files: FileList | null) => Promise<void>;
	},
}));

vi.mock('@webitel/api-services/api', () => ({
	MediaAPI: {
		upload: uploadMedia,
	},
}));

// [Claude] the real one needs a component (i18n, toasts); this keeps its contract: loader state, errors swallowed
vi.mock('@webitel/ui-sdk/composables', async () => {
	const { computed, ref } = await import('vue');
	return {
		useImportAction: () => {
			const running = ref(0);
			return {
				isImporting: computed(() => running.value > 0),
				runImport: async ({ run }) => {
					running.value += 1;
					try {
						return await run(() => {});
					} catch {
						return undefined;
					} finally {
						running.value -= 1;
					}
				},
			};
		},
	};
});

vi.mock('@vueuse/core', async () => {
	const { shallowRef } = await import('vue');
	return {
		useDropZone: (_target: unknown, { onDrop }) => {
			handlers.drop = onDrop;
			return {
				isOverDropZone: shallowRef(false),
			};
		},
		useFileDialog: () => ({
			open: vi.fn(),
			onChange: (callback) => {
				handlers.pick = callback;
			},
		}),
	};
});

const files = [
	new File([], 'a.wav'),
	new File([], 'b.wav'),
];

describe('useMediaUpload', () => {
	beforeEach(() => {
		uploadMedia.mockReset();
	});

	it('uploads dropped files in one request and reloads the list', async () => {
		uploadMedia.mockResolvedValue({});
		const onUploaded = vi.fn();
		const upload = useMediaUpload({
			onUploaded,
		});

		const pending = handlers.drop?.(files);
		expect(upload.isUploading.value).toBe(true);
		await pending;

		expect(uploadMedia).toHaveBeenCalledWith(files, {
			notifySuccess: false,
		});
		expect(upload.isUploading.value).toBe(false);
		expect(onUploaded).toHaveBeenCalledOnce();
	});

	it('reloads the list even when the upload fails', async () => {
		uploadMedia.mockRejectedValue(new Error('Too big'));
		const onUploaded = vi.fn();
		const upload = useMediaUpload({
			onUploaded,
		});

		await handlers.pick?.(files as unknown as FileList);

		expect(upload.isUploading.value).toBe(false);
		expect(onUploaded).toHaveBeenCalledOnce();
	});

	it('ignores an empty pick', async () => {
		const onUploaded = vi.fn();
		useMediaUpload({
			onUploaded,
		});

		await handlers.pick?.(null);

		expect(uploadMedia).not.toHaveBeenCalled();
		expect(onUploaded).not.toHaveBeenCalled();
	});
});
