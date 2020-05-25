import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {
    WebitelAPIPermissionsGetter,
    WebitelAPIPermissionsPatcher,
} from '../../utils/ApiControllers/Permissions/PermissionsController';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';


const resGrService = new OutboundResourceGroupServiceApiFactory(configuration, '', instance);

const BASE_URL = '/call_center/resource_group';
const fieldsToSend = ['domainId', 'name', 'description', 'strategy', 'communication', 'time'];

const defaultListObject = {
    _isSelected: false,
    name: '',
    strategy: '',
    description: '',
    communication: { id: 0 },
    id: 0,
};

const defaultItemObject = {
    name: '',
    strategy: '',
    description: '',
    communication: { id: 0 },
    time: [
        {
            start: 0,
            finish: 0,
        },
    ],
    id: 0,
    _dirty: false,
};

const preRequestHandler = (item) => {
    item.time = item.time.map((range) => ({
            startTimeOfDay: range.start,
            endTimeOfDay: range.end,
        }));
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
        response.time = response.time.map((range) => ({
                start: range.startTimeOfDay || 0,
                end: range.endTimeOfDay || 0,
            }));

        return { ...defaultItemObject, ...response };
    } catch (err) {
        throw err;
    }
};

export const getResGroupList = async (page = 0, size = 10, search) => await listGetter.getList({ page, size, search });

export const getResGroup = async (id) => await itemGetter.getItem(id);

export async function addResGroup(item) {
    return await itemCreator.createItem(item);
}

export async function updateResGroup(id, item) {
    return await itemUpdater.updateItem(id, item);
}

export async function deleteResGroup(id) {
    return await itemDeleter.deleteItem(id);
}

export const getResGroupPermissions = async (id, page = 0, size = 10, search) => await permissionsGetter.getList(id, size, search);

export const patchResGroupPermissions = async (id, item) => await permissionsPatcher.patchItem(id, item);
