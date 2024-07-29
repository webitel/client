import applyTransform, {
  mergeEach,
  notify,
  snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers';
import chatInstance, { chatBaseUrl } from '../../../../api/chatInstance';

const defaultListObject = {
  accounts: [],
};

const token = localStorage.getItem('access-token');

const getList = async ({ uri }) => {
  const url = `${uri}?pages=`;
  try {
    const response = await chatInstance.get(url);
    const { data } = applyTransform(response, [snakeToCamel()]);
    return applyTransform(data, [mergeEach(defaultListObject)]);
  } catch (err) {
    throw applyTransform(err, [notify]);
  }
};

const addOrRemovePagesUrl = (uri) => `${chatBaseUrl}/${uri}/?pages=setup?access_token=${token}`;

const updateSubscribe = ({ uri, value, id }) => {
  const action = value ? 'subscribe' : 'unsubscribe';
  const url = `${uri}?pages=${action}&id=${id}`;
  return chatInstance.get(url);
};

const FacebookAPI = {
  getList,
  addOrRemovePagesUrl,
  updateSubscribe,
};

export default FacebookAPI;
