import {
  EngineRoutingSchemaType,
  RoutingSchemaServiceApiFactory,
} from 'webitel-sdk';
import {
  SdkCreatorApiConsumer,
  SdkDeleterApiConsumer,
  SdkGetterApiConsumer,
  SdkListGetterApiConsumer,
  SdkUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const flowService = new RoutingSchemaServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'type', 'payload', 'editor'];

const preRequestHandler = (item) => {
  // eslint-disable-next-line no-param-reassign
  if (typeof item.schema === 'string') item.schema = JSON.parse(item.schema);
  return item;
};

const defaultListObject = {
  editor: false,
};

const _getFlowsList = (getList) => function({
                                              page,
                                              size,
                                              search,
                                              sort,
                                              fields,
                                              ids,
                                              name,
                                              type,
                                            }) {
  const params = [
    page,
    size,
    search,
    sort,
    fields,
    ids,
    name,
    type.concat(EngineRoutingSchemaType.Default),
  ];
  return getList(params);
};

const listGetter = new SdkListGetterApiConsumer(
  flowService.searchRoutingSchema,
  { defaultListObject },
).setGetListMethod(_getFlowsList);
const itemGetter = new SdkGetterApiConsumer(flowService.readRoutingSchema);
const itemCreator = new SdkCreatorApiConsumer(
  flowService.createRoutingSchema,
  { fieldsToSend, preRequestHandler },
);
const itemUpdater = new SdkUpdaterApiConsumer(
  flowService.updateRoutingSchema,
  { fieldsToSend, preRequestHandler },
);
const itemDeleter = new SdkDeleterApiConsumer(flowService.deleteRoutingSchema);

itemGetter.responseHandler = (response) => ({
  ...response,
  schema: JSON.stringify(response.schema, null, 4),
  editor: !!response.editor,
});

const getFlowList = (params) => listGetter.getList(params);
const getFlow = (params) => itemGetter.getItem(params);
const addFlow = (params) => itemCreator.createItem(params);
const updateFlow = (params) => itemUpdater.updateItem(params);
const deleteFlow = (params) => itemDeleter.deleteItem(params);
const getFlowsLookup = (params) => listGetter.getLookup(params);

const FlowsAPI = {
  getList: getFlowList,
  get: getFlow,
  add: addFlow,
  update: updateFlow,
  delete: deleteFlow,
  getLookup: getFlowsLookup,
};

export default FlowsAPI;
