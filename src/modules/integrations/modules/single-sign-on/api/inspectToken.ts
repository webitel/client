import applyTransform, { notify } from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../app/api/instance';

const getToken = async ({ id }) => {
	try {
		const url = `/login/${id}/inspect`;
		const response = await instance.get(url);
		return response.data;
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const InspectTokenAPI = {
	get: getToken,
};

export default InspectTokenAPI;
