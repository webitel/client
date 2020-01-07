import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {AgentTeamServiceApiFactory, ResourceTeamServiceApiFactory,
    SupervisorInTeamServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {objCamelToSnake, objSnakeToCamel} from "../../utils/caseConverters";

const teamService = new AgentTeamServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);
const teamResService = new ResourceTeamServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);
const teamSupervisorService = new SupervisorInTeamServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['domain_id', 'name', 'description', 'strategy', 'maxNoAnswer', 'wrapUpTime',
    'rejectDelayTime', 'busyDelayTime', 'noAnswerDelayTime', 'callTimeout', 'agent', 'maxCapacity',
    'minCapacity', 'teamId', 'lvl', 'bucket', 'skill'];

export const getTeamsList = async (size = 10) => {
    const defaultObject = {
        _isSelected: false,
        name: '',
    };

    try {
        const response = await teamService.searchAgentTeam(domainId, size);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getTeam = async (id) => {
    try {
        let response = await teamService.readAgentTeam(id, domainId);
        const defaultObject = {
            name: '',
            id: 0,
            _dirty: false,
        };
        // response = ;
        return {...defaultObject, ...objSnakeToCamel(response.data)};
    } catch (err) {
        throw err;
    }
};

export const addTeam = async (item) => {
    sanitizer(item, fieldsToSend);
    item = objCamelToSnake(item);
    try {
        const response = await teamService.createAgentTeam(item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateTeam = async (id, item) => {
    sanitizer(item, fieldsToSend);
    item = objCamelToSnake(item);
    try {
        await teamService.updateAgentTeam(id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteTeam = async (id) => {
    try {
        await teamService.deleteAgentTeam(id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getTeamSupervisorsList = async (teamId, size = 10) => {
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await teamSupervisorService.searchSupervisorInTeam(teamId, domainId, size);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getTeamSupervisor = async (teamId, id) => {
    try {
        let response = await teamSupervisorService.readSupervisorInTeam(teamId, id, domainId);
        const defaultObject = {
            _dirty: false,
        };
        return {...defaultObject, ...objSnakeToCamel(response.data)};
    } catch (err) {
        throw err;
    }
};

export const addTeamSupervisor = async (teamId, item) => {
    sanitizer(item, fieldsToSend);
    item = objCamelToSnake(item);
    try {
        const response = await teamSupervisorService.createSupervisorInTeam(teamId, item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateTeamSupervisor = async (teamId, id, item) => {
    sanitizer(item, fieldsToSend);
    item = objCamelToSnake(item);
    try {
        await teamSupervisorService.updateSupervisorInTeam(teamId, id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteTeamSupervisor = async (teamId, id) => {
    try {
        await teamSupervisorService.deleteSupervisorInTeam(teamId, id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getTeamAgentsList = async (teamId, size = 10) => {
    const defaultObject = {
        _isSelected: false,
    };

    try {
        const response = await teamResService.searchResourceTeamAgent(teamId, 0, size);
        if (Array.isArray(response.data.items)) {
            return response.data.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getTeamAgent = async (teamId, id) => {
    try {
        let response = await teamResService.readResourceTeamAgent(teamId, id, domainId);
        const defaultObject = {
            agent: '',
            minCapacity: 0,
            maxCapacity: 0,
            lvl: 0,
            _dirty: false,
        };
        return {...defaultObject, ...objSnakeToCamel(response.data)};
    } catch (err) {
        throw err;
    }
};

export const addTeamAgent = async (teamId, item) => {
    sanitizer(item, fieldsToSend);
    item = objCamelToSnake(item);
    try {
        const response = await teamResService.createResourceTeamAgent(teamId, item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateTeamAgent = async (teamId, id, item) => {
    sanitizer(item, fieldsToSend);
    item = objCamelToSnake(item);
    try {
        await teamResService.updateResourceTeamAgent(teamId, id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteTeamAgent = async (teamId, id) => {
    try {
        await teamResService.deleteResourceTeamAgent(teamId, id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getTeamSkillsList = async (teamId, size = 10) => {
    const defaultObject = {
        _isSelected: false,
    };

    try {
        let response = await teamResService.searchResourceTeamSkill(teamId, domainId, size);
        if (response.data.items.length) {
            return response.data.items.map(item => {
                return {...defaultObject, ...objSnakeToCamel(item)};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getTeamSkill = async (teamId, id) => {
    try {
        let response = await teamResService.readResourceTeamSkill(teamId, id, domainId);
        const defaultObject = {
            _dirty: false,
        };
        return {...defaultObject, ...objSnakeToCamel(response.data)};
    } catch (err) {
        throw err;
    }
};

export const addTeamSkill = async (teamId, item) => {
    sanitizer(item, fieldsToSend);
    item = objCamelToSnake(item);
    try {
        const response = await teamResService.createResourceTeamSkill(teamId, item);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.data.id;
    } catch (err) {
        throw err;
    }
};

export const updateTeamSkill = async (teamId, id, item) => {
    sanitizer(item, fieldsToSend);
    item = objCamelToSnake(item);
    try {
        await teamResService.updateResourceTeamSkill(teamId, id, item);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteTeamSkill = async (teamId, id) => {
    try {
        await teamResService.deleteResourceTeamSkill(teamId, id, domainId);
    } catch (err) {
        throw err;
    }
};