import { useDropZone, useFileDialog } from '@vueuse/core';
import { MediaAPI } from '@webitel/api-services/api';
import { useImportAction } from '@webitel/ui-sdk/composables';
import { ref } from 'vue';

/** [Claude] drop or pick files into `dropZone`; `onUploaded` fires after a successful upload */
export function useMediaUpload({ onUploaded }: { onUploaded: () => void }) {
	const dropZone = ref<HTMLElement>();
	const { isImporting: isUploading, runImport } = useImportAction();

	const upload = async (files: File[] | FileList | null) => {
		if (!files?.length || isUploading.value) return;

		// [Claude] all files go in one request, so there is nothing to count – only the loader and import toasts (WTEL-10817)
		const succeeded = await runImport({
			run: () =>
				MediaAPI.upload(Array.from(files), {
					notifySuccess: false,
					// [Claude] the import shows its own error; server errors still show theirs (WTEL-11052)
					notifyNetworkError: false,
				}),
		});
		// [Claude] a failed upload has nothing new to show, and reloading offline would only add another error (WTEL-11052)
		if (succeeded) onUploaded();
	};

	const { isOverDropZone } = useDropZone(dropZone, {
		onDrop: upload,
	});

	const { open, onChange } = useFileDialog({
		multiple: true,
		reset: true,
	});
	onChange(upload);

	const openFileDialog = () => {
		if (!isUploading.value) open();
	};

	return {
		dropZone,
		isOverDropZone,
		isUploading,
		openFileDialog,
	};
}
