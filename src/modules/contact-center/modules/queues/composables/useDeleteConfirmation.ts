import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed } from 'vue';

/**
 * `useDeleteConfirmationPopup`, with its refs re-created here.
 *
 * The composable lives in ui-sdk, which resolves its own copy of vue while the
 * app resolves another. The refs it returns are therefore not the app's `Ref`
 * type, so vue-tsc does not auto-unwrap them in a template and every
 * `:delete-count="deleteCount"` binding reports a type error. Reading them
 * through local computeds hands the template values the app's own compiler
 * recognises.
 *
 * Only a local-linking problem — CI installs the published package and dedupes
 * vue — but without this every migrated table repeats the same two errors.
 */
export const useDeleteConfirmation = () => {
	const {
		isVisible,
		deleteCount,
		deleteCallback,
		askDeleteConfirmation,
		closeDelete,
	} = useDeleteConfirmationPopup();

	return {
		isDeleteConfirmationPopup: computed(() => isVisible.value),
		deleteCount: computed(() => deleteCount.value),
		deleteCallback: computed(() => deleteCallback.value),
		askDeleteConfirmation,
		closeDelete,
	};
};
