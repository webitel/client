import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {AgentServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import {objSnakeToCamel} from "../../utils/caseConverters";

const agentService = new AgentServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['user', 'description'];

export const getAgentsList = async (page = 0, size = 10) => {
    try {
        const response = await agentService.searchAgent(domainId, size, page);
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
        const response = await agentService.searchAgentStateHistory(id, page, size, undefined,
            date, Date.now());
        if (!response.data.items) response.data.items = [];
        return objSnakeToCamel(response.data.items);
    } catch (err) {
        throw err;
    }
};