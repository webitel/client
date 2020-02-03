import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {RoutingSchemaServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";

const flowService = new RoutingSchemaServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'payload'];

export const getFlowList = async (page = 0, size = 10) => {
    const defaultObject = {
        _isSelected: false,
        // debug: false,
        // type: 'Type is undefined',
    };
    try {
        const response = await flowService.searchRoutingSchema(page, size);
        if (!response.data.items) response.data.items = [];
        return response.data.items.map(item => {
            return {...item, ...defaultObject}
        });
    } catch (err) {
        throw err;
    }
};

export const getFlow = async (id) => {
    const defaultObject = {
        _dirty: false,
    };
    try {
        let response = await flowService.readRoutingSchema(id);
        return {
            ...response.data,
            schema: JSON.stringify(response.data.schema, null, 4),
            ...defaultObject
        };

    } catch (err) {
        throw err;
    }
};

export const addFlow = async (item) => {
    let itemCopy = {...item, payload: {}};
    itemCopy.schema = JSON.parse(itemCopy.schema);
    sanitizer(itemCopy, fieldsToSend);

    try {
        const response = await flowService.createRoutingSchema(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateFlow = async (id, item) => {
    let itemCopy = {...item};
    itemCopy.schema = JSON.parse(itemCopy.schema);
    sanitizer(itemCopy, fieldsToSend);
    try {
        await flowService.updateRoutingSchema(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteFlow = async (id) => {
    try {
        await flowService.deleteRoutingSchema(id);
    } catch (err) {
        throw err;
    }
};