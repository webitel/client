import { RoutingOutboundCallServiceApiFactory } from 'webitel-sdk';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemPatcher from '../../utils/ApiControllers/Patcher/SDKPatcher';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKItemGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const dialplanService = new RoutingOutboundCallServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'pattern', 'description', 'disabled'];

const defaultListObject = { _isSelected: false, disabled: false };

const listGetter = new SDKListGetter(dialplanService.searchRoutingOutboundCall, defaultListObject);
const itemGetter = new SDKItemGetter(dialplanService.readRoutingOutboundCall);
const itemCreator = new SDKItemCreator(dialplanService.createRoutingOutboundCall, fieldsToSend);
const itemUpdater = new SDKItemUpdater(dialplanService.updateRoutingOutboundCall, fieldsToSend);
const itemPatcher = new SDKItemPatcher(dialplanService.patchRoutingOutboundCall, fieldsToSend);
const itemDeleter = new SDKItemDeleter(dialplanService.deleteRoutingOutboundCall);

export const getDialplanList = (params) => listGetter.getList(params);
export const getDialplan = ({ itemId }) => itemGetter.getItem(itemId);
export const addDialplan = ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const patchDialplan = ({ id, changes }) => itemPatcher.patchItem(id, changes);
export const updateDialplan = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteDialplan = ({ id }) => itemDeleter.deleteItem(id);
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
