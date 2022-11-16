import { TriggerServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const triggerLogsService = new TriggerServiceApiFactory(configuration, '', instance);

const _getTriggerLogs = (getList) => function({
                                                parentId,
                                                page,
                                                size,
                                                q,
                                                sort,
                                                fields,
                                                startedAtFrom,
                                                startedAtTo,
                                                durationFrom,
                                                durationTo,
                                                result,
                                              }) {

  const params = [
    parentId,
    page,
    size,
    q,
    sort,
    fields,
    undefined,
    undefined,
    startedAtFrom,
    startedAtTo,
    durationFrom,
    durationTo,
    result,
  ];
  return getList(params);
};

const getTrigger = new SdkListGetterApiConsumer(triggerLogsService.searchTriggerJob)
.setGetListMethod(_getTriggerLogs);

const getList = (params) => getTrigger.getList(params);

const TriggersLogAPI = {
  getList,
};

export default TriggersLogAPI;
