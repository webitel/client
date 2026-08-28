import { ResourceDisplaysAPI } from '@webitel/api-services/api';
import applyTransform, {
	notify,
	snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers/index.js';

import instance from '../../../../../../app/api/instance';
import i18n from '../../../../../../app/locale/i18n';

const { t } = i18n.global;

/**
 * Bulk number upload. Stays here rather than in `@webitel/api-services`: it
 * posts multipart form data and words its validation error from an app-local
 * i18n key.
 */
const uploadNumbersFile = async ({ parentId, file, delimiter, map }) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('delimiter', delimiter);
	formData.append('map', map);

	try {
		const response = await instance.post(`/displays/${parentId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		throw applyTransform(err, [
			err.response?.data?.id?.includes('validatePhoneNumber')
				? notify(({ callback }) =>
						callback({
							type: 'error',
							text: t('validation.phoneNumbersFileUploadValidator'),
						}),
					)
				: notify,
		]);
	}
};

export default {
	getList: (params) => ResourceDisplaysAPI.getList(params),
	get: (params) => ResourceDisplaysAPI.get(params),
	add: (params) => ResourceDisplaysAPI.add(params),
	update: (params) => ResourceDisplaysAPI.update(params),
	delete: (params) => ResourceDisplaysAPI.delete(params),
	uploadNumbers: uploadNumbersFile,
};
