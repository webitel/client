import { RoutingSchemaServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const flowService = new RoutingSchemaServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'payload'];

const preRequestHandler = (item) => {
  // eslint-disable-next-line no-param-reassign
  item.schema = JSON.parse(item.schema);
  // eslint-disable-next-line no-param-reassign
  item.payload = {};
  return item;
};

const baseItem = { _dirty: false };

const listGetter = new SDKListGetter(flowService.searchRoutingSchema);
const itemGetter = new SDKGetter(flowService.readRoutingSchema);
const itemCreator = new SDKCreator(flowService.createRoutingSchema,
  fieldsToSend, preRequestHandler);
const itemUpdater = new SDKUpdater(flowService.updateRoutingSchema,
  fieldsToSend, preRequestHandler);
const itemDeleter = new SDKDeleter(flowService.deleteRoutingSchema);

itemGetter.responseHandler = (response) => ({
  ...baseItem,
  ...response,
  schema: JSON.stringify(response.schema, null, 4),
});

export const getFlowList = (params) => listGetter.getList(params);
export const getFlow = (params) => itemGetter.getItem(params);
export const addFlow = (params) => itemCreator.createItem(params);
export const updateFlow = (params) => itemUpdater.updateItem(params);
export const deleteFlow = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getFlowList,
  get: getFlow,
  add: addFlow,
  update: updateFlow,
  delete: deleteFlow,
};
