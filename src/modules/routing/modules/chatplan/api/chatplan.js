import { RoutingChatPlanServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkPatcherApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/old/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const chatplanService = new RoutingChatPlanServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'description', 'enabled'];

const defaultListObject = { enabled: false };

const listGetter = new SdkListGetterApiConsumer(chatplanService.searchChatPlan,
  { defaultListObject });
const itemGetter = new SdkGetterApiConsumer(chatplanService.readChatPlan);
const itemCreator = new SdkCreatorApiConsumer(chatplanService.createChatPlan,
  { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(chatplanService.updateChatPlan,
  { fieldsToSend });
const itemPatcher = new SdkPatcherApiConsumer(chatplanService.patchChatPlan,
  { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(chatplanService.deleteChatPlan);

const getChatplanList = (params) => listGetter.getList(params);
const getChatplan = (params) => itemGetter.getItem(params);
const addChatplan = (params) => itemCreator.createItem(params);
const patchChatplan = (params) => itemPatcher.patchItem(params);
const updateChatplan = (params) => itemUpdater.updateItem(params);
const deleteChatplan = (params) => itemDeleter.deleteItem(params);

const ChatplanAPI = {
  getList: getChatplanList,
  get: getChatplan,
  add: addChatplan,
  update: updateChatplan,
  delete: deleteChatplan,
  patch: patchChatplan,
};

export default ChatplanAPI;
