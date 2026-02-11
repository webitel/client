import applyTransform, {
	notify,
	snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { AgentServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import AgentsAPI from '../../../api/agents';

const subordinateService = new AgentServiceApiFactory(
	configuration,
	'',
	instance,
);

export const getAgentSubordinatesList = (params) => {
	const cleanedParams = {
		...params,
		fields: [
			'id',
			'name',
			'supervisor',
			'skills',
		],
		supervisorId: params.parentId,
	};
	cleanedParams.parentId = undefined;
	return AgentsAPI.getList(cleanedParams);
};

export const getAgentSubordinate = async ({ itemId: id }) => {
	const subordinateGetterResponseHandler = (agent) => ({
		agent,
	});

	try {
		const response = await subordinateService.readAgent(id);
		return applyTransform(response.data, [
			snakeToCamel(),
			subordinateGetterResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const addAgentSubordinate = ({ parentId, itemInstance }) => {
	const { id, supervisor } = itemInstance.agent;
	// Set and .map() from obj to string and backwards is used to prevent duplicates
	const newSupervisor = [
		...new Set(supervisor.map((sup) => sup.id).concat(parentId)),
	].map((id) => ({
		id,
	}));
	const changes = {
		supervisor: newSupervisor,
	};
	return AgentsAPI.patch({
		id,
		changes,
	});
};
export const deleteAgentSubordinate = ({ id, parentId, dataList }) => {
	/* deleted subordinate is in dataList,
   so first we should find it and retrieve his supervisors list */
	const subordinate = dataList.find((sup) => sup.id === id);
	const newSupervisor = subordinate.supervisor.filter(
		({ id }) => id !== parentId,
	);
	const changes = {
		supervisor: newSupervisor,
	};
	return AgentsAPI.patch({
		id,
		changes,
	});
};
export const updateAgentSubordinate = async ({
	parentId,
	itemId,
	itemInstance,
	dataList,
}) => {
	try {
		await addAgentSubordinate({
			parentId,
			itemInstance,
		});
		await deleteAgentSubordinate({
			id: itemId,
			parentId,
			dataList,
		});
	} catch (err) {
		throw err;
	}
};

const AgentSubordinatesAPI = {
	getList: getAgentSubordinatesList,
	get: getAgentSubordinate,
	add: addAgentSubordinate,
	update: updateAgentSubordinate,
	delete: deleteAgentSubordinate,
};

export default AgentSubordinatesAPI;
