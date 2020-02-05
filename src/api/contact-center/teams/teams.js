import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {AgentTeamServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import deepCopy from 'deep-copy';
import store from '../../../store/store';

const teamService = new AgentTeamServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/teams';
const fieldsToSend = ['domainId', 'name', 'description', 'strategy', 'maxNoAnswer', 'wrapUpTime',
    'rejectDelayTime', 'busyDelayTime', 'noAnswerDelayTime', 'callTimeout'];

export const strategiesList = {
    'random': 'Random',
    'fewest-calls': 'Agent with fewest calls',
    'least-talk-time': 'Agent with least talk time',
    'top-down': 'Top-Down',
    'round-robin': 'Round robbin',
    'longest-idle-time': 'Longest idle Agent',
};

export const getTeamsList = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId || undefined;
    if(search && search.slice(-1) !== '*') search += '*';
    const defaultObject = {
        _isSelected: false,
        name: '',
    };

    try {
        const response = await teamService.searchAgentTeam(page, size, search, domainId);
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

export const getTeam = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    const defaultObject = {
        name: '',
        id: 0,
        _dirty: false,
    };
    try {
        let response = await teamService.readAgentTeam(id, domainId);
        response.strategy = {
            name: strategiesList[response.strategy],
            value: response.strategy,
        };
        return {...defaultObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const addTeam = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.strategy = itemCopy.strategy.value;
    sanitizer(itemCopy, fieldsToSend);
    try {
        const response = await teamService.createAgentTeam(itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully added');
        return response.id;
    } catch (err) {
        throw err;
    }
};

export const updateTeam = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.strategy = itemCopy.strategy.value;
    sanitizer(itemCopy, fieldsToSend);
    try {
        await teamService.updateAgentTeam(id, itemCopy);
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (err) {
        throw err;
    }
};

export const deleteTeam = async (id) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        await teamService.deleteAgentTeam(id, domainId);
    } catch (err) {
        throw err;
    }
};

export const getTeamPermissions = async (id, page = 0, size = 10, search) => {
    // let url = BASE_URL + `?page=${page}size=${size}`;
    let url = BASE_URL + '/' + id + '/acl' + `?size=${size}`;
    if (search) url += `&name=${search}*`;
    try {
        const response = await instance.get(url);
        return coerceObjectPermissionsResponse(response);
    } catch (error) {
        throw error;
    }
};

export const patchTeamPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};