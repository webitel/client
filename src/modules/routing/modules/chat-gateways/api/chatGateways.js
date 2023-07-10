// import {
//   EndpointListGetterApiConsumer,
//   EndpointGetterApiConsumer,
//   EndpointCreatorApiConsumer,
//   EndpointUpdaterApiConsumer,
//   EndpointPatcherApiConsumer,
//   EndpointDeleterApiConsumer,
// } from 'webitel-sdk/esm2015/api-consumers';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake, generateUrl,
  handleUnauthorized,
  merge, mergeEach, notify, sanitize, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import deepCopy from 'deep-copy';
import deepmerge from 'deepmerge';
import instance from '../../../../../app/api/instance';
import ChatGatewayProvider from '../enum/ChatGatewayProvider.enum';
import webChatGateway from '../store/_internals/providers/webChatGateway';

const baseUrl = '/chat/bots';

const fieldsToSend = ['name', 'uri', 'flow', 'enabled', 'provider', 'metadata', 'updates'];

const convertWebchatSeconds = (num) => `${num}s`;

const parseTimeoutSeconds = (item) => (item.includes('s') ? parseInt(item.replace('/s', '/'), 10) : +item);

const webchatRequestConverter = (data) => {
  const copy = deepCopy(data);
  if (copy.metadata.readTimeout) {
    copy.metadata.readTimeout = convertWebchatSeconds(copy.metadata.readTimeout);
  }
  if (copy.metadata.writeTimeout) {
    copy.metadata.writeTimeout = convertWebchatSeconds(copy.metadata.writeTimeout);
  }
  if (copy.metadata.handshakeTimeout) {
    copy.metadata.handshakeTimeout = convertWebchatSeconds(copy.metadata.handshakeTimeout);
  }
  if (copy.metadata.allowOrigin) {
    copy.metadata.allowOrigin = copy.metadata.allowOrigin.join();
  }

  copy.metadata.view = JSON.stringify(copy.metadata.view);
  copy.metadata.chat = JSON.stringify(copy.metadata.chat);
  copy.metadata.appointment = JSON.stringify(copy.metadata.appointment);
  copy.metadata.alternativeChannels = JSON.stringify(copy.metadata.alternativeChannels);
  copy.metadata._btnCodeDirty = copy.metadata._btnCodeDirty.toString();
  return copy;
};

const messengerRequestConverter = (data) => {
  const copy = deepCopy(data);
  copy.metadata.instagramComments = copy.metadata.instagramComments.toString();
  copy.metadata.instagramMentions = copy.metadata.instagramMentions.toString();
  return copy;
};

const viberRequestConverter = (item) => {
  const copy = deepCopy(item);
  copy.metadata['btn.back.color'] = copy.metadata.btnBackColor;
  delete copy.metadata.btnBackColor;
  copy.metadata['btn.font.color'] = copy.metadata.btnFontColor;
  delete copy.metadata.btnFontColor;
  return copy;
};

const webChatResponseConverter = (data) => {
  const copy = deepCopy(data);
  copy.metadata.allowOrigin = copy.metadata.allowOrigin
    ? copy.metadata.allowOrigin.split(',')
    : [];
  if (copy.metadata.readTimeout) {
    copy.metadata.readTimeout = parseTimeoutSeconds(copy.metadata.readTimeout);
  }
  if (copy.metadata.writeTimeout) {
    copy.metadata.writeTimeout = parseTimeoutSeconds(copy.metadata.writeTimeout);
  }
  if (copy.metadata.handshakeTimeout) {
    copy.metadata.handshakeTimeout = parseTimeoutSeconds(copy.metadata.handshakeTimeout);
  }
  if (copy.metadata.view) {
    copy.metadata.view = JSON.parse(copy.metadata.view);
  }
  if (copy.metadata.chat) {
    copy.metadata.chat = JSON.parse(copy.metadata.chat);
  }
  if (copy.metadata.appointment) {
    copy.metadata.appointment = JSON.parse(copy.metadata.appointment);
  }
  if (copy.metadata.alternativeChannels) {
    copy.metadata.alternativeChannels = JSON.parse(copy.metadata.alternativeChannels);
  }
  copy.metadata._btnCodeDirty = (copy.metadata._btnCodeDirty === 'true');

  return deepmerge(webChatGateway(), copy);
};

const messengerResponseConverter = (item) => {
  const copy = deepCopy(item);
  copy.metadata.instagramComments = copy.metadata.instagramComments === 'true';
  copy.metadata.instagramMentions = copy.metadata.instagramMentions === 'true';
  return copy;
};

const viberResponseConverter = (item) => {
  const copy = deepCopy(item);
  if (copy.metadata['btn.back.color']) copy.metadata.btnBackColor = copy.metadata['btn.back.color'];
  if (copy.metadata['btn.font.color']) copy.metadata.btnFontColor = copy.metadata['btn.font.color'];
  return copy;
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
  const responseHandler = (response) => {
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
      responseHandler,
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
