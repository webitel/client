import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	merge,
	notify,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { TriggerServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const triggerLogsService = new TriggerServiceApiFactory(
	configuration,
	'',
	instance,
);

const getList = async (params) => {
	const {
		parentId,
		page,
		size,
		q,
		sort,
		fields,
		startedAtFrom,
		startedAtTo,
		durationFrom,
		durationTo,
		result,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await triggerLogsService.searchTriggerJob(
			parentId,
			page,
			size,
			q,
			sort,
			fields,
			undefined,
			undefined,
			startedAtFrom,
			startedAtTo,
			durationFrom,
			durationTo,
			result,
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

const TriggersLogAPI = {
	getList,
};

export default TriggersLogAPI;
