import APIItemDeleter from '../../../../../app/api/BaseAPIServices/Deleter/ApiDeleter';
import APIUpdater from '../../../../../app/api/BaseAPIServices/Updater/ApiUpdater';
import APICreator from '../../../../../app/api/BaseAPIServices/Creator/ApiCreator';
import APIPatcher from '../../../../../app/api/BaseAPIServices/Patcher/ApiPatcher';
import APIItemGetter from '../../../../../app/api/BaseAPIServices/Getter/ApiGetter';
import APIListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/ApiListGetter';

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

const listGetter = new APIListGetter(BASE_URL, { defaultListObject });
const itemGetter = new APIItemGetter(BASE_URL);
const itemCreator = new APICreator(BASE_URL, { fieldsToSend });
const itemUpdater = new APIUpdater(BASE_URL, { fieldsToSend });
const itemPatcher = new APIPatcher(BASE_URL, { fieldsToSend });
const itemDeleter = new APIItemDeleter(BASE_URL);

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
