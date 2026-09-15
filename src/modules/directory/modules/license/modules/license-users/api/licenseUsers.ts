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

const baseUrl = '/products';
const nestedUrl = 'users';

const getList = async ({
	parentId,
	...rest
}: Record<string, unknown> & {
	parentId?: string;
}) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const defaultObject = {
		sessions: 0,
	};

	const url = applyTransform(rest, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		starToSearch('q'),
		(params: Record<string, unknown>) => ({
			...params,
			q: params.q ?? params.search,
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

export const LicenseUsersAPI = {
	getList,
};

export default LicenseUsersAPI;
