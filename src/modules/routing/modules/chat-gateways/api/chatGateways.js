import MessengerType from 'webitel-sdk/esm2015/enums/messenger-type.enum';
import APICreator from '../../../../../app/api/BaseAPIServices/Creator/ApiCreator';
import APIItemDeleter from '../../../../../app/api/BaseAPIServices/Deleter/ApiDeleter';
import APIItemGetter from '../../../../../app/api/BaseAPIServices/Getter/ApiGetter';
import APIListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/ApiListGetter';
import APIPatcher from '../../../../../app/api/BaseAPIServices/Patcher/ApiPatcher';
import APIUpdater from '../../../../../app/api/BaseAPIServices/Updater/ApiUpdater';

const BASE_URL = '/chat/bots';

const fieldsToSend = ['name', 'uri', 'flow', 'enabled', 'provider', 'metadata'];

const defaultListObject = { // default object prototype, to merge response with it to get all fields
  _isSelected: false,
  name: '',
  uri: '',
  flow: {},
  provider: '',
  metadata: {},
};

const convertWebchatSeconds = (num) => `${num}s`;

const preRequestHandler = (item) => {
  if (item.metadata.readTimeout) {
    item.metadata.readTimeout = convertWebchatSeconds(item.metadata.readTimeout);
  }
  if (item.metadata.writeTimeout) {
    item.metadata.writeTimeout = convertWebchatSeconds(item.metadata.writeTimeout);
  }
  if (item.metadata.handshakeTimeout) {
    item.metadata.handshakeTimeout = convertWebchatSeconds(item.metadata.handshakeTimeout);
  }
  if (item.metadata.allowOrigin) {
    item.metadata.allowOrigin = item.metadata.allowOrigin.map((obj) => obj.text).join();
  }
  if (item.metadata.view) {
    item.metadata.view = '';
  }
  return item;
};

const baseItem = { _dirty: false };
const parseTimeoutSeconds = (item) => (item.includes('s') ? parseInt(item.replace('/s', '/'), 10) : +item);

const listGetter = new APIListGetter(BASE_URL, { defaultListObject });
const itemGetter = new APIItemGetter(BASE_URL);
const itemCreator = new APICreator(BASE_URL, { fieldsToSend, preRequestHandler });
const itemUpdater = new APIUpdater(BASE_URL, { fieldsToSend, preRequestHandler });
const itemPatcher = new APIPatcher(BASE_URL, { fieldsToSend });
const itemDeleter = new APIItemDeleter(BASE_URL);

itemGetter.responseHandler = (response) => {
  if (response.provider === MessengerType.WEB_CHAT) {
    response.metadata.allowOrigin = response.metadata.allowOrigin
      ? response.metadata.allowOrigin.split(',').map((origin) => ({ text: origin }))
      : [];

    if (response.metadata.readTimeout) {
      response.metadata.readTimeout = parseTimeoutSeconds(response.metadata.readTimeout);
    }
    if (response.metadata.writeTimeout) {
      response.metadata.writeTimeout = parseTimeoutSeconds(response.metadata.writeTimeout);
    }
    if (response.metadata.handshakeTimeout) {
      response.metadata.handshakeTimeout = parseTimeoutSeconds(response.metadata.handshakeTimeout);
    }
    if (!response.metadata.view) {
      response.metadata.view = {};
    }
  }
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
