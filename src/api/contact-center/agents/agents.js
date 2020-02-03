import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {AgentServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import {objSnakeToCamel} from "../../utils/caseConverters";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";

const agentService = new AgentServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/agents';
const domainId = undefined;
const fieldsToSend = ['user', 'description'];

export const getAgentsList = async (page = 0, size = 10) => {
    try {
        const response = await agentService.searchAgent(page, size);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item._isSelected = false);
        return response.data.items;
    } catch (err) {
        throw err;
    }
};

export const getAgent = async (id) => {
    const defaultObject = {
        _dirty: false
    };
    try {
        const response = await agentService.readAgent(id, domainId);
        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addAgent = async (item) => {
    sanitizer(item, fieldsToSend);
    try {
        const response = await agentService.createAgent(item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateAgent = async (id, item) => {
    sanitizer(item, fieldsToSend);
    try {
        await agentService.updateAgent(id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteAgent = async (id) => {
    try {
        await agentService.deleteAgent(id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getAgentHistory = async (id, date, page = 0, size = 10) => {
    try {
        const response = await agentService.searchAgentStateHistory(id, page, size, date, Date.now());
        if (!response.data.items) response.data.items = [];
        return objSnakeToCamel(response.data.items);
    } catch (err) {
        throw err;
    }
};

export const getAgentTeamsList = async (id, page = 0, size = 10) => {
    try {
        const response = await agentService.searchAgentInTeam(id, page, size, undefined);
        if (!response.data.items) response.data.items = [];
        return objSnakeToCamel(response.data.items);
    } catch (err) {
        throw err;
    }
};

export const getAgentQueuesList = async (id, page = 0, size = 10) => {
    try {
        const response = await agentService.searchAgentInQueue(id, page, size, undefined);
        if (!response.data.items) response.data.items = [];
        return objSnakeToCamel(response.data.items);
    } catch (err) {
        throw err;
    }
};

export const getAgentPermissions = async (id, page = 0, size = 10, search) => {
    // let url = BASE_URL + `?page=${page}size=${size}`;
    let url = BASE_URL + '/' + id + '/acl' + `?size=${size}`;
    if (search) url += `&name=${search}*`;
    try {
        const response = await instance.get(url);
        return coerceObjectPermissionsResponse(response);
    } catch (error) {
        throw error;
    }
};

export const patchAgentPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};