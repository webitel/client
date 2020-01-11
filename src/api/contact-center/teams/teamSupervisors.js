import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {SupervisorInTeamServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {objCamelToSnake, objSnakeToCamel} from "../../utils/caseConverters";

const teamSupervisorService = new SupervisorInTeamServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['agent'];

export const getTeamSupervisorsList = async (teamId, page = 0, size = 10) => {
    const defaultObject = {
        agent: {},
        _isSelected: false,
    };

    try {
        const response = await teamSupervisorService.searchSupervisorInTeam(teamId, page, size);
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
            agent: {},
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