import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { AgentServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const getQueueAgentsList = async (params) => {
	const fieldsToSend = [
		'page',
		'size',
		'search',
		'sort',
		'fields',
		'id',
		'parentId',
	];
	const fields = [
		'id',
		'name',
		'status',
		'supervisor',
		'skills',
	];

	const defaultObject = {
		name: '',
		status: '',
		supervisor: {},
		skills: [],
	};

	const {
		parentId,
		page = 1,
		size = 10,
		search,
		sort,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		sanitize(fieldsToSend),
	]);

	try {
		const response = await agentService.searchAgent(
			page,
			size,
			search,
			sort,
			fields,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			parentId,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				mergeEach(defaultObject),
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const QueueAgentsAPI = {
	getList: getQueueAgentsList,
};

export default QueueAgentsAPI;
