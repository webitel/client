import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	camelToSnake,
	generateUrl,
	merge,
	mergeEach,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';

import instance from '../../../../../app/api/instance';

const baseUrl = '/oauth/apps';

const getSingleSignOnList = async (params) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const defaultObject = {
		name: '',
		type: '',
		enabled: false,
	};

	const url = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
		generateUrl(baseUrl),
	]);
	try {
		const response = await instance.get(url);
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

const getSingleSignOn = async ({ itemId: id }) => {
	const defaultObject = {
		name: '',
		type: '',
		clientId: '',
		clientSecret: '',
		discoveryUrl: '',
		enabled: false,
		scopes: [],
	};

	const url = `${baseUrl}/${id}`;

	try {
		const response = await instance.get(url);
		return applyTransform(response.data, [
			snakeToCamel(),
			merge(defaultObject),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const fieldsToSend = [
	'name',
	'type',
	'id',
	'clientId',
	'clientSecret',
	'discoveryUrl',
	'enabled',
	'scopes',
];

const addSingleSignOn = async ({ itemInstance }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	try {
		const response = await instance.post(baseUrl, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};
const updateSingleSignOn = async ({ itemInstance, itemId: id }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);

	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.put(url, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchSingleSignOn = async ({ changes, id }) => {
	const body = applyTransform(changes, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.patch(url, body);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const deleteSingleSignOn = async ({ id }) => {
	const url = `${baseUrl}/${id}`;
	try {
		const response = await instance.delete(url);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const getSingleSignOnsLookup = (params) =>
	getSingleSignOnList({
		...params,
		fields: params.fields || [
			'id',
			'name',
			'type',
		],
	});

const SingleSignOnAPI = {
	getList: getSingleSignOnList,
	get: getSingleSignOn,
	add: addSingleSignOn,
	patch: patchSingleSignOn,
	update: updateSingleSignOn,
	delete: deleteSingleSignOn,
	getLookup: getSingleSignOnsLookup,
};

export default SingleSignOnAPI;
