import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {ResourceTeamServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {objCamelToSnake, objSnakeToCamel} from "../../utils/caseConverters";

const teamResService = new ResourceTeamServiceApiFactory
(configuration, process.env.VUE_APP_API_URL, instance);

const domainId = undefined;
const fieldsToSend = ['domain_id', 'agent', 'maxCapacity',
    'minCapacity', 'teamId', 'lvl', 'bucket',];


export const getTeamAgentsList = async (teamId, page = 0, size = 10) => {
    const defaultObject = {
        agent: {},
        minCapacity: 0,
        maxCapacity: 0,
        bucket: {},
        _isSelected: false,
    };

    try {
        const response = await teamResService.searchResourceTeamAgent(teamId, page, size);
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