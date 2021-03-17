import { RoutingOutboundCallServiceApiFactory } from 'webitel-sdk';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import SDKPatcher from '../../../../../app/api/BaseAPIServices/Patcher/SDKPatcher';
import SDKUpdater from '../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKCreator from '../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKGetter from '../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

const dialplanService = new RoutingOutboundCallServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'pattern', 'description', 'disabled'];

const defaultListObject = { _isSelected: false, disabled: false };

const listGetter = new SDKListGetter(dialplanService.searchRoutingOutboundCall,
  { defaultListObject });
const itemGetter = new SDKGetter(dialplanService.readRoutingOutboundCall);
const itemCreator = new SDKCreator(dialplanService.createRoutingOutboundCall, { fieldsToSend });
const itemUpdater = new SDKUpdater(dialplanService.updateRoutingOutboundCall, { fieldsToSend });
const itemPatcher = new SDKPatcher(dialplanService.patchRoutingOutboundCall, { fieldsToSend });
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
