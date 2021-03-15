import { MemberServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../openAPIConfig';
import SDKListGetter from '../../utils/ApiControllers/ListGetter/SDKListGetter';

const queueMemberAttemptsService = new MemberServiceApiFactory(configuration, '', instance);

const _getQueueLogs = (getList) => function ({
                                               parentId,
                                               page = 1,
                                               size = 10,
                                               sort = '+joined_at',
                                             }) {
  // parent id == queue id
  const joinedAtFrom = 100000000;
  const joinedAtTo = Date.now();
  const params = [page, size, joinedAtFrom, joinedAtTo, undefined, parentId,
    undefined, undefined, undefined, undefined, undefined, sort];
  return getList(params);
};

const listGetter = new SDKListGetter(queueMemberAttemptsService.searchAttemptsHistory)
  .setGetListMethod(_getQueueLogs);

export const getQueueLogs = (params) => listGetter.getList(params);

export default {
  getList: getQueueLogs,
};
