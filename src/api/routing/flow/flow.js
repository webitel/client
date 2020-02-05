import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {RoutingSchemaServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const flowService = new RoutingSchemaServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'schema', 'payload'];

export const getFlowList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _isSelected: false,
        // debug: false,
        // type: 'Type is undefined',
    };
    if(search && search.slice(-1) !== '*') search += '*';
    try {
        const response = await flowService.searchRoutingSchema(page, size, search, domainId);
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

export const getFlow = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _dirty: false,
    };
    try {
        let response = await flowService.readRoutingSchema(id, domainId);
        return {
            ...response,
            schema: JSON.stringify(response.schema, null, 4),
            ...defaultObject
        };

    } catch (err) {
        throw err;
    }
};

export const addFlow = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.schema = JSON.parse(itemCopy.schema);
    itemCopy.payload = {};
    sanitizer(itemCopy, fieldsToSend);

    try {
        const response = await flowService.createRoutingSchema(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateFlow = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.schema = JSON.parse(itemCopy.schema);
    itemCopy.payload = {};
    sanitizer(itemCopy, fieldsToSend);

    try {
        await flowService.updateRoutingSchema(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteFlow = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await flowService.deleteRoutingSchema(id, domainId);
    } catch (err) {
        throw err;
    }
};