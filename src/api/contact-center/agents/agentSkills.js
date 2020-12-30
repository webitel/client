import { AgentSkillServiceApiFactory } from 'webitel-sdk';
import deepCopy from 'deep-copy';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import store from '../../../store/store';

const agentSkillService = new AgentSkillServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['skill', 'capacity'];

export const getAgentSkillsList = async (agentId, page = 0, size = 10, search) => {
    const { domainId } = store.state.userinfo;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await agentSkillService.searchAgentSkill(agentId, page, size, search, domainId);
        if (response.items) {
            return {
                list: response.items.map((item) => ({ ...defaultObject, ...item })),
                isNext: response.next || false,
            };
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getAgentSkill = async (agentId, id) => {
    const { domainId } = store.state.userinfo;
    const defaultObject = {
        _dirty: false,
    };
    try {
        const response = await agentSkillService.readAgentSkill(agentId, id, domainId);
        return { ...defaultObject, ...response };
    } catch (err) {
        throw err;
    }
};

export const addAgentSkill = async (agentId, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await agentSkillService.createAgentSkill(agentId, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateAgentSkill = async (agentId, id, item) => {
    const itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await agentSkillService.updateAgentSkill(agentId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteAgentSkill = async (agentId, id) => {
    const { domainId } = store.state.userinfo;
    try {
        await agentSkillService.deleteAgentSkill(agentId, id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getAgentSkills = async (id, page = 0, size = 10, search) => {
    const { domainId } = store.state.userinfo;
    try {
        const response = await agentSkillService.searchLookupAgentNotExistsSkill(id, page, size, search, domainId);
        return response.items ? response.items : [];
    } catch (err) {
        throw err;
    }
};
