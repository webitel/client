import instance from '../../instance';
import configuration from '../../openAPIConfig';
import {AgentServiceApiFactory, AgentSkillServiceApiFactory} from 'webitel-sdk';
import eventBus from "../../../utils/eventBus";
import sanitizer from "../../utils/sanitizer";
import {coerceObjectPermissionsResponse} from "../../permissions/objects/objects";
import store from "../../../store/store";
import deepCopy from "deep-copy";
import {
    WebitelSDKItemCreator, WebitelSDKItemDeleter,
    WebitelSDKItemGetter,
    WebitelSDKItemUpdater,
    WebitelSDKListGetter
} from "../../utils/apiControllers";

const agentService = new AgentServiceApiFactory
(configuration, '', instance);

const agentSkillsService = new AgentSkillServiceApiFactory
(configuration, '', instance);

const BASE_URL = '/call_center/agents';
const fieldsToSend = ['domainId', 'user', 'description'];

const defaultItemObject = {
    _dirty: false
};

const listGetter = new WebitelSDKListGetter(agentService.searchAgent);
const itemGetter = new WebitelSDKItemGetter(agentService.readAgent, defaultItemObject);
const itemCreator = new WebitelSDKItemCreator(agentService.createAgent, fieldsToSend);
const itemUpdater = new WebitelSDKItemUpdater(agentService.updateAgent, fieldsToSend);
const itemDeleter = new WebitelSDKItemDeleter(agentService.deleteAgent);



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

export const getAgentSkills = async (id, page = 0, size = 10, search) => {
    const domainId = store.state.userinfo.domainId;
    try {
        const response = await agentSkillsService.searchLookupAgentNotExistsSkill(id, page, size, search, domainId);
        return response.items ? response.items : [];
    } catch(err) {
        throw err;
    }
};

export const getAgentHistory = async (id, date, page = 0, size = 10) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        const response = await agentService.searchAgentStateHistory(id, page, size, date, Date.now(), domainId);
        return response.items ? response.items : [];
    } catch (err) {
        throw err;
    }
};

export const getAgentTeamsList = async (id, page = 0, size = 10) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        const response = await agentService.searchAgentInTeam(id, page, size, domainId);
        return response.items ? response.items : [];
    } catch (err) {
        throw err;
    }
};

export const getAgentQueuesList = async (id, page = 0, size = 10) => {
    const domainId = store.state.userinfo.domainId || undefined;
    try {
        const response = await agentService.searchAgentInQueue(id, page, size, domainId);
        return response.items ? response.items : [];
    } catch (err) {
        throw err;
    }
};

export const getAgentPermissions = async (id, page = 0, size = 10, search) => {
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

export const patchAgentPermissions = async (id, item) => {
    const url = BASE_URL + '/' + id + '/acl';

    try {
        await instance.patch(url, {changes: item});
        eventBus.$emit('notificationInfo', 'Sucessfully updated');
    } catch (error) {
        throw error;
    }
};