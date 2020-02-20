import instance from '../../instance';
import configuration from '../../openAPIConfig';
import sanitizer from '../../utils/sanitizer';
import {AgentTeamServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import deepCopy from 'deep-copy';
import store from '../../../store/store';
import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

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

const defaultListObject = {
    _isSelected: false,
    name: '',
};

const defaultItemObject = {
    name: '',
    id: 0,
    _dirty: false,
};

const listGetter = new WebitelSDKListGetter(teamService.searchAgentTeam, defaultListObject);
const itemGetter = new WebitelSDKItemGetter(teamService.readAgentTeam, defaultItemObject);
const itemCreator = new WebitelSDKItemCreator(teamService.createAgentTeam, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(teamService.updateAgentTeam, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(teamService.deleteAgentTeam);

itemGetter.responseHandler = (response) => {
    try {
        response.strategy = {
            name: strategiesList[response.strategy],
            value: response.strategy,
        };
        return {...defaultItemObject, ...response};
    } catch (err) {
        throw err;
    }
};

export const getTeamsList = async (page = 0, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getTeam = async (id) => {
    return await itemGetter.getItem(id);
};

export const addTeam = async (item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId;
    itemCopy.strategy = itemCopy.strategy.value;
    return await itemCreator.createItem(itemCopy);
};

export const updateTeam = async (id, item) => {
    let itemCopy = deepCopy(item);
    itemCopy.domainId = store.state.userinfo.domainId || undefined;
    itemCopy.strategy = itemCopy.strategy.value;
    return await itemUpdater.updateItem(id, itemCopy);
};

export const deleteTeam = async (id) => {
    return await itemDeleter.deleteItem(id);
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