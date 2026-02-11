import applyTransform, {
	camelToSnake,
	notify,
	snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers/index.js';

import instance from '../../../app/api/instance';

const baseUrl = 'users';

export const getWebPhone = async () => {
	const url = 'user/settings/phone';

	try {
		const response = await instance.get(url);
		return applyTransform(response.data, [
			snakeToCamel(),
		]);
	} catch (err) {
		if (err.response.status === 404) return;
		// phone settings doesn't exist on backend if user is new, and we have to hide notification about this error
		// https://webitel.atlassian.net/browse/WTEL-4346
		throw applyTransform(err, [
			notify,
		]);
	}
};

export const changeWebPhone = async (changes) => {
	const item = applyTransform(changes, [
		camelToSnake(),
	]);

	const url = 'user/settings/phone';

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

export const getRingtonesList = async () => {
	const url = `${import.meta.env.VITE_RINGTONES_URL}/index.json`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Response from '...ringtones/index.json' was not ok");
		}
		const ringtones = await response.json();
		return ringtones.ringtones;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const patchItem = async ({ changes, id }) => {
	const body = applyTransform(changes, [
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

export const changePassword = ({ id, changes }) =>
	patchItem({
		id,
		changes,
	});

export default {
	changePassword,
	changeWebPhone,
	getWebPhone,
	getRingtonesList,
};
