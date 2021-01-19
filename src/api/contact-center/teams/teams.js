import { AgentTeamServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import WebitelAPIPermissionsGetter from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsGetter';
import WebitelAPIPermissionsPatcher from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsPatcher';
import { WebitelSDKItemDeleter } from '../../utils/ApiControllers/Deleter/SDKDeleter';
import { WebitelSDKItemUpdater } from '../../utils/ApiControllers/Updater/SDKUpdater';
import { WebitelSDKItemCreator } from '../../utils/ApiControllers/Creator/SDKCreator';
import { WebitelSDKItemGetter } from '../../utils/ApiControllers/Getter/SDKGetter';
import { WebitelSDKListGetter } from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const teamService = new AgentTeamServiceApiFactory(configuration, '', instance);

const BASE_URL = '/call_center/teams';
const fieldsToSend = ['domainId', 'name', 'description', 'strategy', 'maxNoAnswer', 'wrapUpTime',
     'noAnswerDelayTime', 'callTimeout', 'postProcessing'];


const preRequestHandler = (item) => {
    // item.busyDelayTime = +item.busyDelayTime;
    // item.wrapUpTime = +item.wrapUpTime;
    // item.callTimeout = +item.callTimeout;
    // item.maxNoAnswer = +item.maxNoAnswer;
    // item.rejectDelayTime = +item.rejectDelayTime;
    // item.noAnswerDelayTime = +item.noAnswerDelayTime;
    // item.strategy = item.strategy.value;
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
    const defaultItemObject = {
        _dirty: false,
        postProcessing: false,
        busyDelayTime: 0,
        callTimeout: 0,
        maxNoAnswer: 0,
        noAnswerDelayTime: 0,
        rejectDelayTime: 0,
        wrapUpTime: 0,
    };
    try {
        return { ...defaultItemObject, ...response };
    } catch (err) {
        throw err;
    }
};

export const getTeamsList = (page = 1, size = 10, search) => (
  listGetter.getList({ page, size, search })
);

export const getTeam = (id) => itemGetter.getItem(id);

export const addTeam = (item) => itemCreator.createItem(item);

export const updateTeam = (id, item) => itemUpdater.updateItem(id, item);

export const deleteTeam = (id) => itemDeleter.deleteItem(id);

export const getTeamPermissions = (id, page = 1, size = 10, search) => (
  permissionsGetter.getList(id, size, search)
);

export const patchTeamPermissions = (id, item) => permissionsPatcher.patchItem(id, item);
