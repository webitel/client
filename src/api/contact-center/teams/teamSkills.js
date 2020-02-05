import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {ResourceTeamServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import store from "../../../store/store";
import deepCopy from "deep-copy";

const teamResService = new ResourceTeamServiceApiFactory
(configuration, '', instance);

const domainId = undefined;
const fieldsToSend = ['domainId', 'maxCapacity',
    'minCapacity', 'teamId', 'lvl', 'bucket', 'skill'];

export const getTeamSkillsList = async (teamId, page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        agent: {},
        minCapacity: 0,
        maxCapacity: 0,
        bucket: {},
        lvl: 0,
        _isSelected: false,
    };

    try {
        let response = await teamResService.searchResourceTeamSkill(teamId, page, size, domainId);
        if (response.items) {
            return response.items.map(item => {
                return {...defaultObject, ...item};
            });
        }
        return [];
    } catch (err) {
        throw err;
    }
};

export const getTeamSkill = async (teamId, id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        agent: {},
        minCapacity: 0,
        maxCapacity: 0,
        bucket: {},
        lvl: 0,
        _dirty: false,
    };

    try {
        let response = await teamResService.readResourceTeamSkill(teamId, id, domainId);
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addTeamSkill = async (teamId, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.teamId = teamId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await teamResService.createResourceTeamSkill(teamId, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateTeamSkill = async (teamId, id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.teamId = teamId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await teamResService.updateResourceTeamSkill(teamId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteTeamSkill = async (teamId, id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await teamResService.deleteResourceTeamSkill(teamId, id, domainId);
    } catch (err) {
        throw err;
    }
};