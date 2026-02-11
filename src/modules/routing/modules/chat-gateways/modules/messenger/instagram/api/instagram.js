import applyTransform, {
	mergeEach,
	notify,
	snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers/index.js';

import chatInstance, { chatBaseUrl } from '../../../../api/chatInstance';

const defaultListObject = {
	accounts: [],
};

const getList = async ({ uri }) => {
	const url = `${uri}?instagram=`;
	try {
		const response = await chatInstance.get(url);
		const { data } = applyTransform(response, [
			snakeToCamel(),
		]);
		return applyTransform(data, [
			mergeEach(defaultListObject),
		]);
	} catch (err) {
		throw applyTransform(err, [
			notify,
		]);
	}
};

const addOrRemovePagesUrl = (uri) => `${chatBaseUrl}/${uri}/?instagram=setup`;

const InstagramAPI = {
	getList,
	addOrRemovePagesUrl,
};

export default InstagramAPI;
