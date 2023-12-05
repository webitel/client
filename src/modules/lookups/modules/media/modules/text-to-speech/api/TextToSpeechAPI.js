import applyTransform, {
  notify,
  snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers';
import { objCamelToSnake } from '@webitel/ui-sdk/src/scripts/caseConverters';
import qs from 'query-string';
import instance from '../../../../../../../app/api/instance';

const getTtsStreamUrl = (params, apiUrl = false) => {
  const baseUrl = '/storage/tts/stream';
  let url = `${baseUrl}?${qs.stringify({
    ...objCamelToSnake(params),
    access_token: instance.defaults.headers['X-Webitel-Access'],
  })}`;
  if (apiUrl) url = `${import.meta.env.VITE_API_URL}${url}`;
  return url;
};

const getTts = async (params) => {
  const url = getTtsStreamUrl(params, true);
  console.log('url:', url);

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
