import { OutboundResourceGroupServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import eventBus from '../../../utils/eventBus';
import store from '../../../store/store';

const resGrService = new OutboundResourceGroupServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['domainId', 'groupId', 'name', 'description', 'resource'];


export const getResInGroupList = async (resGroupId, page = 0, size = 10, search) => {
    const { domainId } = store.state.userinfo;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        resource: {},
        _isSelected: false,
    };
    try {
        const response = await resGrService.searchOutboundResourceInGroup(resGroupId, page, size, search, domainId);
        if (response.items) {
            return response.items.map((item) => ({ ...defaultObject, ...item }));
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getResInGroup = async (resGrId, id) => {
    const { domainId } = store.state.userinfo;
    const defaultObject = {
        display: '',
        id: 0,
        _dirty: false,
    };

    try {
        const response = await resGrService.readOutboundResourceInGroup(resGrId, id, domainId);
        return { ...defaultObject, ...response };
    } catch (err) {
        throw err;
    }
};

export const addResInGroup = async (resGroupId, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.groupId = resGroupId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await resGrService.createOutboundResourceInGroup(resGroupId, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateResInGroup = async (resGroupId, id, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.groupId = resGroupId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await resGrService.updateOutboundResourceInGroup(resGroupId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteResInGroup = async (resGroupId, id) => {
    const { domainId } = store.state.userinfo;
    try {
        await resGrService.deleteOutboundResourceInGroup(resGroupId, id, domainId);
    } catch (err) {
        throw err;
    }
};
