import { MemberServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

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

const listGetter = new SdkListGetterApiConsumer(queueMemberAttemptsService.searchAttemptsHistory)
  .setGetListMethod(_getQueueLogs);

const getQueueLogs = (params) => listGetter.getList(params);

const QueueLogsAPI = {
  getList: getQueueLogs,
};

export default QueueLogsAPI;
