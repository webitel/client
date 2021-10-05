import { RoutingSchemaServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import SDKUpdater from '../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKCreator from '../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKGetter from '../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

const flowService = new RoutingSchemaServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'payload', 'editor'];

const preRequestHandler = (item) => {
  // eslint-disable-next-line no-param-reassign
  if (typeof item.schema === 'string') item.schema = JSON.parse(item.schema);
  return item;
};

const defaultListObject = {
  editor: false,
};

const baseItem = { _dirty: false };

const listGetter = new SDKListGetter(flowService.searchRoutingSchema, { defaultListObject });
const itemGetter = new SDKGetter(flowService.readRoutingSchema);
const itemCreator = new SDKCreator(flowService.createRoutingSchema,
  { fieldsToSend, preRequestHandler });
const itemUpdater = new SDKUpdater(flowService.updateRoutingSchema,
  { fieldsToSend, preRequestHandler });
const itemDeleter = new SDKDeleter(flowService.deleteRoutingSchema);

itemGetter.responseHandler = (response) => ({
  ...baseItem,
  ...response,
  schema: JSON.stringify(response.schema, null, 4),
  editor: !!response.editor,
});

export const getFlowList = (params) => listGetter.getList(params);
export const getFlow = (params) => itemGetter.getItem(params);
export const addFlow = (params) => itemCreator.createItem(params);
export const updateFlow = (params) => itemUpdater.updateItem(params);
export const deleteFlow = (params) => itemDeleter.deleteItem(params);


// FIXME REFACTOR ALL COMPONENTS WITH WEBITEL-SDK CONSUMERS
const _listGetter = new SdkListGetterApiConsumer(flowService.searchRoutingSchema);
const getFlowsLookup = (params) => _listGetter.getLookup(params);

export default {
  getList: getFlowList,
  get: getFlow,
  add: addFlow,
  update: updateFlow,
  delete: deleteFlow,
  getLookup: getFlowsLookup,
};
