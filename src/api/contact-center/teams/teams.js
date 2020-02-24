import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {AgentTeamServiceApiFactory} from 'webitel-sdk';
import {
    WebitelAPIPermissionsGetter,
    WebitelAPIPermissionsPatcher
} from "../../utils/ApiControllers/Permissions/PermissionsController";
import {WebitelSDKItemDeleter} from "../../utils/ApiControllers/Deleter/SDKDeleter";
import {WebitelSDKItemUpdater} from "../../utils/ApiControllers/Updater/SDKUpdater";
import {WebitelSDKItemCreator} from "../../utils/ApiControllers/Creator/SDKCreator";
import {WebitelSDKItemGetter} from "../../utils/ApiControllers/Getter/SDKGetter";
import {WebitelSDKListGetter} from "../../utils/ApiControllers/ListGetter/SDKListGetter";

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

const preRequestHandler = (item) => {
    item.strategy = item.strategy.value;
    return item;
};

const listGetter = new WebitelSDKListGetter(teamService.searchAgentTeam);
const itemGetter = new WebitelSDKItemGetter(teamService.readAgentTeam);
const itemCreator = new WebitelSDKItemCreator(teamService.createAgentTeam, fieldsToSend, preRequestHandler);
const itemUpdater = new WebitelSDKItemUpdater(teamService.updateAgentTeam, fieldsToSend, preRequestHandler);
const itemDeleter = new WebitelSDKItemDeleter(teamService.deleteAgentTeam);
const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);

itemGetter.responseHandler = (response) => {
    let defaultItemObject = {
        _dirty: false
    };
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
    return await itemCreator.createItem(item);
};

export const updateTeam = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
};

export const deleteTeam = async (id) => {
    return await itemDeleter.deleteItem(id);
};

export const getTeamPermissions = async (id, page = 0, size = 10, search) => {
    return await permissionsGetter.getList(id, size, search);
};

export const patchTeamPermissions = async (id, item) => {
    return await permissionsPatcher.patchItem(id, item);
};