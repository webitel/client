import applyTransform, {
	camelToSnake,
	generateUrl,
	notify,
} from '@webitel/ui-sdk/src/api/transformers/index.js';

import instance from '../../../../../../../app/api/instance';

const getTtsStreamUrl = (params, apiUrl = false) => {
	const baseUrl = '/storage/tts/stream';
	let url = applyTransform(params, [
		(params) => ({
			...params,
			access_token: instance.defaults.headers['X-Webitel-Access'],
		}),
		camelToSnake(),
		generateUrl(baseUrl),
	]);
	if (apiUrl) url = `${import.meta.env.VITE_API_URL}${url}`;
	return url;
};

const getTts = async (params) => {
	const url = getTtsStreamUrl(params, true);

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(response.status);
		return response.blob();
	} catch (err) {
		throw applyTransform(err, [
			notify(({ callback }) =>
				callback({
					type: 'error',
					text: `Failed to process Text-to-Speech: ${err}`,
				}),
			),
		]);
	}
};

const TextToSpeechAPI = {
	getTtsStreamUrl,
	getTts,
};

export default TextToSpeechAPI;
