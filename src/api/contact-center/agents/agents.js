import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {AgentServiceApiFactory, AgentSkillServiceApiFactory} from 'webitel-sdk';
import store from "../../../store/store";
import {WebitelSDKListGetter} from "../../utils/ApiControllers/ListGetter/SDKListGetter";
import {
    WebitelAPIPermissionsGetter,
    WebitelAPIPermissionsPatcher
} from "../../utils/ApiControllers/Permissions/PermissionsController";
import {WebitelSDKItemDeleter} from "../../utils/ApiControllers/Deleter/SDKDeleter";
import {WebitelSDKItemUpdater} from "../../utils/ApiControllers/Updater/SDKUpdater";
import {WebitelSDKItemCreator} from "../../utils/ApiControllers/Creator/SDKCreator";
import {WebitelSDKItemGetter} from "../../utils/ApiControllers/Getter/SDKGetter";


const agentService = new AgentServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/agents';
const fieldsToSend = ['domainId', 'user', 'description'];

const listGetter = new WebitelSDKListGetter(agentService.searchAgent);
const itemGetter = new WebitelSDKItemGetter(agentService.readAgent);
const itemCreator = new WebitelSDKItemCreator(agentService.createAgent, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(agentService.updateAgent, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(agentService.deleteAgent);
const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);

export const getAgentsList = async (page = 0, size = 10, search) => {
    return await listGetter.getList({page, size, search});
};

export const getAgent = async (id) => {
    return await itemGetter.getItem(id);
};

export const addAgent = async (item) => {
    return await itemCreator.createItem(item);
};

export const updateAgent = async (id, item) => {
    return await itemUpdater.updateItem(id, item);
};

export const deleteAgent = async (id) => {
    return await itemDeleter.deleteItem(id);
};

export const getAgentUsersOptions = async (page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId;
    const response = await agentService.searchLookupUsersAgentNotExists(page, size, search, domainId);
    return response.items ? response.items : [];
};

export const getAgentHistory = async (id, date, page = 0, size = 10) => {
    const domainId = store.state.userinfo.domainId;
    try {
        const response = await agentService.searchAgentStateHistory(id, page, size, date, Date.now(), domainId);
        return response.items ? response.items : [];
    } catch (err) {
        throw err;
    }
};

export const getAgentTeamsList = async (id, page = 0, size = 10, search = '') => {
    const domainId = store.state.userinfo.domainId;
    try {
        const response = await agentService.searchAgentInTeam(id, page, size, search, domainId);
        return response.items ? response.items : [];
    } catch (err) {
        throw err;
    }
};

export const getAgentQueuesList = async (id, page = 0, size = 10, search = '') => {
    const domainId = store.state.userinfo.domainId;
    try {
        const response = await agentService.searchAgentInQueue(id, page, size, search, domainId);
        return response.items ? response.items : [];
    } catch (err) {
        throw err;
    }
};

export const getAgentPermissions = async (id, page = 0, size = 10, search) => {
    return await permissionsGetter.getList(id, size, search);
};

export const patchAgentPermissions = async (id, item) => {
    return await permissionsPatcher.patchItem(id, item);
};