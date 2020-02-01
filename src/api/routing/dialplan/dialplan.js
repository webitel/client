import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {RoutingOutboundCallServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";

const dialplanService = new RoutingOutboundCallServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['name', 'schema', 'pattern', 'description'];

export const getDialplanList = async (page = 0, size = 10, search) => {
    const defaultObject = {
        disabled: false,
        _isSelected: false,
    };

    try {
        const response = await dialplanService.searchRoutingOutboundCall(page, size);
        if (!response.data.items) response.data.items = [];
        return response.data.items.map(item => {return {...defaultObject, ...item}});
    } catch (err) {
        throw err;
    }
};

export const getDialplan = async (id) => {
    const defaultObject = {
        _dirty: false,
    };
    try {
        let response = await dialplanService.readRoutingOutboundCall(id, domainId);
        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addDialplan = async (item) => {
    sanitizer(item, fieldsToSend);

    try {
        const response = await dialplanService.createRoutingOutboundCall(item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const patchDialplan = async (id, changes) => {
    try {
        await dialplanService.patchRoutingOutboundCall(id, changes);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const moveDialplan = async (fromId, toId) => {
    try {
        await dialplanService.movePositionRoutingOutboundCall(fromId, toId, {});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const updateDialplan = async (id, item) => {
    sanitizer(item, fieldsToSend);
    try {
        await dialplanService.updateRoutingOutboundCall(id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteDialplan = async (id) => {
    try {
        await dialplanService.deleteRoutingOutboundCall(id, domainId);
    } catch (err) {
        throw err;
    }
};