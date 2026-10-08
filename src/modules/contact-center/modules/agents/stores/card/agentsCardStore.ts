import {
	AgentsAPI,
	AgentWorkingConditionsAPI,
} from '@webitel/api-services/api';
import type {
	EngineAgent,
	WfmLookupEntity,
} from '@webitel/api-services/gen/models';
import {
	agentSchema,
	agentWfmConditionsSchema,
} from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';
import { WebitelLicense } from '@webitel/ui-sdk/modules/Userinfo';
import { computed } from 'vue';

import { useUserinfoStore } from '../../../../../userinfo/stores/userinfoStore';
import { AgentsNamespace } from '../namespace';

/**
 * [Claude] Agent card = agent itself + its WFM conditions, which live
 * in a separate WFM endpoint and are loaded/saved only with a WFM license.
 */
export type AgentCard = EngineAgent & {
	workingCondition?: WfmLookupEntity;
	pauseTemplate?: WfmLookupEntity;
};

const hasWfmLicense = () => useUserinfoStore().hasLicense(WebitelLicense.WFM);

const getAgent: typeof AgentsAPI.get = async (params) => {
	const agent = await AgentsAPI.get(params);
	if (!hasWfmLicense()) return agent;

	const conditions = await AgentWorkingConditionsAPI.get(params);
	return {
		...agent,
		...conditions,
	};
};

/** [Claude] Saves the agent first: a new one needs its id for the WFM request. */
const withWfmConditions =
	<
		Params extends {
			itemInstance: AgentCard;
		},
	>(
		saveAgent: (params: Params) => Promise<AgentCard>,
	) =>
	async (params: Params) => {
		const agent = await saveAgent(params);
		if (!hasWfmLicense()) return agent;

		const conditions = await AgentWorkingConditionsAPI.update({
			itemId: agent.id,
			itemInstance: params.itemInstance,
		});
		return {
			...agent,
			...conditions,
		};
	};

const standardValidationSchema = computed(() =>
	hasWfmLicense()
		? agentSchema.extend(agentWfmConditionsSchema.shape)
		: agentSchema,
);

export const useAgentsCardStore = createCardStore<AgentCard>({
	namespace: `${AgentsNamespace}/card`,
	apiModule: {
		...AgentsAPI,
		get: getAgent,
		add: withWfmConditions(AgentsAPI.add),
		update: withWfmConditions(AgentsAPI.update),
	},
	standardValidationSchema,
});
