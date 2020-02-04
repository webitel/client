import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {OutboundResourceGroupServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const resGrService = new OutboundResourceGroupServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/resource_group';
const fieldsToSend = ['domainId', 'name', 'description', 'strategy', 'communication', 'time'];

export const getResGroupList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _isSelected: false,
        name: '',
        strategy: '',
        description: '',
        communication: {id: 0},
        id: 0,
    };
    if(search.length && search.slice(-1) !== '*') search += '*';

    try {
        const response = await resGrService.searchOutboundResourceGroup(page, size, search, domainId);
        if (response.items) {
            return response.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getResGroup = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
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
    try {
        const response = await resGrService.readOutboundResourceGroup(id, domainId);
        response.time = response.time.map(range => {
            return {
                start: range.start_time_of_day || 0,
                end: range.end_time_of_day || 0,
            }
        });

        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export async function addResGroup(item) {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.time = itemCopy.time.map(range => {
        return {
            start_time_of_day: range.start,
            end_time_of_day: range.end,
        }
    });
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await resGrService.createOutboundResourceGroup(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
}

export async function updateResGroup(id, item) {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.time = itemCopy.time.map(range => {
        return {
            start_time_of_day: range.start,
            end_time_of_day: range.end,
        }
    });
    sanitizer(itemCopy, fieldsToSend);
    try {
        await resGrService.updateOutboundResourceGroup(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
}

export async function deleteResGroup(id) {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await resGrService.deleteOutboundResourceGroup(id, domainId);
    } catch (err) {
        throw err;
    }
}

export const getBucketPermissions = async (id, page = 0, size = 10, search) => {
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

export const patchBucketPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};