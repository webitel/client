import {
  EndpointListGetterApiConsumer,
  EndpointGetterApiConsumer,
  EndpointCreatorApiConsumer,
  EndpointUpdaterApiConsumer,
  EndpointPatcherApiConsumer,
  EndpointDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import deepmerge from 'deepmerge';
import instance from '../../../../../app/api/instance';
import ChatGatewayProvider from '../enum/ChatGatewayProvider.enum';
import webChatGateway from '../store/_internals/providers/webChatGateway';

const baseUrl = '/chat/bots';

const fieldsToSend = ['name', 'uri', 'flow', 'enabled', 'provider', 'metadata', 'updates'];

const defaultListObject = { // default object prototype, to merge response with it to get all fields
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

const convertWebchatSeconds = (num) => `${num}s`;

const parseTimeoutSeconds = (item) => (item.includes('s') ? parseInt(item.replace('/s', '/'), 10) : +item);

const webchatRequestConverter = (data) => {
  if (data.metadata.readTimeout) {
    data.metadata.readTimeout = convertWebchatSeconds(data.metadata.readTimeout);
  }
  if (data.metadata.writeTimeout) {
    data.metadata.writeTimeout = convertWebchatSeconds(data.metadata.writeTimeout);
  }
  if (data.metadata.handshakeTimeout) {
    data.metadata.handshakeTimeout = convertWebchatSeconds(data.metadata.handshakeTimeout);
  }
  if (data.metadata.allowOrigin) {
    data.metadata.allowOrigin = data.metadata.allowOrigin.join();
  }

  data.metadata.view = JSON.stringify(data.metadata.view);
  data.metadata.chat = JSON.stringify(data.metadata.chat);
  data.metadata.appointment = JSON.stringify(data.metadata.appointment);
  data.metadata.alternativeChannels = JSON.stringify(data.metadata.alternativeChannels);
  data.metadata._btnCodeDirty = data.metadata._btnCodeDirty.toString();
  return data;
};

const messengerRequestConverter = (data) => {
  data.metadata.instagramComments = data.metadata.instagramComments.toString();
  data.metadata.instagramMentions = data.metadata.instagramMentions.toString();
  return data;
};

const viberRequestConverter = (item) => {
  item.metadata['btn.back.color'] = item.metadata.btnBackColor;
  delete item.metadata.btnBackColor;
  item.metadata['btn.font.color'] = item.metadata.btnFontColor;
  delete item.metadata.btnFontColor;
  return item;
};

const webChatResponseConverter = (data) => {
  data.metadata.allowOrigin = data.metadata.allowOrigin
    ? data.metadata.allowOrigin.split(',')
    : [];
  if (data.metadata.readTimeout) {
    data.metadata.readTimeout = parseTimeoutSeconds(data.metadata.readTimeout);
  }
  if (data.metadata.writeTimeout) {
    data.metadata.writeTimeout = parseTimeoutSeconds(data.metadata.writeTimeout);
  }
  if (data.metadata.handshakeTimeout) {
    data.metadata.handshakeTimeout = parseTimeoutSeconds(data.metadata.handshakeTimeout);
  }
  if (data.metadata.view) {
    data.metadata.view = JSON.parse(data.metadata.view);
  }
  if (data.metadata.chat) {
    data.metadata.chat = JSON.parse(data.metadata.chat);
  }
  if (data.metadata.appointment) {
    data.metadata.appointment = JSON.parse(data.metadata.appointment);
  }
  if (data.metadata.alternativeChannels) {
    data.metadata.alternativeChannels = JSON.parse(data.metadata.alternativeChannels);
  }
  data.metadata._btnCodeDirty = (data.metadata._btnCodeDirty === 'true');

  return deepmerge(webChatGateway(), data);
};

const messengerResponseConverter = (item) => {
  item.metadata.instagramComments = item.metadata.instagramComments === 'true';
  item.metadata.instagramMentions = item.metadata.instagramMentions === 'true';
  return item;
};

const viberResponseConverter = (item) => {
  if (item.metadata['btn.back.color']) item.metadata.btnBackColor = item.metadata['btn.back.color'];
  if (item.metadata['btn.font.color']) item.metadata.btnFontColor = item.metadata['btn.font.color'];
  return item;
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

const listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance }, { defaultListObject });
const itemGetter = new EndpointGetterApiConsumer({ baseUrl, instance }, { itemResponseHandler });
const itemCreator = new EndpointCreatorApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemUpdater = new EndpointUpdaterApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemPatcher = new EndpointPatcherApiConsumer({ baseUrl, instance }, { fieldsToSend });
const itemDeleter = new EndpointDeleterApiConsumer({ baseUrl, instance });
const lookupGetter = new EndpointListGetterApiConsumer({ baseUrl, instance });

const getChatGatewayList = (params) => listGetter.getList(params);
const getChatGateway = (params) => itemGetter.getItem(params);
const addChatGateway = (params) => itemCreator.createItem(params);
const updateChatGateway = (params) => itemUpdater.updateItem(params);
const patchChatGateway = (params) => itemPatcher.patchItem(params);
const deleteChatGateway = (params) => itemDeleter.deleteItem(params);
const getLookup = (params) => lookupGetter.getLookup(params);

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
