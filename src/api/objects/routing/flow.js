import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {RoutingSchemeServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../sanitizer";

const flowService = new RoutingSchemeServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['name', 'scheme', 'payload'];

export const getFlowList = async (size = 10) => {
    const defaultObject = {
        _isSelected: false,
        debug: false,
        type: 'Type is undefined',
    };
    try {
        const response = await flowService.searchRoutingScheme(domainId, size);
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
        let response = await flowService.readRoutingScheme(id, domainId);
        response = response.data;
        response.schema = JSON.stringify(response.scheme, null, 4);
        delete response.scheme;
        return {...response, ...defaultObject};
    } catch (err) {
        throw err;
    }
};

export const addFlow = async (item) => {
    item.domain_id = domainId;
    item.scheme = JSON.parse(item.schema);
    item.payload = {};
    sanitizer(item, fieldsToSend);

    try {
        const response = await flowService.createRoutingScheme(item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateFlow = async (id, item) => {
    item.scheme = JSON.parse(item.schema);
    sanitizer(item, fieldsToSend);
    try {
        await flowService.updateRoutingScheme(id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteFlow = async (id) => {
    try {
        await flowService.deleteRoutingScheme(id, domainId);
    } catch (err) {
        throw err;
    }
};