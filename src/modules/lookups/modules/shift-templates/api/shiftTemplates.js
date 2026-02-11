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
import { ShiftTemplateServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const shiftTemplateService = new ShiftTemplateServiceApiFactory(
	configuration,
	'',
	instance,
);

const getShiftTemplateList = async (params) => {
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
		const response = await shiftTemplateService.searchShiftTemplate(
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
	const copy = {
		...item.item,
	};

	copy.times = copy.times?.map(
		(time) => ({
			...time,
			duration: time.end - time.start,
		}),
		[],
	);

	return copy;
};

const getShiftTemplate = async ({ itemId: id }) => {
	try {
		const response = await shiftTemplateService.readShiftTemplate(id);
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
	'times',
];

const addShiftTemplate = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await shiftTemplateService.createShiftTemplate({
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

const updateShiftTemplate = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await shiftTemplateService.updateShiftTemplate(id, {
			item: {
				...item,
			},
		});
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteShiftTemplate = async ({ id }) => {
	try {
		const response = await shiftTemplateService.deleteShiftTemplate(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getShiftTemplatesLookup = (params) =>
	getShiftTemplateList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const ShiftTemplatesAPI = {
	getList: getShiftTemplateList,
	get: getShiftTemplate,
	add: addShiftTemplate,
	update: updateShiftTemplate,
	delete: deleteShiftTemplate,
	getLookup: getShiftTemplatesLookup,
};

export default ShiftTemplatesAPI;
