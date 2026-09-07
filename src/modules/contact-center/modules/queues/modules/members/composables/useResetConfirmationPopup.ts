import { ref } from 'vue';

import { ActionOptions } from '../types/ActionOptions';
import type { AskResetConfirmationParams } from '../types/AskResetConfirmationParams';

export const useResetConfirmationPopup = () => {
	const isVisible = ref(false);
	const resetQuantity = ref(0);
	const resetCallback = ref<() => unknown>(() => {});
	const resetScope = ref<ActionOptions>(ActionOptions.ALL);

	function askResetConfirmation({
		quantity,
		callback,
		scope,
	}: AskResetConfirmationParams) {
		resetQuantity.value = quantity;
		isVisible.value = true;
		resetCallback.value = callback;
		resetScope.value = scope;
	}

	function closeReset() {
		isVisible.value = false;
		resetScope.value = ActionOptions.ALL;
	}

	return {
		isVisible,
		resetQuantity,
		resetCallback,
		resetScope,

		askResetConfirmation,
		closeReset,
	};
};
