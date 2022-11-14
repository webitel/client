import { TriggerServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const triggerLogsService = new TriggerServiceApiFactory(configuration, '', instance);

const _getTriggerLogs = (getList) => function({
                                                triggerId,
                                                page = 1,
                                                size = 10,
                                                q,
                                                sort,
                                                fields,
                                                createdAtFrom,
                                                createdAtTo,
                                                options,
                                            }) {
  const params = [triggerId, page, size, q, sort, fields, createdAtFrom, createdAtTo, options];
  return getList(params);
};

const getTrigger = new SdkListGetterApiConsumer(triggerLogsService.searchTriggerJob)
.setGetListMethod(_getTriggerLogs);

const getList = (params) => getTrigger.getList(params);

const TriggersLogAPI = {
  getList,
};

export default TriggersLogAPI;
