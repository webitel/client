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

const preRequestHandler = (item) => {
  switch (item.provider) {
    case ChatGatewayProvider.WEBCHAT:
      return webchatRequestConverter(item);
    default:
      return item;
  }
};

const listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance }, { defaultListObject });
const itemGetter = new EndpointGetterApiConsumer({ baseUrl, instance });
const itemCreator = new EndpointCreatorApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemUpdater = new EndpointUpdaterApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemPatcher = new EndpointPatcherApiConsumer({ baseUrl, instance }, { fieldsToSend });
const itemDeleter = new EndpointDeleterApiConsumer({ baseUrl, instance });
const lookupGetter = new EndpointListGetterApiConsumer({ baseUrl, instance });

itemGetter.responseHandler = (response) => {
  switch (response.provider) {
    case ChatGatewayProvider.WEBCHAT:
      return webChatResponseConverter(response);
    default:
      return response;
  }
};

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
