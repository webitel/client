import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {ListServiceApiFactory} from 'webitel-sdk';
import sanitizer from "../../utils/sanitizer";
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import deepCopy from 'deep-copy';
import store from '../../../store/store';
import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

const listService = new ListServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/list';
const fieldsToSend = ['domainId', 'name', 'description'];

const defaultItemObject = {
    _dirty: false,
};
const defaultListObject = {
    name: '',
    _isSelected: false,
};

const listGetter = new WebitelSDKListGetter(listService.searchList, defaultListObject);

const itemGetter = new WebitelSDKItemGetter(listService.readList, defaultItemObject);

const itemCreator = new WebitelSDKItemCreator(listService.createList, fieldsToSend);

const itemUpdater = new WebitelSDKItemUpdater(listService.updateList, fieldsToSend);

const itemDeleter = new WebitelSDKItemDeleter(listService.deleteList);

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

export const patchBlacklistPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};