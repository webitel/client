import { AgentServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';
import SDKListGetter from '../../../../../../../app/api/BaseAPIServices/ListGetter/SDKListGetter';

const agentService = new AgentServiceApiFactory(configuration, '', instance);

const defaultListObject = {
  countMembers: 0,
  waitingMembers: 0,
};

const _getAgentQueues = (getList) => function ({
                                                    page = 1,
                                                    size = 10,
                                                    search,
                                                    sort,
                                                    fields,
                                                    parentId,
                                                  }) {
  // parentId -- agent id
  const params = [parentId, page, size, search, sort, fields, undefined, undefined,
    undefined, undefined, undefined, undefined];
  return getList(params);
};

const listGetter = new SDKListGetter(agentService.searchAgentInQueue, { defaultListObject })
  .setGetListMethod(_getAgentQueues);
export const getAgentQueuesList = (params) => listGetter.getNestedList(params);

export default {
  getList: getAgentQueuesList,
};
