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
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { ImportTemplateServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const importCsvService = new ImportTemplateServiceApiFactory(
	configuration,
	'',
	instance,
);

const doNotConvertKeys = [
	'mappings',
];

/*
 * We need to preserve fields order because we draw them dynamically so that
 * we convert it to array before sending to backend and back
 * */
// const itemResponseHandler = (response) => {
//   // eslint-disable-next-line no-param-reassign
//   response.parameters.mappings = response.parameters.mappings
//   .reduce((mappings, { name, ...rest }) => ({ ...mappings, [name]: { ...rest } }), {});
//   return {
//     ...response,
//   };
// };

/*
 * We need to preserve fields order because we draw them dynamically so that
 * we convert it to array before sending to backend and back
 * */
// const preRequestHandler = (item) => {
//   const mappings = Object.entries(item.parameters.mappings)
//   .map(([name, value]) => ({ name, ...value }));
//   const _item = deepCopy(item);
//   _item.parameters.mappings = mappings;
//   return _item;
// };

const getList = async (params) => {
	const { page, size, search, sort, fields, id } = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
	]);

	try {
		const response = await importCsvService.searchImportTemplate(
			page,
			size,
			search,
			sort,
			fields,
			id,
		);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
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

const get = async ({ itemId: id }) => {
	try {
		const response = await importCsvService.readImportTemplate(id);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const fieldsToSend = [
	'description',
	'name',
	'parameters',
	'source',
	'sourceType',
];

const add = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await importCsvService.createImportTemplate(item);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patch = async ({ changes, id }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await importCsvService.updateImportTemplate(id, body);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const update = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(doNotConvertKeys),
	]);
	try {
		const response = await importCsvService.updateImportTemplate(id, item);
		return applyTransform(response.data, [
			snakeToCamel(doNotConvertKeys),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteItem = async ({ id }) => {
	try {
		const response = await importCsvService.deleteImportTemplate(id);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getLookup = (params) =>
	getList({
		...params,
		fields: params.fields || [
			'id',
			'name',
		],
	});

const ImportCsvAPI = {
	getList,
	get,
	add,
	patch,
	update,
	delete: deleteItem,
	getLookup,
};

export default ImportCsvAPI;
