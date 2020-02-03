import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '@/api/utils/sanitizer';
import {OutboundResourceGroupServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";

const resGrService = new OutboundResourceGroupServiceApiFactory
(configuration, '', instance);

const domainId = undefined;
const fieldsToSend = ['domain_id', 'name', 'description', 'resource'];


export const getResInGroupList = async (resGroupId, page = 0, size = 10) => {
    const defaultObject = {
        resource: {},
        _isSelected: false,
    };
    try {
        const response = await resGrService.searchOutboundResourceInGroup(resGroupId, page, size);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getResInGroup = async (resGrId, id) => {
    const defaultObject = {
        display: '',
        id: 0,
        _dirty: false,
    };

    try {
        const response = await resGrService.readOutboundResourceInGroup(resGrId, id);
        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addResInGroup = async (resGroupId, item) => {
    let itemCopy = {
        group_id: resGroupId,
        ...item
    };
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
    let itemCopy = {
        group_id: resGroupId,
        ...item
    };
    sanitizer(itemCopy, fieldsToSend);
    try {
        await resGrService.updateOutboundResourceInGroup(resGroupId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteResInGroup = async (resGroupId, id) => {
    try {
        await resGrService.deleteOutboundResourceInGroup(resGroupId, id);
    } catch (err) {
        throw err;
    }
};