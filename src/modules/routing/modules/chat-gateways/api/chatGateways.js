import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake, handleUnauthorized,
  merge, notify, snakeToCamel,
  starToSearch, log, sanitize,
  generateUrl, mergeEach,
} from '@webitel/ui-sdk/src/api/transformers';
import deepCopy from 'deep-copy';
import deepmerge from 'deepmerge';
import instance from '../../../../../app/api/instance';
import ChatGatewayProvider from '../enum/ChatGatewayProvider.enum';
import webChatGateway from '../store/_internals/providers/webChatGateway';

const baseUrl = '/chat/bots';
const fieldsToSend = [
  'name',
  'uri',
  'flow',
  'enabled',
  'provider',
  'metadata',
  'updates',
];

const convertWebchatSeconds = (num) => `${num}s`;

const parseTimeoutSeconds = (item) => (item.includes('s') ? parseInt(item.replace('/s', '/'), 10) : +item);

const webchatRequestConverter = (data) => {
  const copyData = deepCopy(data);
  if (data.metadata.readTimeout) {
    copyData.metadata.readTimeout = convertWebchatSeconds(data.metadata.readTimeout);
  }
  if (data.metadata.writeTimeout) {
    copyData.metadata.writeTimeout = convertWebchatSeconds(data.metadata.writeTimeout);
  }
  if (data.metadata.handshakeTimeout) {
    copyData.metadata.handshakeTimeout = convertWebchatSeconds(data.metadata.handshakeTimeout);
  }
  if (data.metadata.allowOrigin) {
    copyData.metadata.allowOrigin = data.metadata.allowOrigin.join();
  }

  copyData.metadata.view = JSON.stringify(data.metadata.view);
  copyData.metadata.chat = JSON.stringify(data.metadata.chat);
  copyData.metadata.appointment = JSON.stringify(data.metadata.appointment);
  copyData.metadata.alternativeChannels = JSON.stringify(data.metadata.alternativeChannels);
  copyData.metadata._btnCodeDirty = data.metadata._btnCodeDirty.toString();
  return copyData;
};

const messengerRequestConverter = (data) => {
  const copyData = deepCopy(data);
  copyData.metadata.instagramComments = data.metadata.instagramComments.toString();
  copyData.metadata.instagramMentions = data.metadata.instagramMentions.toString();
  return copyData;
};

const viberRequestConverter = (item) => {
  const copyItem = deepCopy(item);
  copyItem.metadata['btn.back.color'] = item.metadata.btnBackColor;
  delete copyItem.metadata.btnBackColor;
  copyItem.metadata['btn.font.color'] = item.metadata.btnFontColor;
  delete copyItem.metadata.btnFontColor;
  return copyItem;
};

const webChatResponseConverter = (data) => {
  const copyData = deepCopy(data);
  copyData.metadata.allowOrigin = data.metadata.allowOrigin
    ? data.metadata.allowOrigin.split(',')
    : [];
  if (data.metadata.readTimeout) {
    copyData.metadata.readTimeout = parseTimeoutSeconds(data.metadata.readTimeout);
  }
  if (data.metadata.writeTimeout) {
    copyData.metadata.writeTimeout = parseTimeoutSeconds(data.metadata.writeTimeout);
  }
  if (data.metadata.handshakeTimeout) {
    copyData.metadata.handshakeTimeout = parseTimeoutSeconds(data.metadata.handshakeTimeout);
  }
  if (data.metadata.view) {
    copyData.metadata.view = JSON.parse(data.metadata.view);
  }
  if (data.metadata.chat) {
    copyData.metadata.chat = JSON.parse(data.metadata.chat);
  }
  if (data.metadata.appointment) {
    copyData.metadata.appointment = JSON.parse(data.metadata.appointment);
  }
  if (data.metadata.alternativeChannels) {
    copyData.metadata.alternativeChannels = JSON.parse(data.metadata.alternativeChannels);
  }
  copyData.metadata._btnCodeDirty = (data.metadata._btnCodeDirty === 'true');

  return deepmerge(webChatGateway(), copyData);
};

const messengerResponseConverter = (item) => {
  const copyItem = deepCopy(item);
  copyItem.metadata.instagramComments = item.metadata.instagramComments === 'true';
  copyItem.metadata.instagramMentions = item.metadata.instagramMentions === 'true';
  return copyItem;
};

const viberResponseConverter = (item) => {
  const copyItem = deepCopy(item);
  if (item.metadata['btn.back.color']) copyItem.metadata.btnBackColor = item.metadata['btn.back.color'];
  if (item.metadata['btn.font.color']) copyItem.metadata.btnFontColor = item.metadata['btn.font.color'];
  return copyItem;
};

const preRequestHandler = (item) => {
  switch (item.provider) {
    case ChatGatewayProvider.WEBCHAT:
      return webchatRequestConverter(item);
    case ChatGatewayProvider.MESSENGER:
      return messengerRequestConverter(item);
    case ChatGatewayProvider.VIBER:
      return viberRequestConverter(item);
    default:
      return item;
  }
};

const getChatGatewayList = async (params) => {
  const fieldsToSend = ['page', 'size', 'q', 'sort', 'fields', 'id'];

  const defaultObject = {
    // default object prototype, to merge response with it to get all fields
    enabled: false,
    name: '',
    uri: '',
    flow: {},
    provider: '',
    metadata: {},
    updates: {
      title: '',
      close: '',
      join: '',
      left: '',
    },
  };

  const url = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
    (params) => ({ ...params, q: params.search }),
    sanitize(fieldsToSend),
    camelToSnake(),
    generateUrl(baseUrl),
  ]);
  try {
    const response = await instance.get(url);
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const getChatGateway = async ({ itemId: id }) => {

  const itemResponseHandler = (response) => {
    switch (response.provider) {
      case ChatGatewayProvider.WEBCHAT:
        return webChatResponseConverter(response);
      case ChatGatewayProvider.MESSENGER:
        return messengerResponseConverter(response);
      case ChatGatewayProvider.VIBER:
        return viberResponseConverter(response);
      default:
        return response;
    }
  };

  const url = `${baseUrl}/${id}`;

  try {
    const response = await instance.get(url);
    return applyTransform(response.data, [
      snakeToCamel(),
      itemResponseHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const addChatGateway = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);
  try {
    const response = await instance.post(baseUrl, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const updateChatGateway = async ({ itemInstance, itemId: id }) => {
  const item = applyTransform(itemInstance, [
    preRequestHandler,
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.put(url, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const patchChatGateway = async ({ changes, id }) => {
  const body = applyTransform(changes, [
    sanitize(fieldsToSend),
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
      handleUnauthorized,
      notify,
    ]);
  }
};

const deleteChatGateway = async ({ id }) => {
  const url = `${baseUrl}/${id}`;
  try {
    const response = await instance.delete(url);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const getLookup = (params) => getChatGatewayList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const ChatGatewaysAPI = {
  getList: getChatGatewayList,
  get: getChatGateway,
  add: addChatGateway,
  patch: patchChatGateway,
  update: updateChatGateway,
  delete: deleteChatGateway,
  getLookup,
};

export default ChatGatewaysAPI;
