import { FlowsAPI } from '@webitel/api-services/api';
import type { ChatGatewayCard } from '@webitel/api-services/validations';
import { WtObject } from '@webitel/ui-sdk/enums';
import type { Ref } from 'vue';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

type Flow = ChatGatewayCard['flow'];

/** [Claude] the gateway's flow select; an unnamed gateway takes the flow's name */
export const useChatGatewayFlow = (modelValue: Ref<ChatGatewayCard>) => {
	const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
		WtObject.Flow,
	);

	const setFlow = (value: Flow) => {
		if (!modelValue.value.name && value?.name) {
			modelValue.value.name = value.name;
		}
		modelValue.value.flow = value;
	};

	return {
		hasFlowsReadAccess,
		searchFlows: FlowsAPI.getLookup,
		setFlow,
	};
};
