import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {RoutingSchemaServiceApiFactory} from 'webitel-sdk';
import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

const flowService = new RoutingSchemaServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'schema', 'payload'];

const preRequestHandler = (item) => {
    item.schema = JSON.parse(item.schema);
    item.payload = {};
    return item;
};

const listGetter = new WebitelSDKListGetter(flowService.searchRoutingSchema);
const itemGetter = new WebitelSDKItemGetter(flowService.readRoutingSchema);
const itemCreator = new WebitelSDKItemCreator(flowService.createRoutingSchema, fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelSDKItemUpdater(flowService.updateRoutingSchema, fieldsToSend, preRequestHandler);
const itemDeleter = new WebitelSDKItemDeleter(flowService.deleteRoutingSchema);

itemGetter.responseHandler = (response) => {
    let defaultObject = {
        _dirty: false,
    };
    return {
        ...response,
        schema: JSON.stringify(response.schema, null, 4),
        ...defaultObject
    };
};

export const getFlowList = async (page = 0, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getFlow = async (id) => {
    return await itemGetter.getItem(id);
};

export const addFlow = async (item) => {
    return await itemCreator.createItem(item);
};

export const updateFlow = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
};

export const deleteFlow = async (id) => {
    return await itemDeleter.deleteItem(id);
};