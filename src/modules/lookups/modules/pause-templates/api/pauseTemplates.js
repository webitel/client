import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	camelToSnake,
	merge,
	notify,
	sanitize,
	snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import deepCopy from 'deep-copy';
import { PauseTemplateServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const pauseTemplateService = new PauseTemplateServiceApiFactory(
	configuration,
	'',
	instance,
);

const getPauseTemplateList = async (params) => {
	const {
		search: q,
		page,
		size,
		sort,
		fields,
	} = applyTransform(params, [
		merge(getDefaultGetParams()),
	]);

	try {
		const response = await pauseTemplateService.searchPauseTemplate(
			q,
			page,
			size,
			sort,
			fields,
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

const itemResponseHandler = (item) => {
	const obj = {
		...item.item,
	};

	obj.causes = obj.causes?.map((cause) => {
		return {
			id: cause.cause?.id,
			name: cause.cause?.name,
			duration: cause?.duration,
		};
	}, []);
	return obj;
};

const preRequestHandler = (item) => {
	const copy = deepCopy(item);
	copy.causes = copy.causes.map((cause) => {
		if (!cause.name && !cause.id) return cause;
		return {
			cause: {
				id: cause?.id,
				name: cause?.name,
			},
			duration: cause.duration,
		};
	});
	return copy;
};

const getPauseTemplate = async ({ itemId: id }) => {
	try {
		const response = await pauseTemplateService.readPauseTemplate(id);
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const fieldsToSend = [
	'name',
	'description',
	'causes',
	'domainId',
	'createdAt',
	'createdBy',
	'updatedAt',
	'updatedBy',
];

const addPauseTemplate = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
		preRequestHandler,
	]);
	try {
		const response = await pauseTemplateService.createPauseTemplate({
			item: {
				...item,
			},
		});
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const updatePauseTemplate = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
		preRequestHandler,
	]);
	try {
		const response = await pauseTemplateService.updatePauseTemplate(id, {
			item: {
				...item,
			},
		});
		return applyTransform(response.data, [
			snakeToCamel(),
			itemResponseHandler,
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteShiftTemplate = async ({ id }) => {
	try {
		const response = await pauseTemplateService.deletePauseTemplate(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getPauseTemplatesLookup = (params) =>
	getPauseTemplateList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const PauseTemplatesAPI = {
	getList: getPauseTemplateList,
	get: getPauseTemplate,
	add: addPauseTemplate,
	update: updatePauseTemplate,
	delete: deleteShiftTemplate,
	getLookup: getPauseTemplatesLookup,
};

export default PauseTemplatesAPI;
