import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import qs from 'query-string';
import { objCamelToSnake } from '@webitel/ui-sdk/src/scripts/caseConverters';
import instance from '../../../../../../../app/api/old/instance';

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
  try {
    const url = getTtsStreamUrl(params, true);
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.status);
    return response.blob();
  } catch (err) {
    eventBus.$emit('notification', {
      type: 'error',
      text: `Failed to process Text-to-Speech: ${err}`,
    });
    throw err;
  }
};

const TextToSpeechAPI = {
  getTtsStreamUrl,
  getTts,
};

export default TextToSpeechAPI;
