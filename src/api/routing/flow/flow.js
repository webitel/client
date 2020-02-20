import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {RoutingSchemaServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import deepCopy from 'deep-copy';
import store from '../../../store/store';
import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

const flowService = new RoutingSchemaServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'schema', 'payload'];

const defaultObject = {
    _dirty: false,
};

const listGetter = new WebitelSDKListGetter(flowService.searchRoutingSchema);

const itemGetter = new WebitelSDKItemGetter(flowService.readRoutingSchema);

const itemCreator = new WebitelSDKItemCreator(flowService.createRoutingSchema, fieldsToSend);

const itemUpdater = new WebitelSDKItemUpdater(flowService.updateRoutingSchema, fieldsToSend);

const itemDeleter = new WebitelSDKItemDeleter(flowService.deleteRoutingSchema);
itemGetter.responseHandler = (response) => {
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
    let itemCopy = deepCopy(item);
    itemCopy.schema = JSON.parse(itemCopy.schema);
    itemCopy.payload = {};
    return await itemCreator.createItem(itemCopy);
};

export const updateFlow = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.schema = JSON.parse(itemCopy.schema);
    itemCopy.payload = {};
    return await itemUpdater.updateItem(id, item);
};

export const deleteFlow = async (id) => {
    return await itemDeleter.deleteItem(id);
};