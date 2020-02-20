import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {OutboundResourceServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import store from "../../../store/store";
import deepCopy from "deep-copy";
import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter, WebitelSDKItemPatcher,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

const resService = new OutboundResourceServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/resources';
const fieldsToSend = ['domainId', 'limit', 'enabled',
    'rps', 'reserve', 'maxSuccessivelyErrors',
    'name', 'errorIds', 'display', 'resourceId', 'gateway'];

const defaultListObject = {
    _isSelected: false,
    name: '',
    gateway: null,
    enabled: false,
    reserve: false,
    id: 0,
};

const defaultItemObject = {
    name: '',
    gateway: {},
    cps: 0,
    limit: 0,
    description: '',
    maxErrors: 0,
    errorIds: [],
    id: 0,
    _dirty: false,
};

const listGetter = new WebitelSDKListGetter(resService.searchOutboundResource, defaultListObject);
const itemGetter = new WebitelSDKItemGetter(resService.readOutboundResource, defaultItemObject);
const itemCreator = new WebitelSDKItemCreator(resService.createOutboundResource, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(resService.updateOutboundResource, fieldsToSend);
const itemPatcher = new WebitelSDKItemPatcher(resService.patchOutboundResource, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(resService.deleteOutboundResource);

itemGetter.responseHandler = (response) => {
    try {
        response.maxErrors = response.maxSuccessivelyErrors;
        response.cps = response.rps;
        response.errorIds = response.errorIds.map(item => {
            return {name: item}
        });
        return {...defaultItemObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const getResourceList = async (page, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getResource = async (id) => {
    return await itemGetter.getItem(id);
};

export const addResource = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.errorIds = itemCopy.errorIds.map(item => item.name || item.text);
    itemCopy.maxSuccessivelyErrors = item.maxErrors;
    itemCopy.rps = item.cps;
    return await itemCreator.createItem(itemCopy);
};

export const updateResource = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.errorIds = itemCopy.errorIds.map(item => item.name || item.text);
    itemCopy.maxSuccessivelyErrors = item.maxErrors;
    itemCopy.rps = item.cps;
    return await itemUpdater.updateItem(id, itemCopy);
};

export const patchResource = async (id, item) => {
    return await itemPatcher.patchItem(id, item);
};

export const deleteResource = async (id) => {
    return await itemDeleter.deleteItem(id);
};

export const getResPermissions = async (id, page = 0, size = 10, search) => {
    // let url = BASE_URL + `?page=${page}size=${size}`;
    let url = BASE_URL + '/' + id + '/acl' + `?size=${size}`;
    if (search) url += `&name=${search}*`;
    try {
        const response = await instance.get(url);
        return coerceObjectPermissionsResponse(response);
    } catch (error) {
        throw error;
    }
};

export const patchResPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};