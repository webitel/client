import {
  EndpointListGetterApiConsumer,
  EndpointGetterApiConsumer,
  EndpointCreatorApiConsumer,
  EndpointUpdaterApiConsumer,
  EndpointPatcherApiConsumer,
  EndpointDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import instance from '../../../../../app/api/instance';

const baseUrl = '/chat/bots';

const fieldsToSend = ['name', 'uri', 'flow', 'enabled', 'provider', 'metadata'];

const defaultListObject = { // default object prototype, to merge response with it to get all fields
  _isSelected: false,
  enabled: false,
  name: '',
  uri: '',
  flow: {},
  provider: '',
  metadata: {},
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
    data.metadata.allowOrigin = data.metadata.allowOrigin.map((obj) => obj.text).join();
  }
  if (data.metadata.openTimeout) {
    data.metadata.openTimeout = `${data.metadata.openTimeout}`;
  }
  data.metadata.timeoutIsActive = `${data.metadata.timeoutIsActive}`;
  return data;
};

const webChatResponseConverter = (data) => {
  data.metadata.allowOrigin = data.metadata.allowOrigin
    ? data.metadata.allowOrigin.split(',').map((origin) => ({ text: origin }))
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
  data.metadata.timeoutIsActive = data.metadata.timeoutIsActive === 'true';
  return data;
};

const preRequestHandler = (item) => {
  switch (item.provider) {
    case MessengerType.WEB_CHAT:
      item = webchatRequestConverter(item);
      break;
    default:
  }
  return item;
};

const baseItem = { _dirty: false };

const listGetter = new EndpointListGetterApiConsumer({ baseUrl, instance }, { defaultListObject });
const itemGetter = new EndpointGetterApiConsumer({ baseUrl, instance });
const itemCreator = new EndpointCreatorApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemUpdater = new EndpointUpdaterApiConsumer({ baseUrl, instance },
  { fieldsToSend, preRequestHandler });
const itemPatcher = new EndpointPatcherApiConsumer({ baseUrl, instance }, { fieldsToSend });
const itemDeleter = new EndpointDeleterApiConsumer({ baseUrl, instance });

itemGetter.responseHandler = (response) => {
  switch (response.provider) {
    case MessengerType.WEB_CHAT:
      response = webChatResponseConverter(response);
      break;
    default:
  };
  return {
    ...baseItem,
    ...response,
  };
};

export const getChatGatewayList = (params) => listGetter.getList({ ...params, searchQuery: 'q' });
export const getChatGateway = (params) => itemGetter.getItem(params);
export const addChatGateway = (params) => itemCreator.createItem(params);
export const updateChatGateway = (params) => itemUpdater.updateItem(params);
export const patchChatGateway = (params) => itemPatcher.patchItem(params);
export const deleteChatGateway = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getChatGatewayList,
  get: getChatGateway,
  add: addChatGateway,
  patch: patchChatGateway,
  update: updateChatGateway,
  delete: deleteChatGateway,
};
