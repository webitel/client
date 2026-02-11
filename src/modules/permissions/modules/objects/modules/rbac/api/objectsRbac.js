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

import instance from '../../../../../../../app/api/instance';
import APIPermissionsGetter from '../../../../../../../app/api/PermissionsAPIService/APIPermissionsGetter';

const baseUrl = '/acl/objclass';
const nestedURL = 'grantor';

export const getObjclassDefaultList = async (params) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const url = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		(params) => ({
			...params,
			q: params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
		generateUrl(`${baseUrl}/${params.parentId}`),
	]);

	try {
		const response = await instance.get(url);
		const { items, next } = applyTransform(response.data, [
			snakeToCamel(),
			merge(getDefaultGetListResponse()),
		]);
		return {
			items: applyTransform(items, [
				APIPermissionsGetter.handlePermissionsList,
			]),
			next,
		};
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const patchObjclassDefaultMode = async ({ changes, parentId, id }) => {
	const body = applyTransform(changes, [
		camelToSnake(),
	]);

	const url = `${baseUrl}/${parentId}/${nestedURL}/${id}`;

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
