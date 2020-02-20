import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {OutboundResourceGroupServiceApiFactory} from 'webitel-sdk';
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

const resGrService = new OutboundResourceGroupServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/resource_group';
const fieldsToSend = ['domainId', 'name', 'description', 'strategy', 'communication', 'time'];

const defaultListObject = {
    _isSelected: false,
    name: '',
    strategy: '',
    description: '',
    communication: {id: 0},
    id: 0,
};

const defaultItemObject = {
    name: '',
    strategy: '',
    description: '',
    communication: {id: 0},
    time: [
        {
            start: 0,
            finish: 0,
        }
    ],
    id: 0,
    _dirty: false,
};

const listGetter = new WebitelSDKListGetter(resGrService.searchOutboundResourceGroup, defaultListObject);
const itemGetter = new WebitelSDKItemGetter(resGrService.readOutboundResourceGroup);
const itemCreator = new WebitelSDKItemCreator(resGrService.createOutboundResourceGroup, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(resGrService.updateOutboundResourceGroup, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(resGrService.deleteOutboundResourceGroup);

itemGetter.responseHandler = (response) => {
    try {
        response.time = response.time.map(range => {
            return {
                start: range.startTimeOfDay || 0,
                end: range.endTimeOfDay || 0,
            }
        });

        return {...defaultItemObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const getResGroupList = async (page = 0, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getResGroup = async (id) => {
    return await itemGetter.getItem(id);
};

export async function addResGroup(item) {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.time = itemCopy.time.map(range => {
        return {
            startTimeOfDay: range.start,
            endTimeOfDay: range.end,
        }
    });
    return await itemCreator.createItem(itemCopy);
}

export async function updateResGroup(id, item) {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.time = itemCopy.time.map(range => {
        return {
            startTimeOfDay: range.start,
            endTimeOfDay: range.end,
        }
    });
    return await itemUpdater.updateItem(id, itemCopy);
}

export async function deleteResGroup(id) {
    return await itemDeleter.deleteItem(id);
}

export const getResGroupPermissions = async (id, page = 0, size = 10, search) => {
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

export const patchResGroupPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};