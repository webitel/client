import applyTransform, {
  camelToSnake,
  generateUrl,
  notify,
  snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../../../app/api/instance';

const baseUrl = '/storage/tts/stream';

const getTtsStreamUrl = (params, apiUrl = false) => {
  let url = applyTransform(params, [
    (params) => ({
      ...params,
      access_token: instance.defaults.headers['X-Webitel-Access'],
    }),
    camelToSnake(),
    generateUrl(baseUrl),
  ]);

  if (apiUrl) url = `${process.env.VITE_API_URL}${url}`;

  return url;
};

const getTts = async (params) => {

  const url = getTtsStreamUrl(params);

  try {
    const response = await instance.get(url);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify(({ callback }) => callback({
        type: 'error',
        text: `Failed to process Text-to-Speech: ${err}`,
      })),
    ]);
  }
};

const TextToSpeechAPI = {
  getTtsStreamUrl,
  getTts,
};

export default TextToSpeechAPI;
