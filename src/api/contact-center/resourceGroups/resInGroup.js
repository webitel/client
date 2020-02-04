import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {OutboundResourceGroupServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import store from "../../../store/store";
import deepCopy from "deep-copy";

const resGrService = new OutboundResourceGroupServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'groupId', 'name', 'description', 'resource'];


export const getResInGroupList = async (resGroupId, page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    if (search.length && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        resource: {},
        _isSelected: false,
    };
    try {
        const response = await resGrService.searchOutboundResourceInGroup(resGroupId, page, size, domainId);
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

export const getResInGroup = async (resGrId, id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        display: '',
        id: 0,
        _dirty: false,
    };

    try {
        const response = await resGrService.readOutboundResourceInGroup(resGrId, id, domainId);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addResInGroup = async (resGroupId, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.groupId = resGroupId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await resGrService.createOutboundResourceInGroup(resGroupId, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateResInGroup = async (resGroupId, id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.groupId = resGroupId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await resGrService.updateOutboundResourceInGroup(resGroupId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteResInGroup = async (resGroupId, id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await resGrService.deleteOutboundResourceInGroup(resGroupId, id, domainId);
    } catch (err) {
        throw err;
    }
};