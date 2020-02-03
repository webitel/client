import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import {AgentSkillServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";

const agentSkillService = new AgentSkillServiceApiFactory
(configuration, '', instance);

const domainId = undefined;
const fieldsToSend = ['skill', 'capacity'];


export const getAgentSkillsList = async (agentId, page = 0, size = 10) => {
    try {
        const response = await agentSkillService.searchAgentSkill(agentId, page, size);
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