import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {OutboundResourceServiceApiFactory} from 'webitel-sdk';

const resService = new OutboundResourceServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['display', 'resource_id'];

export const getResDisplayList = async (resId, page = 0, size = 10) => {
    const defaultObject = {
        _isSelected: false,
    };
    try {
        const response = await resService.searchOutboundResourceDisplay(resId, page, size, domainId);
        if(Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getResDisplay = async (resId, id) => {
    const defaultObject = {
        display: '',
        id: 0,
        _dirty: false,
    };

    try {
        const response = await resService.readOutboundResourceDisplay(resId, id);
        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addResDisplay = async (resId, item) => {
    item.domain_id = domainId;
    item.resource_id = resId;
    try {
        await resService.createOutboundResourceDisplay(resId, item);
    } catch (err) {
        throw err;
    }
};

export const updateResDisplay = async (resId, id, item) => {
    item.resource_id = resId;
    sanitizer(item, fieldsToSend);
    try {
        await resService.updateOutboundResourceDisplay(resId, id, item);
    } catch (err) {
        throw err;
    }
};

export const deleteResDisplay = async (resId, id) => {
    try {
        await resService.deleteOutboundResourceDisplay(resId, id, domainId);
    } catch (err) {
        throw err;
    }
};