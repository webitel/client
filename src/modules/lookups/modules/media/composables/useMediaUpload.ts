import { useDropZone, useFileDialog } from '@vueuse/core';
import { MediaAPI } from '@webitel/api-services/api';
import { ref } from 'vue';

/** [Claude] drop or pick files into `dropZone`; `onUploaded` fires after the request, failed or not */
export function useMediaUpload({ onUploaded }: { onUploaded: () => void }) {
	const dropZone = ref<HTMLElement>();
	const isUploading = ref(false);

	const upload = async (files: File[] | FileList | null) => {
		if (!files?.length || isUploading.value) return;

		isUploading.value = true;
		try {
			await MediaAPI.upload(Array.from(files));
		} catch {
			// [Claude] MediaAPI has already notified; drop/dialog callers don't await, so don't rethrow
		} finally {
			isUploading.value = false;
			onUploaded();
		}
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
