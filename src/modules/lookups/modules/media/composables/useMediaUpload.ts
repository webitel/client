import { useDropZone, useFileDialog } from '@vueuse/core';
import { MediaAPI } from '@webitel/api-services/api';
import { useImportAction } from '@webitel/ui-sdk/composables';
import { ref } from 'vue';

/** [Claude] drop or pick files into `dropZone`; `onUploaded` fires after the request, failed or not */
export function useMediaUpload({ onUploaded }: { onUploaded: () => void }) {
	const dropZone = ref<HTMLElement>();
	const { isImporting: isUploading, runImport } = useImportAction();

	const upload = async (files: File[] | FileList | null) => {
		if (!files?.length || isUploading.value) return;

		// [Claude] all files go in one request, so there is nothing to count – only the loader and import toasts (WTEL-10817)
		await runImport({
			run: () =>
				MediaAPI.upload(Array.from(files), {
					notifySuccess: false,
				}),
		});
		onUploaded();
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
