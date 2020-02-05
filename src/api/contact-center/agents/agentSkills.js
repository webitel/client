import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {AgentSkillServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import store from "../../../store/store";
import deepCopy from "deep-copy";

const agentSkillService = new AgentSkillServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['skill', 'capacity'];

export const getAgentSkillsList = async (agentId, page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await agentSkillService.searchAgentSkill(agentId, page, size, domainId);
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

export const getAgentSkill = async (agentId, id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        _dirty: false
    };
    try {
        const response = await agentSkillService.readAgentSkill(agentId, id, domainId);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addAgentSkill = async (agentId, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await agentSkillService.createAgentSkill(agentId, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateAgentSkill = async (agentId, id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await agentSkillService.updateAgentSkill(agentId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteAgentSkill = async (agentId, id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await agentSkillService.deleteAgentSkill(agentId, id, domainId);
    } catch (err) {
        throw err;
    }
};