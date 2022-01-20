import { AgentServiceApiFactory } from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  name: '',
  status: '',
  supervisor: {},
  skills: [],
};

const getQueueAgents = (getList) => function ({
                                                parentId,
                                                page = 1,
                                                size = 10,
                                                search,
                                                sort,
                                              }) {
  // parent id == queue id
  if (!parentId) return;
  const fields = ['id', 'name', 'status', 'supervisor', 'skills'];
  const params = [page, size, search, sort, fields, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, parentId];
  // eslint-disable-next-line consistent-return
  return getList(params);
};

const listGetter = new SdkListGetterApiConsumer(agentService.searchAgent, { defaultListObject })
  .setGetListMethod(getQueueAgents);

const getQueueAgentsList = (params) => listGetter.getList(params);

const QueueAgentsAPI = {
  getList: getQueueAgentsList,
};

export default QueueAgentsAPI;
