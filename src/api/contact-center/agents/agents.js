import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {AgentServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import store from "../../../store/store";
import deepCopy from "deep-copy";

const agentService = new AgentServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/agents';
const fieldsToSend = ['domainId', 'user', 'description'];

export const getAgentsList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _isSelected: false,
    };
    if (search.length && search.slice(-1) !== '*') search += '*';

    try {
        const response = await agentService.searchAgent(page, size, search, domainId);
        if (response.items) {
            return response.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return []
    } catch (err) {
        throw err;
    }
};

export const getAgent = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _dirty: false
    };
    try {
        const response = await agentService.readAgent(id, domainId);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addAgent = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await agentService.createAgent(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateAgent = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await agentService.updateAgent(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteAgent = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await agentService.deleteAgent(id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getAgentHistory = async (id, date, page = 0, size = 10) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        const response = await agentService.searchAgentStateHistory(id, page, size, date, Date.now(), domainId);
        return response.items ? response.items : [];
    } catch (err) {
        throw err;
    }
};

export const getAgentTeamsList = async (id, page = 0, size = 10) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        const response = await agentService.searchAgentInTeam(id, page, size, domainId);
        return response.items ? response.items : [];
    } catch (err) {
        throw err;
    }
};

export const getAgentQueuesList = async (id, page = 0, size = 10) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        const response = await agentService.searchAgentInQueue(id, page, size, domainId);
        return response.items ? response.items : [];
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