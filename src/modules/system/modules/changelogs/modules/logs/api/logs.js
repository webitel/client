import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { LoggerServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const service = new LoggerServiceApiFactory(configuration, '', instance);

const getList = async (params) => {
	const fieldsToSend = [
		'parentId',
		'page',
		'size',
		'search',
		'sort',
		'fields',
		'action',
		'user',
		'from',
		'to',
		'userIp',
	];

	const {
		parentId,
		page,
		size,
		search,
		sort,
		fields,
		action,
		user,
		from,
		to,
		userIp,
	} = applyTransform(params, [
		sanitize(fieldsToSend),
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await service.searchLogByConfigId(
			parentId,
			page,
			size,
			search,
			sort || '-date',
			fields,
			user,
			action,
			userIp,
			from,
			to,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items,
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const LogsAPI = {
	getList,
};

export default LogsAPI;
