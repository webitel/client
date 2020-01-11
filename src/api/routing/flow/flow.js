import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {RoutingSchemaServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";

const flowService = new RoutingSchemaServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['name', 'schema', 'payload'];

export const getFlowList = async (page = 0, size = 10) => {
    const defaultObject = {
        _isSelected: false,
        debug: false,
        type: 'Type is undefined',
    };
    try {
        const response = await flowService.searchRoutingSchema(page, size);
        if (!response.data.items) response.data.items = [];
        return response.data.items.map(item => {return {...item, ...defaultObject}});
    } catch (err) {
        throw err;
    }
};

export const getFlow = async (id) => {
    const defaultObject = {
        _dirty: false,
    };
    try {
        let response = await flowService.readRoutingSchema(id, domainId);
        return {...response.data, ...defaultObject};

    } catch (err) {
        throw err;
    }
};

export const addFlow = async (item) => {
    item.domain_id = domainId;
    item.payload = {};
    sanitizer(item, fieldsToSend);

    try {
        const response = await flowService.createRoutingSchema(item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateFlow = async (id, item) => {
    sanitizer(item, fieldsToSend);
    try {
        await flowService.updateRoutingSchema(id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteFlow = async (id) => {
    try {
        await flowService.deleteRoutingSchema(id, domainId);
    } catch (err) {
        throw err;
    }
};