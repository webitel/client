import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {RoutingOutboundCallServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../utils/eventBus";
import sanitizer from "../utils/sanitizer";

const dialplanService = new RoutingOutboundCallServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['name', 'schema', 'pattern', 'description'];

export const getDialplanList = async (size = 10) => {
    const defaultObject = {
        _isSelected: false,
        enabled: false,
    };
    try {
        const response = await dialplanService.searchRoutingOutboundCall(domainId, size);
        if (!response.data.items) response.data.items = [];
        return response.data.items.map(item => {return {...item, ...defaultObject}});
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
        return {...response.data, ...defaultObject};
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