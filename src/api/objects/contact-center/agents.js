import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {AgentServiceApiFactory, AgentSkillServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../sanitizer";

const agentService = new AgentServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const agentSkillService = new AgentSkillServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['user', 'description', 'skill', 'capacity'];

export const getAgentsList = async (size = 10) => {
    try {
        const response = await agentService.searchAgent(domainId, size);
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

export const getAgentSkillsList = async (agentId, size = 10) => {
    try {
        const response = await agentSkillService.searchAgentSkill(agentId, domainId, size);
        if (!response.data.items) response.data.items = [];
        response.data.items.forEach(item => item._isSelected = false);
        return response.data.items;
    } catch (err) {
        throw err;
    }
};

export const getAgentSkill = async (agentId, id) => {
    const defaultObject = {
        _dirty: false
    };
    try {
        const response = await agentSkillService.readAgentSkill(agentId, id, domainId);
        return {...defaultObject, ...response.data};
    } catch (err) {
        throw err;
    }
};

export const addAgentSkill = async (agentId, item) => {
    sanitizer(item, fieldsToSend);
    try {
        const response = await agentSkillService.createAgentSkill(agentId, item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateAgentSkill = async (agentId, id, item) => {
    sanitizer(item, fieldsToSend);
    try {
        await agentSkillService.updateAgentSkill(agentId, id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteAgentSkill = async (agentId, id) => {
    try {
        await agentSkillService.deleteAgentSkill(agentId, id, domainId);
    } catch (err) {
        throw err;
    }
};

