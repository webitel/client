import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {SupervisorInTeamServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const teamSupervisorService = new SupervisorInTeamServiceApiFactory
(configuration, '', instance);

const fieldsToSend = ['domainId', 'teamId', 'agent'];

export const getTeamSupervisorsList = async (teamId, page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId;
    if (search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        agent: {},
        _isSelected: false,
    };

    try {
        const response = await teamSupervisorService.searchSupervisorInTeam(teamId, page, size, search, domainId);
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

export const getTeamSupervisor = async (teamId, id) => {
    const domainId = store.state.userinfo.domainId;
    try {
        let response = await teamSupervisorService.readSupervisorInTeam(teamId, id, domainId);
        const defaultObject = {
            agent: {},
            _dirty: false,
        };
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addTeamSupervisor = async (teamId, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.teamId = teamId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await teamSupervisorService.createSupervisorInTeam(teamId, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateTeamSupervisor = async (teamId, id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.teamId = teamId;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await teamSupervisorService.updateSupervisorInTeam(teamId, id, itemCopy);
        eventBus.$emit('notificationInfo', 'Successfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteTeamSupervisor = async (teamId, id) => {
    const domainId = store.state.userinfo.domainId;
    try {
        await teamSupervisorService.deleteSupervisorInTeam(teamId, id, domainId);
    } catch (err) {
        throw err;
    }
};