import { RoutingOutboundCallServiceApiFactory } from 'webitel-sdk';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const dialplanService = new RoutingOutboundCallServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'pattern', 'description', 'disabled'];

const defaultListObject = { _isSelected: false, disabled: false };

const listGetter = new SDKListGetter(dialplanService.searchRoutingOutboundCall,
  { defaultListObject });
const itemGetter = new SDKGetter(dialplanService.readRoutingOutboundCall);
const itemCreator = new SDKCreator(dialplanService.createRoutingOutboundCall, fieldsToSend);
const itemUpdater = new SDKUpdater(dialplanService.updateRoutingOutboundCall, fieldsToSend);
const itemPatcher = new SDKPatcher(dialplanService.patchRoutingOutboundCall, fieldsToSend);
const itemDeleter = new SDKDeleter(dialplanService.deleteRoutingOutboundCall);

export const getDialplanList = (params) => listGetter.getList(params);
export const getDialplan = (params) => itemGetter.getItem(params);
export const addDialplan = (params) => itemCreator.createItem(params);
export const patchDialplan = (params) => itemPatcher.patchItem(params);
export const updateDialplan = (params) => itemUpdater.updateItem(params);
export const deleteDialplan = (params) => itemDeleter.deleteItem(params);
export const moveDialplan = async ({ fromId, toId }) => {
  try {
    await dialplanService.movePositionRoutingOutboundCall(fromId, toId, {});
    eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
  } catch (err) {
    throw err;
  }
};

export default {
  getList: getDialplanList,
  get: getDialplan,
  add: addDialplan,
  update: updateDialplan,
  delete: deleteDialplan,
  patch: patchDialplan,
  moveDialplan,
};
