import { RoutingOutboundCallServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkPatcherApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const dialplanService = new RoutingOutboundCallServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'pattern', 'description', 'disabled'];

const defaultListObject = { _isSelected: false, disabled: false };

const listGetter = new SdkListGetterApiConsumer(dialplanService.searchRoutingOutboundCall,
  { defaultListObject });
const itemGetter = new SdkGetterApiConsumer(dialplanService.readRoutingOutboundCall);
const itemCreator = new SdkCreatorApiConsumer(dialplanService.createRoutingOutboundCall,
  { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(dialplanService.updateRoutingOutboundCall,
  { fieldsToSend });
const itemPatcher = new SdkPatcherApiConsumer(dialplanService.patchRoutingOutboundCall,
  { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(dialplanService.deleteRoutingOutboundCall);

const getDialplanList = (params) => listGetter.getList(params);
const getDialplan = (params) => itemGetter.getItem(params);
const addDialplan = (params) => itemCreator.createItem(params);
const patchDialplan = (params) => itemPatcher.patchItem(params);
const updateDialplan = (params) => itemUpdater.updateItem(params);
const deleteDialplan = (params) => itemDeleter.deleteItem(params);
const moveDialplan = async ({ fromId, toId }) => {
  try {
    await dialplanService.movePositionRoutingOutboundCall(fromId, toId, {});
    eventBus.$emit('notification', { type: 'info', text: 'Successfully updated' });
  } catch (err) {
    throw err;
  }
};

const DialplanAPI = {
  getList: getDialplanList,
  get: getDialplan,
  add: addDialplan,
  update: updateDialplan,
  delete: deleteDialplan,
  patch: patchDialplan,
  moveDialplan,
};

export default DialplanAPI;
