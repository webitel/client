import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {ResourceTeamServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import store from "../../../store/store";
import deepCopy from 'deep-copy';

const teamResService = new ResourceTeamServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'agent', 'maxCapacity',
    'minCapacity', 'teamId', 'lvl', 'bucket',];

export const getTeamAgentsList = async (teamId, page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        agent: {},
        minCapacity: 0,
        maxCapacity: 0,
        bucket: {},
        _isSelected: false,
    };

    try {
        const response = await teamResService.searchResourceTeamAgent(teamId, page, size, search, domainId);
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

export const getTeamAgent = async (teamId, id) => {
    const domainId = store.state.userinfo.domainId;
    const defaultObject = {
        agent: {},
        bucket: {},
        _dirty: false,
    };
    try {
        let response = await teamResService.readResourceTeamAgent(teamId, id, domainId);
         return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addTeamAgent = async (teamId, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.teamId = teamId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await teamResService.createResourceTeamAgent(teamId, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateTeamAgent = async (teamId, id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.teamId = teamId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await teamResService.updateResourceTeamAgent(teamId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteTeamAgent = async (teamId, id) => {
    const domainId = store.state.userinfo.domainId;
    try {
        await teamResService.deleteResourceTeamAgent(teamId, id, domainId);
    } catch (err) {
        throw err;
    }
};