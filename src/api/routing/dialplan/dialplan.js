import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {RoutingOutboundCallServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import deepCopy from 'deep-copy';
import store from '../../../store/store';
import {objCamelToSnake} from "../../utils/caseConverters";

const dialplanService = new RoutingOutboundCallServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'schema', 'pattern', 'description'];

export const getDialplanList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        disabled: false,
        _isSelected: false,
    };
    if(search.length && search.slice(-1) !== '*') search += '*';

    try {
        const response = await dialplanService.searchRoutingOutboundCall(page, size, search, domainId);
        if (!response.data.items) response.data.items = [];
        return response.data.items.map(item => {return {...defaultObject, ...item}});
    } catch (err) {
        throw err;
    }
};

export const getDialplan = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
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
    const domainId = store.state.userinfo.domainId || undefined;
    let itemCopy = deepCopy(item);
    itemCopy.domainId = domainId;
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);
    try {
        const response = await dialplanService.createRoutingOutboundCall(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const patchDialplan = async (id, item) => {
    const domainId = store.state.userinfo.domainId || undefined;
    let itemCopy = deepCopy(item);
    itemCopy.domainId = domainId;
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);
    try {
        await dialplanService.patchRoutingOutboundCall(id, itemCopy);
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
    const domainId = store.state.userinfo.domainId || undefined;
    let itemCopy = deepCopy(item);
    itemCopy.domainId = domainId;
    sanitizer(itemCopy, fieldsToSend);
    itemCopy = objCamelToSnake(itemCopy);
    try {
        await dialplanService.updateRoutingOutboundCall(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteDialplan = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await dialplanService.deleteRoutingOutboundCall(id, domainId);
    } catch (err) {
        throw err;
    }
};