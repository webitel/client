import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../../api/sanitizer';
import {AgentTeamServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {objCamelToSnake, objSnakeToCamel} from "../../caseConverters";

const teamService = new AgentTeamServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['domain_id', 'name', 'description', 'strategy', 'maxNoAnswer', 'wrapUpTime', 'rejectDelayTime',
'busyDelayTime', 'noAnswerDelayTime', 'callTimeout',];

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