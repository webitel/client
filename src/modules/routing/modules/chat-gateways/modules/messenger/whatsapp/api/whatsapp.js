import applyTransform, {
	mergeEach,
	notify,
	snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers/index.js';

import chatInstance, { chatBaseUrl } from '../../../../api/chatInstance';

const defaultListObject = {
	phoneNumbers: [],
};

const getList = async ({ uri }) => {
	const url = `${uri}?whatsapp=`;
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

const addOrRemovePagesUrl = (uri) => `${chatBaseUrl}${uri}?whatsapp=setup`;

const updateSubscribe = ({ uri, value, id }) => {
	const action = value ? 'subscribe' : 'unsubscribe';
	const url = `${uri}?whatsapp=${action}&id=${id}`;
	return chatInstance.get(url);
};

const deleteItem = ({ uri, id }) => {
	const url = `${uri}?whatsapp=remove&id=${id}&ack=true`;
	return chatInstance.get(url);
};

const WhatsappAPI = {
	getList,
	addOrRemovePagesUrl,
	updateSubscribe,
	delete: deleteItem,
};

export default WhatsappAPI;
