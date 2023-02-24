import { MemberServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueMemberAttemptsService = new MemberServiceApiFactory(configuration, '', instance);

const _getQueueLogs = (getList) => function({
                                              parentId,
                                              page = 1,
                                              size = 10,
                                              search,
                                              sort = '+joined_at',
                                              fields,
                                              joinedAtFrom,
                                              joinedAtTo,
                                              result,
                                              agent,
                                              leavingAtFrom,
                                              leavingAtTo,
                                              offeringAtFrom,
                                              offeringAtTo,
                                              durationFrom,
                                              durationTo,
                                            }) {
  // parent id == queue id
  const params = [
    page, size, search, sort, fields, joinedAtFrom, joinedAtTo, undefined,
    parentId, undefined, undefined, agent, result, leavingAtFrom,
    leavingAtTo, offeringAtFrom, offeringAtTo, durationFrom, durationTo,
  ];
  return getList(params);
};

const listGetter = new SdkListGetterApiConsumer(queueMemberAttemptsService.searchAttemptsHistory)
.setGetListMethod(_getQueueLogs);

const getQueueLogs = (params) => listGetter.getList(params);

const QueueLogsAPI = {
  getList: getQueueLogs,
};

export default QueueLogsAPI;
