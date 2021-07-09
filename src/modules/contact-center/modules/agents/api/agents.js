import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import SDKListGetter from '../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';
import SDKGetter from '../../../../../app/api/BaseAPIServices/Getter/SDKGetter';
import SDKCreator from '../../../../../app/api/BaseAPIServices/Creator/SDKCreator';
import SDKUpdater from '../../../../../app/api/BaseAPIServices/Updater/SDKUpdater';
import SDKDeleter from '../../../../../app/api/BaseAPIServices/Deleter/SDKDeleter';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['user', 'team', 'supervisor', 'auditor', 'region', 'progressiveCount',
  'chatCount', 'isSupervisor'];


const convertStatusDuration = (value) => {
  if (value > 60 * 60 * 24) return ">24:00:00";
  return convertDuration(value)
};

const listResponseHandler = (response) => {
  const list = response.list.map((item) => ({
    ...item,
    statusDuration: convertStatusDuration(item.statusDuration),
  }));
  return {
    ...response,
    list,
  };
};


const defaultSingleObject = {
  user: {},
  team: {},
  supervisor: [],
  auditor: [],
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
    undefined, undefined, undefined, undefined, isSupervisor];
  return getList(params);
};

const _getRegularAgentsList = (getList) => function ({
                                                       page = 1,
                                                       size = 10,
                                                       search,
                                                       fields,

                                                     }) {
  const isNotSupervisor = true;
  const params = [page, size, search, undefined, fields, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, isNotSupervisor];
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

const listGetter = new SDKListGetter(agentService.searchAgent, {
  listResponseHandler,
});
const itemGetter = new SDKGetter(agentService.readAgent, { defaultSingleObject });
const itemCreator = new SDKCreator(agentService.createAgent, { fieldsToSend });
const itemUpdater = new SDKUpdater(agentService.updateAgent, { fieldsToSend });
const itemDeleter = new SDKDeleter(agentService.deleteAgent);

const historyListGetter = new SDKListGetter(agentService.searchAgentStateHistory)
  .setGetListMethod(_getAgentHistory);

const supervisorsListGetter = new SDKListGetter(agentService.searchAgent)
  .setGetListMethod(getSupervisorsList);
const regularAgentListGetter = new SDKListGetter(agentService.searchAgent)
  .setGetListMethod(_getRegularAgentsList);
const newAgentUsersGetter = new SDKListGetter(agentService.searchLookupUsersAgentNotExists);

export const getAgentsList = (params) => listGetter.getList(params);
export const getAgent = (params) => itemGetter.getItem(params);
export const addAgent = (params) => itemCreator.createItem(params);
export const updateAgent = (params) => itemUpdater.updateItem(params);
export const deleteAgent = (params) => itemDeleter.deleteItem(params);

export const getAgentHistory = (params) => historyListGetter.getList(params);

export const getAgentUsersOptions = (params) => newAgentUsersGetter.getList(params);
export const getAgentSupervisorsOptions = (params) => supervisorsListGetter.getList(params);
export const getRegularAgentsOptions = (params) => regularAgentListGetter.getList(params);

export default {
  getList: getAgentsList,
  get: getAgent,
  add: addAgent,
  update: updateAgent,
  delete: deleteAgent,

  getAgentUsersOptions,
  getAgentSupervisorsOptions,
};
