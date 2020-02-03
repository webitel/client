import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {RoutingSchemaServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import deepCopy from 'deep-copy';
import store from '../../../store/store';
import {objCamelToSnake} from "../../utils/caseConverters";

const flowService = new RoutingSchemaServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['name', 'schema', 'payload'];

export const getFlowList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _isSelected: false,
        // debug: false,
        // type: 'Type is undefined',
    };
    if(search.length && search.slice(-1) !== '*') search += '*';
    try {
        const response = await flowService.searchRoutingSchema(page, size, search, domainId);
        if (!response.data.items) response.data.items = [];
        return response.data.items.map(item => {
            return {...item, ...defaultObject}
        });
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
            ...response.data,
            schema: JSON.stringify(response.data.schema, null, 4),
            ...defaultObject
        };

    } catch (err) {
        throw err;
    }
};

export const addFlow = async (item) => {
    const domainId = store.state.userinfo.domainId || undefined;
    let itemCopy = deepCopy(item);
    itemCopy.domainId = domainId;
    itemCopy.schema = JSON.parse(itemCopy.schema);
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);

    try {
        const response = await flowService.createRoutingSchema(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateFlow = async (id, item) => {
    const domainId = store.state.userinfo.domainId || undefined;
    let itemCopy = deepCopy(item);
    itemCopy.domainId = domainId;
    itemCopy.schema = JSON.parse(itemCopy.schema);
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);

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