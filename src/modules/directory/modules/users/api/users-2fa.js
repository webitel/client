import applyTransform, {
	notify,
} from '@webitel/ui-sdk/src/api/transformers/index.js';

import instance from '../../../../../app/api/instance';

const generateUrl = async ({ id }) => {
	const url = `users/${id}/2fa`;

	try {
		const response = await instance.post(url, {});
		return applyTransform(response.data, []);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const Users2faAPI = {
	generate: generateUrl,
};

export default Users2faAPI;
