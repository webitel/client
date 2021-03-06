import { OutboundResourceServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import store from '../../../store/store';

const resService = new OutboundResourceServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['display', 'resourceId', 'domainId'];

export const getResDisplayList = async (resId, page = 0, size = 10, search) => {
    const { domainId } = store.state.userinfo;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        _isSelected: false,
    };
    try {
        const response = await resService.searchOutboundResourceDisplay(resId, page, size, search, domainId);
        if (response.items) {
            return {
                list: response.items.map((item) => ({ ...defaultObject, ...item })),
                isNext: response.next || false,
            };
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getResDisplay = async (resId, id) => {
    const { domainId } = store.state.userinfo;
    const defaultObject = {
        display: '',
        id: 0,
        _dirty: false,
    };

    try {
        const response = await resService.readOutboundResourceDisplay(resId, id, domainId);
        return { ...defaultObject, ...response };
    } catch (err) {
        throw err;
    }
};

export const addResDisplay = async (resId, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.resourceId = resId;
    sanitizer(item, fieldsToSend);
    try {
        await resService.createOutboundResourceDisplay(resId, item);
        eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
    } catch (err) {
        throw err;
    }
};

export const updateResDisplay = async (resId, id, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.resourceId = resId;
    sanitizer(item, fieldsToSend);
    try {
        await resService.updateOutboundResourceDisplay(resId, id, item);
        eventBus.$emit('notification', { type: 'info', text: 'Successfully added' });
    } catch (err) {
        throw err;
    }
};

export const deleteResDisplay = async (resId, id) => {
    const { domainId } = store.state.userinfo;
    try {
        await resService.deleteOutboundResourceDisplay(resId, id, domainId);
    } catch (err) {
        throw err;
    }
};
