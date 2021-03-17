import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import SDKListGetter from '../../../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  name: '',
  supervisor: {},
  skills: [],
};

const getQueueAgents = (getList) => function ({
                                                parentId,
                                                page = 1,
                                                size = 10,
                                                search,
                                              }) {
  // parent id == queue id
  if (!parentId) return;
  const fields = ['id', 'name', 'supervisor', 'skills'];
  const params = [page, size, search, undefined, fields, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, parentId];
  // eslint-disable-next-line consistent-return
  return getList(params);
};

const listGetter = new SDKListGetter(agentService.searchAgent, { defaultListObject })
  .setGetListMethod(getQueueAgents);

export const getQueueAgentsList = (params) => listGetter.getList(params);

export default {
  getList: getQueueAgentsList,
};
