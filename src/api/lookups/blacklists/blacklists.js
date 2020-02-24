import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {ListServiceApiFactory} from 'webitel-sdk';
import {
    WebitelAPIPermissionsGetter,
    WebitelAPIPermissionsPatcher
} from "../../utils/ApiControllers/Permissions/PermissionsController";
import {WebitelSDKItemDeleter} from "../../utils/ApiControllers/Deleter/SDKDeleter";
import {WebitelSDKItemUpdater} from "../../utils/ApiControllers/Updater/SDKUpdater";
import {WebitelSDKItemCreator} from "../../utils/ApiControllers/Creator/SDKCreator";
import {WebitelSDKItemGetter} from "../../utils/ApiControllers/Getter/SDKGetter";
import {WebitelSDKListGetter} from "../../utils/ApiControllers/ListGetter/SDKListGetter";

const listService = new ListServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/list';
const fieldsToSend = ['domainId', 'name', 'description'];

const listGetter = new WebitelSDKListGetter(listService.searchList);
const itemGetter = new WebitelSDKItemGetter(listService.readList);
const itemCreator = new WebitelSDKItemCreator(listService.createList, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(listService.updateList, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(listService.deleteList);
const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);

export const getBlacklistList = async (page, size, search) => {
    return await listGetter.getList({page, size, search});
};

export const getBlacklist = async (id) => {
    return await itemGetter.getItem(id);
};

export const addBlacklist = async (item) => {
    return await itemCreator.createItem(item);
};

export const updateBlacklist = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
};

export const deleteBlacklist = async (id) => {
    return await itemDeleter.deleteItem(id);
};

export const getBlacklistPermissions = async (id, page = 0, size = 10, search) => {
    return await permissionsGetter.getList(id, size, search);
};

export const patchBlacklistPermissions = async (id, item) => {
    return await permissionsPatcher.patchItem(id, item);
};