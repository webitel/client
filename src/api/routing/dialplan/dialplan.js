import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {RoutingOutboundCallServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const dialplanService = new RoutingOutboundCallServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'name', 'schema', 'pattern', 'description'];

export const getDialplanList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        disabled: false,
        _isSelected: false,
    };
    if(search && search.slice(-1) !== '*') search += '*';

    try {
        const response = await dialplanService.searchRoutingOutboundCall(page, size, search, domainId);
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

export const getDialplan = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _dirty: false,
    };
    try {
        let response = await dialplanService.readRoutingOutboundCall(id, domainId);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addDialplan = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await dialplanService.createRoutingOutboundCall(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const patchDialplan = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await dialplanService.patchRoutingOutboundCall(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const moveDialplan = async (fromId, toId) => {
    const domain_id = store.state.userinfo.domainId || undefined;
    try {
        await dialplanService.movePositionRoutingOutboundCall(fromId, toId, {domain_id});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const updateDialplan = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
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