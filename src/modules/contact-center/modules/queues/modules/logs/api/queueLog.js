import { MemberServiceApiFactory } from 'webitel-sdk';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  handleUnauthorized,
  merge, notify, snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const queueMemberAttemptsService = new MemberServiceApiFactory(configuration, '', instance);

const getQueueLogs = async (params) => {
  const {
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
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await queueMemberAttemptsService.searchAttemptsHistory(
      page,
      size,
      search,
      sort,
      fields,
      joinedAtFrom,
      joinedAtTo,
      undefined,
      parentId,
      undefined,
      undefined,
      agent,
      result,
      leavingAtFrom,
      leavingAtTo,
      offeringAtFrom,
      offeringAtTo,
      durationFrom,
      durationTo,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      handleUnauthorized,
      notify,
    ]);
  }
};

const QueueLogsAPI = {
  getList: getQueueLogs,
};

export default QueueLogsAPI;
