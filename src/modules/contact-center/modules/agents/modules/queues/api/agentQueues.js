import { AgentsAPI } from '@webitel/api-services/api';

const defaultObject = {
	countMembers: 0,
	waitingMembers: 0,
	type: 0,
};

const getAgentQueuesList = async (params) => {
	const { items, next } = await AgentsAPI.getAgentQueues(params);

	return {
		items: items.map((item) => ({
			...defaultObject,
			...item,
		})),
		next,
	};
};

const AgentQueuesAPI = {
	getList: getAgentQueuesList,
};

export default AgentQueuesAPI;
