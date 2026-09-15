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

const LICENSE_URL = '/license';
const CUSTOMER_URL = '/customer';

const getLicenseList = async (params: Record<string, unknown>) => {
	const fieldsToSend = [
		'page',
		'size',
		'q',
		'sort',
		'fields',
		'id',
	];

	const defaultObject = {
		remain: 0,
		limit: 0,
	};

	const url = applyTransform(params, [
		merge(getDefaultGetParams()),
		starToSearch('search'),
		starToSearch('q'),
		(params: Record<string, unknown>) => ({
			...params,
			// filtersManager may pass `q` (Path A) or legacy `search`
			q: params.q ?? params.search,
		}),
		sanitize(fieldsToSend),
		camelToSnake(),
		generateUrl(LICENSE_URL),
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

const updateLicense = async (data: { certificate: string }) => {
	try {
		const response = await instance.put(CUSTOMER_URL, data);
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const LicenseAPI = {
	getList: getLicenseList,
	update: updateLicense,
};

export default LicenseAPI;
