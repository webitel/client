import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

/** `useDeleteConfirmationPopup`, under the names the queues tables use. */
export const useDeleteConfirmation = () => {
	const {
		isVisible,
		deleteCount,
		deleteCallback,
		askDeleteConfirmation,
		closeDelete,
	} = useDeleteConfirmationPopup();

	return {
		isDeleteConfirmationPopup: isVisible,
		deleteCount,
		deleteCallback,
		askDeleteConfirmation,
		closeDelete,
	};
};
