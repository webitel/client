import { ref } from 'vue';

export type AskResetConfirmationParams = {
	quantity: number;
	callback: () => unknown;
};

export const useResetConfirmationPopup = () => {
	const isVisible = ref(false);
	const resetQuantity = ref(0);
	const resetCallback = ref<() => unknown>(() => {});

	function askResetConfirmation({ quantity, callback }: AskResetConfirmationParams) {
		resetQuantity.value = quantity;
		isVisible.value = true;
		resetCallback.value = callback;
	}

	function closeReset() {
		isVisible.value = false;
	}

	return {
		isVisible,
		resetQuantity,
		resetCallback,

		askResetConfirmation,
		closeReset,
	};
};
