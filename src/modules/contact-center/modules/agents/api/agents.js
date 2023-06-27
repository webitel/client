import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { AgentServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../app/api/old/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['user', 'team', 'supervisor', 'auditor', 'region', 'greetingMedia', 'progressiveCount',
  'chatCount', 'isSupervisor'];

const convertStatusDuration = (value) => {
  if (value > 60 * 60 * 24) return '>24:00:00';
  return convertDuration(value);
};

const listResponseHandler = (response) => {
  const items = response.items.map((item) => ({
    ...item,
    statusDuration: convertStatusDuration(item.statusDuration),
  }));
  return {
    ...response,
    items,
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
  greetingMedia: {},
};

const getSupervisorsList = (getList) => function ({
                                                    page = 1,
                                                    size = 10,
                                                    search,
                                                    fields,
                                                    notTeamId,
                                                  }) {
  const isSupervisor = true;
  const params = [page, size, search, undefined, fields, undefined, undefined,
    undefined, undefined, undefined, undefined, isSupervisor, undefined, undefined, undefined,
    undefined, undefined, notTeamId];
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

const listGetter = new SdkListGetterApiConsumer(agentService.searchAgent, {
  listResponseHandler,
});
const itemGetter = new SdkGetterApiConsumer(agentService.readAgent, { defaultSingleObject });
const itemCreator = new SdkCreatorApiConsumer(agentService.createAgent, { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(agentService.updateAgent, { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(agentService.deleteAgent);

const historyListGetter = new SdkListGetterApiConsumer(agentService.searchAgentStateHistory)
  .setGetListMethod(_getAgentHistory);

const supervisorsListGetter = new SdkListGetterApiConsumer(agentService.searchAgent)
  .setGetListMethod(getSupervisorsList);
const regularAgentListGetter = new SdkListGetterApiConsumer(agentService.searchAgent)
  .setGetListMethod(_getRegularAgentsList);
const newAgentUsersGetter = new SdkListGetterApiConsumer(
  agentService.searchLookupUsersAgentNotExists,
);

const getAgentsList = (params) => listGetter.getList(params);
const getAgent = (params) => itemGetter.getItem(params);
const addAgent = (params) => itemCreator.createItem(params);
const updateAgent = (params) => itemUpdater.updateItem(params);
const deleteAgent = (params) => itemDeleter.deleteItem(params);
const getAgentsLookup = (params) => listGetter.getLookup(params);

const getAgentHistory = (params) => historyListGetter.getList(params);

const getAgentUsersOptions = (params) => newAgentUsersGetter.getLookup(params);
const getSupervisorOptions = (params) => supervisorsListGetter.getLookup(params);
const getRegularAgentsOptions = (params) => regularAgentListGetter.getLookup(params);

const AgentsAPI = {
  getList: getAgentsList,
  get: getAgent,
  add: addAgent,
  update: updateAgent,
  delete: deleteAgent,
  getLookup: getAgentsLookup,

  getAgentHistory,
  getRegularAgentsOptions,
  getAgentUsersOptions,
  getSupervisorOptions,
};

export default AgentsAPI;
