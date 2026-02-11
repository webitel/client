import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export const useCheckingUnsavedChanges = (itemInstance) => {
	const isConfirmationUnsavedChangesPopup = ref(false);

	function showConfirmationPopup(e) {
		if (itemInstance.value._dirty) {
			e.preventDefault();
			e.returnValue = '';
		}
	}

	function addCheckingUnsavedChanges() {
		window.addEventListener('beforeunload', showConfirmationPopup);
	}

	function removeCheckingUnsavedChanges() {
		window.removeEventListener('beforeunload', showConfirmationPopup);
	}

	function toggleIsConfirmationUnsavedChangesPopup() {
		isConfirmationUnsavedChangesPopup.value =
			!isConfirmationUnsavedChangesPopup.value;
	}

	return {
		isConfirmationUnsavedChangesPopup,

		addCheckingUnsavedChanges,
		removeCheckingUnsavedChanges,
		toggleIsConfirmationUnsavedChangesPopup,
	};
};
