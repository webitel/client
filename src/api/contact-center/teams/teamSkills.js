import instance from '@/api/instance';
import configuration from '@/api/openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {ResourceTeamServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {objCamelToSnake, objSnakeToCamel} from "../../utils/caseConverters";

const teamResService = new ResourceTeamServiceApiFactory
(configuration, '', instance);

const domainId = undefined;
const fieldsToSend = ['domainId', 'maxCapacity',
    'minCapacity', 'teamId', 'lvl', 'bucket', 'skill'];

export const getTeamSkillsList = async (teamId, page = 0, size = 10) => {
    const defaultObject = {
        agent: {},
        minCapacity: 0,
        maxCapacity: 0,
        bucket: {},
        lvl: 0,
        _isSelected: false,
    };

    try {
        let response = await teamResService.searchResourceTeamSkill(teamId, page, size);
        if (Array.isArray(response.data.items)) {
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
            agent: {},
            minCapacity: 0,
            maxCapacity: 0,
            bucket: {},
            lvl: 0,
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