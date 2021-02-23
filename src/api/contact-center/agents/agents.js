import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKItemGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKItemCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKItemUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKItemDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';
import WebitelAPIPermissionsGetter
  from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsGetter';
import WebitelAPIPermissionsPatcher
  from '../../utils/ApiControllers/Permissions/WebitelAPIPermissionsPatcher';


const agentService = new AgentServiceApiFactory(configuration, '', instance);

const BASE_URL = '/call_center/agents';
const fieldsToSend = ['user', 'team', 'supervisor', 'auditor', 'region', 'progressiveCount',
  'chatCount', 'isSupervisor', 'description'];

const defaultObject = {
  user: {},
  team: {},
  supervisor: {},
  auditor: {},
  region: {},
  progressiveCount: 0,
  chatCount: 0,
  isSupervisor: false,
  description: '',
  _dirty: false,
};
const getSupervisorsList = (getList) => function ({
                                                    page = 1,
                                                    size = 10,
                                                    search,
                                                    fields,
                                                  }) {
  const isSupervisor = true;
  const params = [page, size, search, undefined, fields, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, isSupervisor];
  return getList(params);
};

const listGetter = new SDKListGetter(agentService.searchAgent);
const itemGetter = new SDKItemGetter(agentService.readAgent, defaultObject);
const itemCreator = new SDKItemCreator(agentService.createAgent, fieldsToSend);
const itemUpdater = new SDKItemUpdater(agentService.updateAgent, fieldsToSend);
const itemDeleter = new SDKItemDeleter(agentService.deleteAgent);

const supervisorsListGetter = new SDKListGetter(agentService.searchAgent);
const newAgentUsersGetter = new SDKListGetter(agentService.searchLookupUsersAgentNotExists);
const agentQueuesGetter = new SDKListGetter(agentService.searchAgentInQueue);

const permissionsGetter = new WebitelAPIPermissionsGetter(BASE_URL);
const permissionsPatcher = new WebitelAPIPermissionsPatcher(BASE_URL);

export const getAgentsList = (params) => listGetter.getList(params);
export const getAgent = ({ itemId }) => itemGetter.getItem(itemId);
export const addAgent = ({ itemInstance }) => itemCreator.createItem(itemInstance);
export const updateAgent = ({ itemId, itemInstance }) => (
  itemUpdater.updateItem(itemId, itemInstance)
);
export const deleteAgent = ({ id }) => itemDeleter.deleteItem(id);

export const getAgentUsersOptions = (params) => newAgentUsersGetter.getList(params);
export const getAgentSupervisorsOptions = (params) => (
  supervisorsListGetter
    .setGetListMethod(getSupervisorsList)
    .getList(params)
);
export const getAgentQueuesList = (params) => agentQueuesGetter.getNestedList(params);

export const getAgentHistory = async (id, date, page = 0, size = 10) => {
  try {
    const response = await agentService.searchAgentStateHistory(page, size, date, Date.now(), id, '-joined_at');
    return response.items ? response.items : [];
  } catch (err) {
    throw err;
  }
};

export const getAgentPermissions = (id, page = 0, size = 10, search) => (
  permissionsGetter.getList(id, size, search)
);
export const patchAgentPermissions = (id, item) => permissionsPatcher.patchItem(id, item);

export default {
  getList: getAgentsList,
  get: getAgent,
  add: addAgent,
  update: updateAgent,
  delete: deleteAgent,
  getAgentsInQueue: getAgentQueuesList,

  getAgentUsersOptions,
  getAgentSupervisorsOptions,
};
