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
  if (data.readTimeout) {
    data.readTimeout = convertWebchatSeconds(data.readTimeout);
  };
  if (data.writeTimeout) {
    data.writeTimeout = convertWebchatSeconds(data.writeTimeout);
  };
  if (data.handshakeTimeout) {
    data.handshakeTimeout = convertWebchatSeconds(data.handshakeTimeout);
  };
  if (data.allowOrigin) {
    data.allowOrigin = data.allowOrigin.map((obj) => obj.text).join();
  };
  if (data.openTimeout) {
    data.openTimeout = `${data.openTimeout}`;
  };
  data.timeoutIsActive = `${data.timeoutIsActive}`;
  return data;
};

const webChatResponseConverter = (data) => {
  data.allowOrigin = data.allowOrigin
    ? data.allowOrigin.split(',').map((origin) => ({ text: origin }))
    : [];
  if (data.readTimeout) {
    data.readTimeout = parseTimeoutSeconds(data.readTimeout);
  };
  if (data.writeTimeout) {
    data.writeTimeout = parseTimeoutSeconds(data.writeTimeout);
  };
  if (data.handshakeTimeout) {
    data.handshakeTimeout = parseTimeoutSeconds(data.handshakeTimeout);
  };
  data.timeoutIsActive = data.timeoutIsActive === 'true';
};

const preRequestHandler = (item) => {
  switch (item.provider) {
    case MessengerType.WEB_CHAT:
      webchatRequestConverter(item.metadata);
      return item;
    default:
      return item;
  }
};

const baseItem = { _dirty: false };

const listGetter = new APIListGetter(BASE_URL, { defaultListObject });
const itemGetter = new APIItemGetter(BASE_URL);
const itemCreator = new APICreator(BASE_URL, { fieldsToSend, preRequestHandler });
const itemUpdater = new APIUpdater(BASE_URL, { fieldsToSend, preRequestHandler });
const itemPatcher = new APIPatcher(BASE_URL, { fieldsToSend });
const itemDeleter = new APIItemDeleter(BASE_URL);

itemGetter.responseHandler = (response) => {
  if (response.provider === MessengerType.WEB_CHAT) {
    webChatResponseConverter(response.metadata);
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
