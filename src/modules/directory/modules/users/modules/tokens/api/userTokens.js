import {
	getDefaultGetListResponse,
	getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
	camelToSnake,
	generateUrl,
	log,
	merge,
	notify,
	sanitize,
	snakeToCamel,
	starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';

import instance from '../../../../../../../app/api/instance';

const baseUrl = '/users';
const nestedUrl = 'tokens';
const fieldsToSend = [
	'token',
	'usage',
];

const getTokensList = async ({ parentId, ...rest }) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'fields',
		'id',
	];

	const url = applyTransform(rest, [
		log,
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
		generateUrl(`${baseUrl}/${parentId}/${nestedUrl}`),
	]);
	try {
		const response = await instance.get(url);
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
const addToken = async ({ itemInstance, parentId }) => {
	const item = applyTransform(itemInstance, [
		sanitize(fieldsToSend),
		camelToSnake(),
	]);
	const url = `${baseUrl}/${parentId}/${nestedUrl}`;
	try {
		const response = await instance.post(url, item);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};
const deleteToken = async ({ id, parentId }) => {
	const url = `${baseUrl}/${parentId}/${nestedUrl}/${id}`;
	try {
		const response = await instance.delete(url);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const UserTokensAPI = {
	getList: getTokensList,
	add: addToken,
	delete: deleteToken,
};

export default UserTokensAPI;
