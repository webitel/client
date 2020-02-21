import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {OutboundResourceGroupServiceApiFactory} from 'webitel-sdk';
import {
    WebitelAPIPermissionsGetter, WebitelAPIPermissionsPatcher,
    WebitelSDKItemCreator,
    WebitelSDKItemDeleter,
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

const preRequestHandler = (item) => {
    item.time = item.time.map(range => {
        return {
            startTimeOfDay: range.start,
            endTimeOfDay: range.end,
        }
    });
    return item;
};

const listGetter = new WebitelSDKListGetter(resGrService.searchOutboundResourceGroup, defaultListObject);
const itemGetter = new WebitelSDKItemGetter(resGrService.readOutboundResourceGroup);
const itemCreator = new WebitelSDKItemCreator(resGrService.createOutboundResourceGroup, fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelSDKItemUpdater(resGrService.updateOutboundResourceGroup, fieldsToSend, preRequestHandler);
const itemDeleter = new WebitelSDKItemDeleter(resGrService.deleteOutboundResourceGroup);
const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);

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
    return await itemCreator.createItem(item);
}

export async function updateResGroup(id, item) {
    return await itemUpdater.updateItem(id, item);
}

export async function deleteResGroup(id) {
    return await itemDeleter.deleteItem(id);
}

export const getResGroupPermissions = async (id, page = 0, size = 10, search) => {
    return await permissionsGetter.getList(id, size, search);
};

export const patchResGroupPermissions = async (id, item) => {
    return await permissionsPatcher.patchItem(id, item);
};