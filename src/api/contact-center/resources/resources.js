import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {OutboundResourceServiceApiFactory} from 'webitel-sdk';
import {
    WebitelAPIPermissionsGetter,
    WebitelAPIPermissionsPatcher
} from "../../utils/ApiControllers/Permissions/PermissionsController";
import {WebitelSDKItemDeleter} from "../../utils/ApiControllers/Deleter/SDKDeleter";
import {WebitelSDKItemPatcher} from "../../utils/ApiControllers/Patcher/SDKPatcher";
import {WebitelSDKItemUpdater} from "../../utils/ApiControllers/Updater/SDKUpdater";
import {WebitelSDKItemCreator} from "../../utils/ApiControllers/Creator/SDKCreator";
import {WebitelSDKItemGetter} from "../../utils/ApiControllers/Getter/SDKGetter";
import {WebitelSDKListGetter} from "../../utils/ApiControllers/ListGetter/SDKListGetter";


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

const preRequestHandler = (item) => {
    item.errorIds = item.errorIds.map(item => item.name || item.text);
    item.maxSuccessivelyErrors = item.maxErrors;
    item.rps = item.cps;
    return item;
};

const listGetter = new WebitelSDKListGetter(resService.searchOutboundResource, defaultListObject);
const itemGetter = new WebitelSDKItemGetter(resService.readOutboundResource, defaultItemObject);
const itemCreator = new WebitelSDKItemCreator(resService.createOutboundResource, fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelSDKItemUpdater(resService.updateOutboundResource, fieldsToSend, preRequestHandler);
const itemPatcher = new WebitelSDKItemPatcher(resService.patchOutboundResource, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(resService.deleteOutboundResource);
const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);

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
    return await itemCreator.createItem(item);
};

export const updateResource = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
};

export const patchResource = async (id, item) => {
    return await itemPatcher.patchItem(id, item);
};

export const deleteResource = async (id) => {
    return await itemDeleter.deleteItem(id);
};

export const getResPermissions = async (id, page = 0, size = 10, search) => {
    return await permissionsGetter.getList(id, size, search);
};

export const patchResPermissions = async (id, item) => {
    return await permissionsPatcher.patchItem(id, item);
};