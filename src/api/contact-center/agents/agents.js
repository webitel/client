import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';
import SDKGetter from '../../utils/ApiControllers/Getter/SDKGetter';
import SDKCreator from '../../utils/ApiControllers/Creator/SDKCreator';
import SDKUpdater from '../../utils/ApiControllers/Updater/SDKUpdater';
import SDKDeleter from '../../utils/ApiControllers/Deleter/SDKDeleter';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['user', 'team', 'supervisor', 'auditor', 'region', 'progressiveCount',
  'chatCount', 'isSupervisor'];

const defaultSingleObject = {
  user: {},
  team: {},
  supervisor: {},
  auditor: {},
  region: {},
  progressiveCount: 0,
  chatCount: 0,
  isSupervisor: false,
  description: '',
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

const _getAgentHistory = (getList) => function ({
                                         parentId,
                                         from,
                                         to,
                                         page,
                                         size,
                                       }) {
  // parentId -- agent id
  const sort = '-joined_at';
  const params = [page, size, from, to, parentId, sort];
  return getList(params);
};

const listGetter = new SDKListGetter(agentService.searchAgent)
  .setGetListMethod(getSupervisorsList);
const itemGetter = new SDKGetter(agentService.readAgent, { defaultSingleObject });
const itemCreator = new SDKCreator(agentService.createAgent, fieldsToSend);
const itemUpdater = new SDKUpdater(agentService.updateAgent, fieldsToSend);
const itemDeleter = new SDKDeleter(agentService.deleteAgent);

const historyListGetter = new SDKListGetter(agentService.searchAgentStateHistory)
  .setGetListMethod(_getAgentHistory);

const supervisorsListGetter = new SDKListGetter(agentService.searchAgent);
const newAgentUsersGetter = new SDKListGetter(agentService.searchLookupUsersAgentNotExists);
const agentQueuesGetter = new SDKListGetter(agentService.searchAgentInQueue);

export const getAgentsList = (params) => listGetter.getList(params);
export const getAgent = (params) => itemGetter.getItem(params);
export const addAgent = (params) => itemCreator.createItem(params);
export const updateAgent = (params) => itemUpdater.updateItem(params);
export const deleteAgent = (params) => itemDeleter.deleteItem(params);

export const getAgentHistory = (params) => historyListGetter.getList(params);

export const getAgentUsersOptions = (params) => newAgentUsersGetter.getList(params);
export const getAgentSupervisorsOptions = (params) => supervisorsListGetter.getList(params);
export const getAgentQueuesList = (params) => agentQueuesGetter.getNestedList(params);

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
