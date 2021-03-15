import { RoutingSchemaServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
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
const itemCreator = new SDKItemCreator(flowService.createRoutingSchema,
  fieldsToSend, preRequestHandler);
const itemUpdater = new SDKItemUpdater(flowService.updateRoutingSchema,
  fieldsToSend, preRequestHandler);
const itemDeleter = new SDKItemDeleter(flowService.deleteRoutingSchema);

itemGetter.responseHandler = (response) => ({
  ...baseItem,
  ...response,
  schema: JSON.stringify(response.schema, null, 4),
});

export const getFlowList = (params) => listGetter.getList(params);
export const getFlow = (params) => itemGetter.getItem(params);
export const addFlow = (params) => itemCreator.createItem(params);
export const updateFlow = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteFlow = ({ id }) => itemDeleter.deleteItem(id);

export default {
  getList: getFlowList,
  get: getFlow,
  add: addFlow,
  update: updateFlow,
  delete: deleteFlow,
};
