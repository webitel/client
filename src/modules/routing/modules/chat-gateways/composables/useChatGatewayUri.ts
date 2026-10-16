import type { ChatGatewayCard } from '@webitel/api-services/validations';
import path from 'path';
import { computed, type Ref } from 'vue';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

/**
 * [Claude] The gateway's uri: set once on create, then read-only, and copied
 * as the full chat url rather than the bare path.
 */
export const useChatGatewayUri = (modelValue: Ref<ChatGatewayCard>) => {
	const { disableUserInput } = useUserAccessControl();

	const isUriEditable = computed(
		() => !disableUserInput.value && !modelValue.value.id,
	);

	const modifyUriCopy = (value: string) =>
		new URL(
			path.join(import.meta.env.VITE_CHAT_URL, value),
			window.location.origin,
		).toString();

	return {
		isUriEditable,
		modifyUriCopy,
	};
};
